import os
from decimal import Decimal
from datetime import timedelta

from django.db import models
from django.db import IntegrityError, transaction
from django.db.models import Avg, Case, F, IntegerField, Value, When
from django.core.mail import send_mail
from django.core.exceptions import ValidationError
from django.conf import settings
from django.utils.timezone import now
from django.contrib.auth.hashers import check_password, make_password


class EmailIdentity(models.Model):
    OWNER_TYPES = [
        ('superadmin', 'Super Admin'),
        ('user', 'User'),
        ('institutionadmin', 'Institution Admin'),
    ]

    email = models.EmailField(unique=True)
    owner_type = models.CharField(max_length=20, choices=OWNER_TYPES)
    owner_id = models.BigIntegerField()
    created_at = models.DateTimeField(default=now)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['owner_type', 'owner_id'], name='uniq_email_identity_owner')
        ]
        indexes = [
            models.Index(fields=['owner_type', 'owner_id'], name='email_identity_owner_idx')
        ]

    def __str__(self):
        return f"{self.email} ({self.owner_type}:{self.owner_id})"


def owner_type_for_model(model_cls):
    mapping = {
        SuperAdmin: 'superadmin',
        User: 'user',
        InstitutionAdmin: 'institutionadmin',
    }
    return mapping.get(model_cls)


def is_global_email_taken(email, exclude_model=None, exclude_pk=None):
    if not email:
        return False

    normalized_email = email.strip().lower()
    query = EmailIdentity.objects.filter(email=normalized_email)

    if exclude_model is not None and exclude_pk is not None:
        owner_type = owner_type_for_model(exclude_model)
        if owner_type:
            query = query.exclude(owner_type=owner_type, owner_id=exclude_pk)

    return query.exists()


def sync_email_identity(owner_type, owner_id, email):
    normalized_email = email.strip().lower()

    identity = EmailIdentity.objects.filter(owner_type=owner_type, owner_id=owner_id).first()
    if identity:
        if identity.email != normalized_email:
            if EmailIdentity.objects.filter(email=normalized_email).exclude(pk=identity.pk).exists():
                raise ValidationError({'email': 'This email is already used by another account.'})
            identity.email = normalized_email
            identity.save(update_fields=['email'])
        return

    try:
        EmailIdentity.objects.create(email=normalized_email, owner_type=owner_type, owner_id=owner_id)
    except IntegrityError as exc:
        raise ValidationError({'email': 'This email is already used by another account.'}) from exc

class SuperAdmin(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'In Active'),
    ]

    ROLES = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
    ]
    
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    role = models.CharField(max_length=10, choices=ROLES, default='staff')
    created_at = models.DateField(default=now)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.email = (self.email or '').strip().lower()
        with transaction.atomic():
            if is_global_email_taken(self.email, exclude_model=SuperAdmin, exclude_pk=self.pk):
                raise ValidationError({'email': 'This email is already used by another account.'})

            # Hash the password before saving if it's not already hashed
            if self.password and not self.password.startswith(('pbkdf2_sha256$', 'bcrypt')):
                self.password = make_password(self.password)

            super(SuperAdmin, self).save(*args, **kwargs)
            sync_email_identity('superadmin', self.pk, self.email)

class User(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('suspended', 'Suspended'),
    ]

    PROVINCES = [
        ('province_1', 'Province No. 1'),
        ('province_2', 'Province No. 2'),
        ('bagmati', 'Bagmati Province'),
        ('gandaki', 'Gandaki Province'),
        ('lumbini', 'Lumbini Province'),
        ('karnali', 'Karnali Province'),
        ('sudurpashchim', 'Sudurpashchim Province'),
    ]
    
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    province = models.CharField(max_length=100, choices=PROVINCES, blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['latitude', 'longitude'], name='user_lat_lng_idx'),
        ]

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.email = (self.email or '').strip().lower()
        with transaction.atomic():
            if is_global_email_taken(self.email, exclude_model=User, exclude_pk=self.pk):
                raise ValidationError({'email': 'This email is already used by another account.'})

            if self.latitude is not None:
                self.latitude = Decimal(self.latitude)
            if self.longitude is not None:
                self.longitude = Decimal(self.longitude)

            # Hash the password before saving if it's not already hashed
            if self.password and not self.password.startswith(('pbkdf2_sha256$', 'bcrypt')):
                self.password = make_password(self.password)

            super(User, self).save(*args, **kwargs)
            sync_email_identity('user', self.pk, self.email)

