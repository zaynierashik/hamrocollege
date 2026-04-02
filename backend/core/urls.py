from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactSubmissionViewSet, ServiceOfferingViewSet, BlogPostViewSet

app_name = 'core'

router = DefaultRouter()
router.register(r'contact', ContactSubmissionViewSet, basename='contact')
router.register(r'services', ServiceOfferingViewSet, basename='services')
router.register(r'blog', BlogPostViewSet, basename='blog')

urlpatterns = [
    path('', include(router.urls)),
]
