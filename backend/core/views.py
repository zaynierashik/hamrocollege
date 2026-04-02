from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from django.utils import timezone
from .models import ContactSubmission, ServiceOffering, BlogPost
from .serializers import ContactSubmissionSerializer, ServiceOfferingSerializer, BlogPostSerializer


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    """ViewSet for contact form submissions"""
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        """Create a new contact submission"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Contact submission received successfully'},
            status=status.HTTP_201_CREATED
        )


class ServiceOfferingViewSet(viewsets.ModelViewSet):
    """ViewSet for service offerings"""
    queryset = ServiceOffering.objects.filter(is_active=True)
    serializer_class = ServiceOfferingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def active_services(self, request):
        """Get all active services"""
        services = self.queryset
        serializer = self.get_serializer(services, many=True)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ModelViewSet):
    """ViewSet for blog posts"""
    queryset = BlogPost.objects.filter(is_published=True).order_by('-published_date')
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get latest blog posts"""
        posts = self.queryset[:5]
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
