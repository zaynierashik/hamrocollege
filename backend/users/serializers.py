from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Booking

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'bio', 'phone', 'is_trainer']
        read_only_fields = ['id']


class BookingSerializer(serializers.ModelSerializer):
    trainer_name = serializers.CharField(source='trainer.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'user', 'trainer', 'trainer_name', 'user_email', 'booking_date', 
                  'duration_minutes', 'service_type', 'notes', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']
