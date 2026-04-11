from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now


class CustomUser(AbstractUser):
    """Role-based custom user for system admins, college admins, and users."""

    ROLE_CHOICES = [
        ('system_admin', 'System Admin'),
        ('college_admin', 'College Admin'),
        ('user', 'User'),
    ]

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

    bio = models.TextField(blank=True)
    phone = models.CharField(max_length=15, unique=True, blank=True, null=True)
    is_trainer = models.BooleanField(default=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    province = models.CharField(max_length=100, choices=PROVINCES, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(default=now)
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.get_full_name() or self.username

    @property
    def is_system_admin(self):
        return self.role == 'system_admin'

    @property
    def is_college_admin(self):
        return self.role == 'college_admin'


class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"OTP for {self.email}"

    def is_valid(self):
        return (now() - self.created_at).seconds < 300


class Booking(models.Model):
    """Model for training session bookings"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookings')
    trainer = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='training_sessions')
    booking_date = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    service_type = models.CharField(max_length=100)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-booking_date']
    
    def __str__(self):
        return f"{self.user.username} - {self.booking_date}"
