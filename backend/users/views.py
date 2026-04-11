from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from colleges.models import Application
from .models import Booking
from .serializers import (
    UserSerializer,
    BookingSerializer,
    UserRegisterSerializer,
    CollegeAdminRegisterSerializer,
    UserTokenObtainPairSerializer,
    CollegeAdminTokenObtainPairSerializer,
)

User = get_user_model()


class UserRegisterView(generics.CreateAPIView):
    """Register a new end user account."""

    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]


class CollegeAdminRegisterView(generics.CreateAPIView):
    """Register a new college admin account with admin profile."""

    queryset = User.objects.all()
    serializer_class = CollegeAdminRegisterSerializer
    permission_classes = [AllowAny]


class LoginView(TokenObtainPairView):
    """JWT login for any account role."""

    serializer_class = UserTokenObtainPairSerializer
    permission_classes = [AllowAny]


class CollegeAdminLoginView(TokenObtainPairView):
    """JWT login endpoint restricted to college admin accounts."""

    serializer_class = CollegeAdminTokenObtainPairSerializer
    permission_classes = [AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for user profiles"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user profile"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @me.mapping.patch
    def me_update(self, request):
        """Partially update current user profile"""
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def trainers(self, request):
        """Get list of all trainers"""
        trainers = User.objects.filter(is_trainer=True)
        serializer = self.get_serializer(trainers, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_applications(self, request):
        """Return applications for current logged in user."""
        applications = (
            Application.objects.filter(user=request.user)
            .select_related('college', 'program', 'program__course')
            .order_by('-applied_at')
        )
        data = [
            {
                'id': app.id,
                'college_name': app.college.name,
                'program_name': app.program.course.name,
                'status': app.status,
                'applied_at': app.applied_at,
            }
            for app in applications
        ]
        return Response(data)

    @action(detail=False, methods=['get'])
    def dashboard_overview(self, request):
        """Simple user dashboard summary stats."""
        applications = Application.objects.filter(user=request.user)
        data = {
            'total_applications': applications.count(),
            'accepted': applications.filter(status='accepted').count(),
            'pending': applications.filter(status='pending').count(),
            'saved_colleges': 0,
        }
        return Response(data)


class BookingViewSet(viewsets.ModelViewSet):
    """ViewSet for training bookings"""
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return bookings for current user"""
        return Booking.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create booking for current user"""
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming bookings"""
        from django.utils import timezone
        bookings = self.get_queryset().filter(booking_date__gte=timezone.now())
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)
