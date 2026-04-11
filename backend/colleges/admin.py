from django.contrib import admin

from .models import (
    Application,
    College,
    CollegeAdminProfile,
    CollegeCourse,
    CollegeImage,
    CollegeView,
    Course,
    Rating,
)


@admin.register(CollegeAdminProfile)
class CollegeAdminProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'college', 'status']
    list_filter = ['status']
    search_fields = ['user__username', 'user__email', 'college']


@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'province', 'affiliation', 'admission']
    search_fields = ['name', 'email', 'address']
    list_filter = ['province', 'affiliation', 'admission']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['name', 'abbreviation', 'field', 'level', 'affiliation']
    search_fields = ['name', 'abbreviation']
    list_filter = ['field', 'level', 'affiliation']


@admin.register(CollegeCourse)
class CollegeCourseAdmin(admin.ModelAdmin):
    list_display = ['college', 'course', 'created_at']
    search_fields = ['college__name', 'course__name']


@admin.register(CollegeImage)
class CollegeImageAdmin(admin.ModelAdmin):
    list_display = ['college', 'caption']
    search_fields = ['college__name', 'caption']


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['user', 'college', 'program', 'status', 'applied_at']
    list_filter = ['status', 'applied_at']
    search_fields = ['user__username', 'college__name', 'email']


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['user', 'college', 'rating']
    list_filter = ['rating']


@admin.register(CollegeView)
class CollegeViewAdmin(admin.ModelAdmin):
    list_display = ['college', 'timestamp']
    list_filter = ['timestamp']
