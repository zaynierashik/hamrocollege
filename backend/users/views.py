from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from .models import Booking
from .serializers import UserSerializer, BookingSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for user profiles"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user profile"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def trainers(self, request):
        """Get list of all trainers"""
        trainers = User.objects.filter(is_trainer=True)
        serializer = self.get_serializer(trainers, many=True)
        return Response(serializer.data)


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
