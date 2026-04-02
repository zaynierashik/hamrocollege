from django.db import models

class ContactSubmission(models.Model):
    """Model to store contact form submissions"""
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    service = models.CharField(
        max_length=50,
        choices=[
            ('pain_reduction', 'Schmerzreduktion'),
            ('performance', 'Performance Coaching'),
            ('rehabilitation', 'Rehabilitation'),
        ]
    )
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.service}"


class ServiceOffering(models.Model):
    """Model for service offerings"""
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    image_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['title']
    
    def __str__(self):
        return self.title


class BlogPost(models.Model):
    """Model for blog/podcast posts"""
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    published_date = models.DateTimeField()
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title
