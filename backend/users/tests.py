"""
Tests for users app models and views
"""
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from colleges.models import CollegeAdminProfile
from .models import Booking

User = get_user_model()


class UserModelTestCase(TestCase):
    """Test CustomUser model"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_user_creation(self):
        """Test user creation"""
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
    
    def test_user_is_trainer(self):
        """Test is_trainer field"""
        self.assertFalse(self.user.is_trainer)
        self.user.is_trainer = True
        self.user.save()
        self.assertTrue(self.user.is_trainer)


class BookingTestCase(TestCase):
    """Test Booking model and API"""
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='client',
            email='client@example.com',
            password='testpass123'
        )
        self.trainer = User.objects.create_user(
            username='trainer',
            email='trainer@example.com',
            password='testpass123',
            is_trainer=True
        )
        from django.utils import timezone
        self.booking_data = {
            'trainer': self.trainer.id,
            'booking_date': timezone.now(),
            'duration_minutes': 60,
            'service_type': 'neuro_athletik'
        }
    
    def test_create_booking_authenticated(self):
        """Test creating booking as authenticated user"""
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse('users:bookings-list'),
            self.booking_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Booking.objects.filter(user=self.user).count(), 1)
    
    def test_create_booking_unauthenticated(self):
        """Test that unauthenticated users cannot create bookings"""
        response = self.client.post(
            reverse('users:bookings-list'),
            self.booking_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AuthenticationTestCase(TestCase):
    """Test JWT authentication"""
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_obtain_token(self):
        """Test obtaining JWT token"""
        response = self.client.post(
            reverse('users:token_obtain_pair'),
            {
                'username': 'testuser',
                'password': 'testpass123'
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def test_invalid_credentials(self):
        """Test token request with invalid credentials"""
        response = self.client.post(
            reverse('users:token_obtain_pair'),
            {
                'username': 'testuser',
                'password': 'wrongpassword'
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class RoleRegistrationAndLoginTestCase(TestCase):
    """Test role-specific registration and authentication endpoints."""

    def setUp(self):
        self.client = APIClient()

    def test_user_registration(self):
        response = self.client.post(
            reverse('users:register_user'),
            {
                'username': 'normaluser',
                'email': 'normal@example.com',
                'first_name': 'Normal',
                'last_name': 'User',
                'password': 'strongpass123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username='normaluser')
        self.assertEqual(user.role, 'user')

    def test_college_admin_registration_creates_profile(self):
        response = self.client.post(
            reverse('users:register_college_admin'),
            {
                'username': 'collegeadmin',
                'email': 'admin@college.com',
                'first_name': 'College',
                'last_name': 'Admin',
                'password': 'strongpass123',
                'college': 'Hamro College',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username='collegeadmin')
        self.assertEqual(user.role, 'college_admin')
        self.assertTrue(CollegeAdminProfile.objects.filter(user=user, college='Hamro College').exists())

    def test_college_admin_login_rejects_normal_user(self):
        User.objects.create_user(
            username='normaluser',
            email='normal@example.com',
            password='strongpass123',
            role='user',
        )

        response = self.client.post(
            reverse('users:college_admin_login'),
            {
                'username': 'normaluser',
                'password': 'strongpass123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_college_admin_login_succeeds_for_college_admin(self):
        User.objects.create_user(
            username='collegeadmin',
            email='admin@college.com',
            password='strongpass123',
            role='college_admin',
        )

        response = self.client.post(
            reverse('users:college_admin_login'),
            {
                'username': 'collegeadmin',
                'password': 'strongpass123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['role'], 'college_admin')

    def test_user_login_with_email_only(self):
        User.objects.create_user(
            username='rashik',
            email='rashik@example.com',
            password='strongpass123',
            role='user',
        )

        response = self.client.post(
            reverse('users:login'),
            {
                'email': 'rashik@example.com',
                'password': 'strongpass123',
            },
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