class InstitutionAdmin(models.Model):
    STATUS_CHOICES = [
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('not_decided', 'Not Decided')
    ]
    
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, unique=True, blank=True, null=True)
    institution = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='not_decided')
    
    def __str__(self):
        return self.name
    
    def send_status_notification(self):
        """Send email notification when the status changes via Brevo SMTP."""
        subject = "Update on Institution Registration Status"
        message = f"""
        Dear {self.name},

        Your institution registration status has been {self.get_status_display()}.

        If you have any questions, feel free to reach out.

        Regards,
        Hamrocollege Team
        """

        try:
            send_mail(
                subject,  # Email subject
                message,  # Email message
                settings.DEFAULT_FROM_EMAIL,
                [self.email],  # To email
                fail_silently=False,  # Set to False to capture any errors
            )
            print("Status notification sent successfully")
            return True
        except Exception as e:
            print("Error sending status notification:", e)
            return False
    
    def save(self, *args, **kwargs):
        self.email = (self.email or '').strip().lower()
        with transaction.atomic():
            if is_global_email_taken(self.email, exclude_model=InstitutionAdmin, exclude_pk=self.pk):
                raise ValidationError({'email': 'This email is already used by another account.'})

            # Hash the password before saving if it's not already hashed
            if self.password and not self.password.startswith(('pbkdf2_sha256$', 'bcrypt')):
                self.password = make_password(self.password)

            super(InstitutionAdmin, self).save(*args, **kwargs)
            sync_email_identity('institutionadmin', self.pk, self.email)

def logo_upload_to(instance, filename):
    # Using the institution's name to create a folder structure
    institution_name = instance.name.lower().replace(" ", "-")
    return os.path.join(f'institution/{institution_name}/logo/{filename}')

def cover_upload_to(instance, filename):
    # Using the institution's name to create a folder structure
    institution_name = instance.name.lower().replace(" ", "-")
    return os.path.join(f'institution/{institution_name}/cover/{filename}')

def gallery_upload_to(instance, filename):
    # Using the institution's name to create a folder structure for gallery images
    institution_name = instance.institution.name.lower().replace(" ", "-")
    return os.path.join(f'institution/{institution_name}/gallery/{filename}')

class Institution(models.Model):
    AFFILIATION_CHOICES = [
        ('tribhuvan', 'Tribhuvan University'),
        ('pokhara', 'Pokhara University'),
        ('kathmandu', 'Kathmandu University'),
        ('gandaki', 'Gandaki University'),
        ('purbanchal', 'Purbanchal University'),
        ('foreign', 'Foreign University'),
    ]

    PROVINCES = [
        ('province_1', 'Province No. 1'),
        ('province_2', 'Province No. 2'),
        ('bagmati', 'Bagmati Province'),
        ('gandaki', 'Gandaki Province'),
        ('lumbini', 'Lumbini Province'),
        ('karnali', 'Karnali Province'),
        ('sudurpashchim', 'Sudurpashchim Province'),
    ]
    
    name = models.CharField(max_length=255, unique=True)
    overview = models.TextField()
    message = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    website = models.URLField(blank=True, null=True)
    address = models.CharField(max_length=255)
    province = models.CharField(max_length=100, choices=PROVINCES, blank=True, null=True)
    map = models.TextField(blank=True, null=True, help_text="Embed map URL with width value 950 and height value 500.")
    logo = models.ImageField(upload_to=logo_upload_to, blank=True, null=True)
    Cover_Photo = models.ImageField(upload_to=cover_upload_to, blank=True, null=True)
    affiliation = models.CharField(max_length=50, choices=AFFILIATION_CHOICES)
    Foreign_University_Name = models.CharField(max_length=255, blank=True, null=True, help_text="If the affiliation is Foreign University, specify the university name here.")
    admin = models.OneToOneField(InstitutionAdmin, on_delete=models.CASCADE, related_name='managed_institution', blank=True, null=True)
    admission = models.BooleanField(default=False, help_text="Toggle to enable or disable the admission period.")

    last_admissions = models.IntegerField(default=0, help_text="Admissions count from the last admission period.")
    current_admissions = models.IntegerField(default=0, help_text="Current admissions count.")

    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['latitude', 'longitude'], name='inst_lat_lng_idx'),
        ]

    def increment_admission_count(self):
        """Increase admission count atomically if admission period is active."""
        if self.admission:
            Institution.objects.filter(pk=self.pk).update(current_admissions=F('current_admissions') + 1)
            self.refresh_from_db(fields=['current_admissions'])

    def reset_admissions(self):
        """Move current admissions to last_admissions and reset count atomically."""
        with transaction.atomic():
            locked = Institution.objects.select_for_update().get(pk=self.pk)
            Institution.objects.filter(pk=self.pk).update(last_admissions=locked.current_admissions, current_admissions=0)
            self.refresh_from_db(fields=['last_admissions', 'current_admissions'])

    def save(self, *args, **kwargs):
        # Ensure foreign_university_name is only populated when affiliation is 'foreign'
        if self.affiliation != 'foreign':
            self.Foreign_University_Name = None

        if self.latitude is not None:
            self.latitude = Decimal(self.latitude)
        if self.longitude is not None:
            self.longitude = Decimal(self.longitude)

        super().save(*args, **kwargs)

    def update_average_rating(self):
        # Calculate the average rating using the reverse relationship
        average = self.ratings.aggregate(Avg('rating'))['rating__avg']
        self.average_rating = average if average else 0  # Set the average rating
        self.save()

    def __str__(self):
        return self.name
    
