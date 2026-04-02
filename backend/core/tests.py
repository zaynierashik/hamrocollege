"""
Tests for core app models and views
"""
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import ContactSubmission, ServiceOffering, BlogPost


class ContactSubmissionTestCase(TestCase):
    """Test ContactSubmission model and API"""
    
    def setUp(self):
        self.client = APIClient()
        self.contact_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'phone': '+49123456789',
            'service': 'pain_reduction',
            'message': 'Test message'
        }
    
    def test_create_contact(self):
        """Test creating a contact submission"""
        response = self.client.post(
            reverse('core:contact-list'),
            self.contact_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactSubmission.objects.count(), 1)
    
    def test_invalid_email(self):
        """Test validation of invalid email"""
        invalid_data = self.contact_data.copy()
        invalid_data['email'] = 'invalid-email'
        response = self.client.post(
            reverse('core:contact-list'),
            invalid_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ServiceOfferingTestCase(TestCase):
    """Test ServiceOffering model and API"""
    
    def setUp(self):
        self.client = APIClient()
        self.service = ServiceOffering.objects.create(
            title='Neuro Athletik',
            description='Training for athletes',
            category='Holistic Wellness',
            is_active=True
        )
    
    def test_list_services(self):
        """Test listing active services"""
        response = self.client.get(reverse('core:services-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_inactive_service_not_listed(self):
        """Test that inactive services are not listed"""
        self.service.is_active = False
        self.service.save()
        response = self.client.get(reverse('core:services-list'))
        self.assertEqual(len(response.data['results']), 0)


class BlogPostTestCase(TestCase):
    """Test BlogPost model and API"""
    
    def setUp(self):
        self.client = APIClient()
        from django.utils import timezone
        self.post = BlogPost.objects.create(
            title='Health Tips',
            description='Tips for better health',
            published_date=timezone.now(),
            is_published=True
        )
    
    def test_list_blog_posts(self):
        """Test listing published blog posts"""
        response = self.client.get(reverse('core:blog-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_latest_endpoint(self):
        """Test latest blog posts endpoint"""
        response = self.client.get(reverse('core:blog-latest'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
