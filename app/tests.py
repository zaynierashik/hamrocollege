from unittest.mock import patch
from datetime import timedelta
from decimal import Decimal

from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ValidationError
from django.test import RequestFactory, TestCase
from django.utils.timezone import now
from django.core.cache import cache

from app.models import Application, Course, EmailIdentity, Institution, InstitutionAdmin, InstitutionCourse, OTP, Rating, SuperAdmin, User
from app.views import change_password, is_login_rate_limited, record_login_failure, nearby_institutions_view
from app.utils import get_nearby_institutions


class OTPFlowTests(TestCase):
	def test_otp_hash_and_validation(self):
		otp = OTP(email='u@example.com', expires_at=now())
		otp.set_otp('ABC123')
		otp.save()

		self.assertTrue(otp.check_otp('ABC123'))
		self.assertFalse(otp.check_otp('ZZZ999'))

	def test_change_password_consumes_otp(self):
		user = User.objects.create(name='User A', email='u1@example.com', phone='9800000001', password='OldPass@1')
		otp = OTP(email=user.email, expires_at=now())
		otp.set_otp('QWERT1')
		otp.save()

		# make OTP valid in test by setting future expiry
		otp.expires_at = now() + timedelta(minutes=10)
		otp.save(update_fields=['expires_at'])

		success, _ = change_password(user.email, 'QWERT1', 'NewPass@1')
		self.assertTrue(success)

		user.refresh_from_db()
		otp.refresh_from_db()
		self.assertTrue(check_password('NewPass@1', user.password))
		self.assertIsNotNone(otp.consumed_at)


class RatingUpsertTests(TestCase):
	def setUp(self):
		self.user = User.objects.create(name='Rate User', email='rate@example.com', phone='9800000002', password='Pass@123')
		self.admin = InstitutionAdmin.objects.create(
			name='Inst Admin',
			institution='Inst One',
			email='instadmin@example.com',
			password='Pass@123',
		)
		self.institution = Institution.objects.create(
			name='Inst One',
			overview='Overview',
			phone='9800001111',
			email='inst@example.com',
			address='Kathmandu',
			affiliation='tribhuvan',
			admin=self.admin,
		)

	def test_rating_save_overwrites_existing(self):
		Rating(user=self.user, institution=self.institution, rating=4).save()
		Rating(user=self.user, institution=self.institution, rating=2).save()

		self.assertEqual(Rating.objects.filter(user=self.user, institution=self.institution).count(), 1)
		self.assertEqual(Rating.objects.get(user=self.user, institution=self.institution).rating, 2)


class InstitutionAdminNotificationTests(TestCase):
	@patch('app.models.send_mail')
	def test_status_notification_uses_display_value(self, send_mail_mock):
		admin = InstitutionAdmin.objects.create(
			name='Notify Admin',
			institution='Notify Inst',
			email='notify@example.com',
			password=make_password('Pass@123'),
			status='approved',
		)

		admin.send_status_notification()
		self.assertTrue(send_mail_mock.called)
		args = send_mail_mock.call_args[0]
		self.assertIn('Approved', args[1])


class PhaseTwoModelGuardTests(TestCase):
	def test_cross_table_email_uniqueness(self):
		user = User.objects.create(name='User One', email='same@example.com', phone='9800000003', password='Pass@123')
		self.assertTrue(EmailIdentity.objects.filter(email='same@example.com', owner_type='user', owner_id=user.id).exists())

		with self.assertRaises(ValidationError):
			SuperAdmin(name='Admin One', role='staff', phone='9800000004', email='same@example.com', password='Pass@123').save()

	def test_decimal_coordinates_saved(self):
		user = User.objects.create(name='Geo User', email='geo@example.com', phone='9800000005', password='Pass@123')
		user.latitude = Decimal('27.717245')
		user.longitude = Decimal('85.323961')
		user.save()

		user.refresh_from_db()
		self.assertEqual(user.latitude, Decimal('27.717245'))
		self.assertEqual(user.longitude, Decimal('85.323961'))