class Course(models.Model):
    FIELDS = [
        ('engineering', 'Engineering'),
        ('cit', 'Computer and Information Technology'),
        ('management', 'Management'),
        ('st', 'Science and Technology'),
        ('medicine', 'Medicine'),
        ('law', 'Law')
    ]

    LEVELS = [
        ('bachelor', 'Bachelor'),
        ('master', 'Master')
    ]

    AFFILIATION_CHOICES = [
        ('tribhuvan', 'Tribhuvan University'),
        ('pokhara', 'Pokhara University'),
        ('kathmandu', 'Kathmandu University'),
        ('gandaki', 'Gandaki University'),
        ('purbanchal', 'Purbanchal University'),
        ('foreign', 'Foreign University')
    ]
    
    name = models.CharField(max_length=255, unique=True)
    abbreviation = models.CharField(max_length=255, unique=True, blank=True, null=True)
    year = models.CharField(max_length=100)
    field = models.CharField(max_length=255, choices=FIELDS)
    level = models.CharField(max_length=255, choices=LEVELS)
    affiliation = models.CharField(max_length=50, choices=AFFILIATION_CHOICES)
    Foreign_University_Name = models.CharField(max_length=255, blank=True, null=True, help_text="If the affiliation is Foreign University, specify the university name here.")
    about = models.TextField()
    eligibility = models.TextField(blank=True, null=True)
    Admission_Criteria = models.TextField(blank=True, null=True)
    Job_Prospect = models.TextField(blank=True, null=True)
    Prospect_Career = models.TextField(blank=True, null=True)
    # Offered_by = models.ManyToManyField('Institution', blank=True, related_name='courses_offered')

    def save(self, *args, **kwargs):
        if not self.abbreviation:
            self.abbreviation = None
        if self.affiliation != 'foreign':
            self.Foreign_University_Name = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class InstitutionCourse(models.Model):
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='institution_courses')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='institution_courses')
    details = models.TextField(blank=True, null=True, help_text="Details specific to this course offered by the institution.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['institution', 'course'], name='uniq_institution_course')
        ]

    def __str__(self):
        return f"{self.institution.name} - {self.course.name}"

class InstitutionImage(models.Model):
    institution = models.ForeignKey(Institution, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to=gallery_upload_to)
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Image for {self.institution.name} - {self.caption}"
    
