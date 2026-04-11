from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Booking, OTP


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            'Additional Info',
            {
                'fields': (
                    'bio',
                    'phone',
                    'is_trainer',
                    'role',
                    'status',
                    'province',
                    'latitude',
                    'longitude',
                    'created_at',
                )
            },
        ),
    )
    list_display = ['username', 'email', 'role', 'status', 'is_staff', 'is_trainer']
    list_filter = UserAdmin.list_filter + ('is_trainer', 'role', 'status')
    readonly_fields = ['created_at']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'trainer', 'booking_date', 'status']
    list_filter = ['status', 'booking_date']
    search_fields = ['user__username', 'trainer__username', 'service_type']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Booking Details', {
            'fields': ('user', 'trainer', 'booking_date', 'duration_minutes', 'service_type')
        }),
        ('Notes & Status', {
            'fields': ('notes', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ['email', 'otp', 'created_at']
    search_fields = ['email']
    list_filter = ['created_at']
