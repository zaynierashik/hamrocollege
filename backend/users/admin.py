from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Booking


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('bio', 'phone', 'is_trainer')}),
    )
    list_display = ['username', 'email', 'is_staff', 'is_trainer']
    list_filter = UserAdmin.list_filter + ('is_trainer',)


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