class Feedback(models.Model):
    STATUS_CHOICES = [
        ('show', 'Show'),
        ('hide', 'Hide'),
    ]

    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='feedbacks')
    email = models.EmailField()
    phone = models.CharField(max_length=10, blank=True, null=True)
    review = models.TextField()
    created_at = models.DateField(default=now)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='hide')

    def __str__(self):
        return self.user.name
    
class OTP(models.Model):
    MAX_FAILED_ATTEMPTS = 5
    LOCK_MINUTES = 5

    email = models.EmailField(db_index=True)
    otp_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(db_index=True)
    consumed_at = models.DateTimeField(blank=True, null=True, db_index=True)
    failed_attempts = models.PositiveSmallIntegerField(default=0)
    locked_until = models.DateTimeField(blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['email', 'expires_at'], name='otp_email_expires_idx'),
            models.Index(fields=['email', 'consumed_at'], name='otp_email_consumed_idx'),
        ]

    def __str__(self):
        return f"OTP for {self.email}"

    def set_otp(self, raw_otp):
        self.otp_hash = make_password(raw_otp)

    def check_otp(self, raw_otp):
        return check_password(raw_otp, self.otp_hash)

    def can_attempt(self):
        return self.locked_until is None or now() >= self.locked_until

    def record_failed_attempt(self):
        self.failed_attempts += 1
        if self.failed_attempts >= self.MAX_FAILED_ATTEMPTS:
            self.locked_until = now() + timedelta(minutes=self.LOCK_MINUTES)
        self.save(update_fields=['failed_attempts', 'locked_until'])

    def reset_attempts(self):
        if self.failed_attempts or self.locked_until is not None:
            self.failed_attempts = 0
            self.locked_until = None
            self.save(update_fields=['failed_attempts', 'locked_until'])
    
    def is_valid(self):
        return self.consumed_at is None and now() <= self.expires_at and self.can_attempt()

    def mark_consumed(self):
        self.consumed_at = now()
        self.save(update_fields=['consumed_at'])
    
class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='applications')
    program = models.ForeignKey(InstitutionCourse, on_delete=models.CASCADE, related_name='applications')
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    query = models.TextField(blank=True, null=True, help_text="Optional user query or additional information.")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'institution', 'program'], name='uniq_user_institution_program_application')
        ]
        indexes = [
            models.Index(fields=['institution', 'status'], name='app_institution_status_idx'),
            models.Index(fields=['user', 'applied_at'], name='app_user_applied_at_idx'),
        ]
    
    def save(self, *args, **kwargs):
        """Apply admission counter deltas transactionally on accepted status transitions."""
        with transaction.atomic():
            previous_status = None
            if self.pk:
                previous_status = Application.objects.select_for_update().only('status').get(pk=self.pk).status

            super().save(*args, **kwargs)

            institution = Institution.objects.select_for_update().only('admission').get(pk=self.institution_id)
            if not institution.admission:
                return

            was_accepted = previous_status == 'accepted'
            is_accepted = self.status == 'accepted'

            if was_accepted == is_accepted:
                return

            if is_accepted:
                Institution.objects.filter(pk=self.institution_id).update(current_admissions=F('current_admissions') + 1)
            else:
                Institution.objects.filter(pk=self.institution_id).update(
                    current_admissions=Case(
                        When(current_admissions__gt=0, then=F('current_admissions') - 1),
                        default=Value(0),
                        output_field=IntegerField(),
                    )
                )

    def __str__(self):
        return f"Application by {self.user.name} for {self.program.course.name} at {self.institution.name}"

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'institution'], name='uniq_user_institution_rating')
        ]

    def save(self, *args, **kwargs):
        # Upsert behavior: overwrite the existing row for (user, institution) instead of inserting a duplicate.
        if self.pk is None:
            existing = Rating.objects.filter(user=self.user, institution=self.institution).only('pk').first()
            if existing:
                self.pk = existing.pk
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Rating by {self.user} for {self.institution}"

class InstitutionView(models.Model):
    institution = models.ForeignKey('Institution', on_delete=models.CASCADE, related_name='views')
    timestamp = models.DateTimeField(default=now)

    class Meta:
        indexes = [
            models.Index(fields=['institution', 'timestamp'], name='inst_view_institution_ts_idx'),
        ]

    def __str__(self):
        return f"View for {self.institution.name} on {self.timestamp}"