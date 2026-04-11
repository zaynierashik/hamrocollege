import os

from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Avg
from django.utils.timezone import now


def logo_upload_to(instance, filename):
    college_name = instance.name.lower().replace(' ', '-')
    return os.path.join(f'college/{college_name}/logo/{filename}')


def cover_upload_to(instance, filename):
    college_name = instance.name.lower().replace(' ', '-')
    return os.path.join(f'college/{college_name}/cover/{filename}')


def gallery_upload_to(instance, filename):
    college_name = instance.college.name.lower().replace(' ', '-')
    return os.path.join(f'college/{college_name}/gallery/{filename}')


class CollegeAdminProfile(models.Model):
    user = models.OneToOneField(
        'users.CustomUser',
        on_delete=models.CASCADE,
        related_name='college_admin_profile',
    )
    college = models.CharField(max_length=255)
    status = models.CharField(
        max_length=20,
        choices=[
            ('approved', 'Approved'),
            ('rejected', 'Rejected'),
            ('not_decided', 'Not Decided'),
        ],
        default='not_decided',
    )

    def clean(self):
        if self.user and self.user.role != 'college_admin':
            raise ValidationError('College admin profile requires user role college_admin.')

    def __str__(self):
        return self.user.get_full_name() or self.user.username


class College(models.Model):
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
    map = models.TextField(
        blank=True,
        null=True,
        help_text='Embed map URL with width value 950 and height value 500.',
    )
    logo = models.ImageField(upload_to=logo_upload_to, blank=True, null=True)
    cover_photo = models.ImageField(upload_to=cover_upload_to, blank=True, null=True)
    affiliation = models.CharField(max_length=50, choices=AFFILIATION_CHOICES)
    foreign_university_name = models.CharField(max_length=255, blank=True, null=True)
    admin = models.OneToOneField(
        CollegeAdminProfile,
        on_delete=models.CASCADE,
        related_name='managed_college',
        blank=True,
        null=True,
    )
    admission = models.BooleanField(default=False, help_text='Toggle admission period.')
    last_admissions = models.IntegerField(default=0)
    current_admissions = models.IntegerField(default=0)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def increment_admission_count(self):
        if self.admission:
            self.current_admissions += 1
            self.save(update_fields=['current_admissions'])

    def reset_admissions(self):
        self.last_admissions = self.current_admissions
        self.current_admissions = 0
        self.save(update_fields=['last_admissions', 'current_admissions'])

    def save(self, *args, **kwargs):
        if self.affiliation != 'foreign':
            self.foreign_university_name = None
        super().save(*args, **kwargs)

    def update_average_rating(self):
        average = self.ratings.aggregate(Avg('rating'))['rating__avg']
        self.average_rating = average if average else 0
        self.save(update_fields=['average_rating'])

    def __str__(self):
        return self.name


class Course(models.Model):
    FIELDS = [
        ('engineering', 'Engineering'),
        ('cit', 'Computer and Information Technology'),
        ('management', 'Management'),
        ('st', 'Science and Technology'),
        ('medicine', 'Medicine'),
        ('law', 'Law'),
    ]

    LEVELS = [
        ('bachelor', 'Bachelor'),
        ('master', 'Master'),
    ]

    AFFILIATION_CHOICES = College.AFFILIATION_CHOICES

    name = models.CharField(max_length=255, unique=True)
    abbreviation = models.CharField(max_length=255, unique=True, blank=True, null=True)
    year = models.CharField(max_length=100)
    field = models.CharField(max_length=255, choices=FIELDS)
    level = models.CharField(max_length=255, choices=LEVELS)
    affiliation = models.CharField(max_length=50, choices=AFFILIATION_CHOICES)
    foreign_university_name = models.CharField(max_length=255, blank=True, null=True)
    about = models.TextField()
    eligibility = models.TextField(blank=True, null=True)
    admission_criteria = models.TextField(blank=True, null=True)
    job_prospect = models.TextField(blank=True, null=True)
    prospect_career = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.abbreviation:
            self.abbreviation = None
        if self.affiliation != 'foreign':
            self.foreign_university_name = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class CollegeCourse(models.Model):
    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE,
        related_name='college_courses',
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='college_courses',
    )
    details = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('college', 'course')

    def __str__(self):
        return f'{self.college.name} - {self.course.name}'


class CollegeImage(models.Model):
    college = models.ForeignKey(College, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=gallery_upload_to)
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'Image for {self.college.name} - {self.caption}'


class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='applications')
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='applications')
    program = models.ForeignKey(CollegeCourse, on_delete=models.CASCADE, related_name='applications')
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    query = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'college', 'program')

    def save(self, *args, **kwargs):
        if self.pk:
            old_application = Application.objects.get(pk=self.pk)
            if old_application.status != 'accepted' and self.status == 'accepted':
                self.college.increment_admission_count()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Application by {self.user} for {self.program.course.name} at {self.college.name}'


class Rating(models.Model):
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('user', 'college')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.college.update_average_rating()

    def __str__(self):
        return f'Rating by {self.user} for {self.college}'


class CollegeView(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='views')
    timestamp = models.DateTimeField(default=now)

    def __str__(self):
        return f'View for {self.college.name} on {self.timestamp}'
