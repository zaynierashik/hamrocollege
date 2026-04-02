from rest_framework import serializers
from .models import ContactSubmission, ServiceOffering, BlogPost


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'phone', 'service', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class ServiceOfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceOffering
        fields = ['id', 'title', 'description', 'category', 'image_url', 'is_active']
        read_only_fields = ['id']


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'description', 'content', 'image_url', 'published_date', 'is_published']
        read_only_fields = ['id']