class AdmissionCounterTransitionTests(TestCase):
	def setUp(self):
		self.user = User.objects.create(name='Applicant', email='applicant@example.com', phone='9800000010', password='Pass@123')
		self.admin = InstitutionAdmin.objects.create(
			name='Inst Admin 2',
			institution='Inst Counter',
			email='instcounteradmin@example.com',
			password='Pass@123',
		)
		self.institution = Institution.objects.create(
			name='Inst Counter',
			overview='Overview',
			phone='9800001112',
			email='instcounter@example.com',
			address='Kathmandu',
			affiliation='tribhuvan',
			admin=self.admin,
			admission=True,
		)
		self.course = Course.objects.create(
			name='Counter Course',
			year='4',
			field='engineering',
			level='bachelor',
			affiliation='tribhuvan',
			about='About',
		)
		self.program = InstitutionCourse.objects.create(institution=self.institution, course=self.course)

	def test_pending_to_accepted_increments(self):
		application = Application.objects.create(
			user=self.user,
			institution=self.institution,
			program=self.program,
			phone='9800000020',
			email='applicant@example.com',
			status='pending',
		)

		self.institution.refresh_from_db()
		self.assertEqual(self.institution.current_admissions, 0)

		application.status = 'accepted'
		application.save()

		self.institution.refresh_from_db()
		self.assertEqual(self.institution.current_admissions, 1)

	def test_accepted_to_rejected_decrements(self):
		application = Application.objects.create(
			user=self.user,
			institution=self.institution,
			program=self.program,
			phone='9800000021',
			email='applicant@example.com',
			status='accepted',
		)

		self.institution.refresh_from_db()
		self.assertEqual(self.institution.current_admissions, 1)

		application.status = 'rejected'
		application.save()

		self.institution.refresh_from_db()
		self.assertEqual(self.institution.current_admissions, 0)

	def test_no_double_count_on_same_status(self):
		application = Application.objects.create(
			user=self.user,
			institution=self.institution,
			program=self.program,
			phone='9800000022',
			email='applicant@example.com',
			status='accepted',
		)

		application.status = 'accepted'
		application.save()

		self.institution.refresh_from_db()
		self.assertEqual(self.institution.current_admissions, 1)


class SecurityHardeningTests(TestCase):
	def setUp(self):
		cache.clear()
		self.factory = RequestFactory()

	def test_login_rate_limit_blocks_after_threshold(self):
		request = self.factory.post('/login')
		request.META['REMOTE_ADDR'] = '127.0.0.1'
		email = 'throttle@example.com'

		for _ in range(5):
			record_login_failure(request, 'user', email)

		self.assertTrue(is_login_rate_limited(request, 'user', email))

	def test_otp_lock_after_failed_attempts(self):
		user = User.objects.create(name='Otp User', email='otpuser@example.com', phone='9800000030', password='Pass@123')
		otp = OTP(email=user.email, expires_at=now() + timedelta(minutes=10))
		otp.set_otp('ABC123')
		otp.save()

		for _ in range(5):
			success, _ = change_password(user.email, 'WRONG1', 'NewPass@123')
			self.assertFalse(success)

		success, message = change_password(user.email, 'ABC123', 'NewPass@123')
		self.assertFalse(success)
		self.assertIn('Too many incorrect OTP attempts', message)


class GeospatialPhaseTests(TestCase):
	def setUp(self):
		self.user = User.objects.create(
			name='Geo Nearby User',
			email='geonearuser@example.com',
			phone='9800000040',
			password='Pass@123',
			latitude=Decimal('27.717245'),
			longitude=Decimal('85.323961'),
		)

		self.admin = InstitutionAdmin.objects.create(
			name='Geo Inst Admin',
			institution='Geo Inst',
			email='geoinstadmin@example.com',
			password='Pass@123',
		)

		self.near_inst = Institution.objects.create(
			name='Nearby Campus',
			overview='Near',
			phone='9800000041',
			email='nearbycampus@example.com',
			address='Kathmandu',
			affiliation='tribhuvan',
			admin=self.admin,
			latitude=Decimal('27.700000'),
			longitude=Decimal('85.333000'),
		)

		Institution.objects.create(
			name='Far Campus',
			overview='Far',
			phone='9800000042',
			email='farcampus@example.com',
			address='Pokhara',
			affiliation='tribhuvan',
			latitude=Decimal('28.209600'),
			longitude=Decimal('83.985600'),
		)

	def test_get_nearby_institutions_filters_and_sorts(self):
		nearby = get_nearby_institutions(self.user, radius_km=10)

		self.assertEqual(len(nearby), 1)
		self.assertEqual(nearby[0]['institution'].name, 'Nearby Campus')
		self.assertLessEqual(nearby[0]['distance'], 10)

	def test_nearby_institutions_api_payload(self):
		request = RequestFactory().get('/nearby-institutions/')
		response = nearby_institutions_view(request, self.user.id, radius=10)

		self.assertEqual(response.status_code, 200)
		self.assertIn('Nearby Campus', response.content.decode())
		self.assertNotIn('Far Campus', response.content.decode())
