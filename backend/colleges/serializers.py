from rest_framework import serializers

from .models import Application, College, CollegeCourse


class CollegeDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = [
            'id',
            'name',
            'overview',
            'phone',
            'email',
            'website',
            'address',
            'province',
            'affiliation',
            'admission',
            'last_admissions',
            'current_admissions',
            'average_rating',
        ]


class CollegeCourseSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    course_level = serializers.CharField(source='course.level', read_only=True)

    class Meta:
        model = CollegeCourse
        fields = ['id', 'course', 'course_name', 'course_level', 'details', 'created_at', 'updated_at']


class CollegeApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.CharField(source='user.get_full_name', read_only=True)
    applicant_email = serializers.CharField(source='user.email', read_only=True)
    program_name = serializers.CharField(source='program.course.name', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'applicant_name',
            'applicant_email',
            'program_name',
            'status',
            'query',
            'applied_at',
            'updated_at',
        ]
