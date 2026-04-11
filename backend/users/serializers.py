from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from colleges.models import CollegeAdminProfile
from .models import Booking

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'bio',
            'phone',
            'is_trainer',
            'role',
            'status',
            'province',
        ]
        read_only_fields = ['id']


class BaseRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'phone',
            'bio',
            'province',
            'password',
        ]

    def _generate_unique_username(self, email, provided_username):
        base_username = (provided_username or '').strip()
        if not base_username:
            email_local = (email or '').split('@')[0]
            base_username = email_local

        normalized = slugify(base_username).replace('-', '_')
        if not normalized:
            normalized = 'user'

        username = normalized
        suffix = 1
        while User.objects.filter(username=username).exists():
            username = f'{normalized}_{suffix}'
            suffix += 1

        return username


class UserRegisterSerializer(BaseRegisterSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data.get('email')
        provided_username = validated_data.pop('username', '')
        validated_data['username'] = self._generate_unique_username(email, provided_username)
        user = User(**validated_data)
        user.role = 'user'
        user.set_password(password)
        user.save()
        return user


class CollegeAdminRegisterSerializer(BaseRegisterSerializer):
    college = serializers.CharField(max_length=255, write_only=True)

    class Meta(BaseRegisterSerializer.Meta):
        fields = BaseRegisterSerializer.Meta.fields + ['college']

    def create(self, validated_data):
        college = validated_data.pop('college')
        password = validated_data.pop('password')
        email = validated_data.get('email')
        provided_username = validated_data.pop('username', '')
        validated_data['username'] = self._generate_unique_username(email, provided_username)

        user = User(**validated_data)
        user.role = 'college_admin'
        user.set_password(password)
        user.save()

        CollegeAdminProfile.objects.create(user=user, college=college)
        return user


class RoleAwareTokenObtainPairSerializer(TokenObtainPairSerializer):
    username = serializers.CharField(required=False, write_only=True)
    email = serializers.EmailField(required=False, write_only=True)
    login_role = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # SimpleJWT adds username as required at runtime; relax it for email-based login.
        self.fields[self.username_field].required = False

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['email'] = user.email
        return token

    def validate(self, attrs):
        email = attrs.pop('email', None)
        if email and not attrs.get('username'):
            users = User.objects.filter(email=email)

            if self.login_role:
                users = users.filter(role=self.login_role)

            user_count = users.count()
            if user_count == 0:
                raise serializers.ValidationError({'email': 'No account found with this email.'})
            if user_count > 1:
                raise serializers.ValidationError(
                    {'email': 'Multiple accounts found for this email. Please use username to log in.'}
                )

            attrs['username'] = users.first().username

        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data


class CollegeAdminTokenObtainPairSerializer(RoleAwareTokenObtainPairSerializer):
    login_role = 'college_admin'
    default_error_messages = {
        'invalid_role': 'This account is not a college admin account.',
    }

    def validate(self, attrs):
        data = super().validate(attrs)
        if self.user.role != 'college_admin':
            self.fail('invalid_role')
        return data


class UserTokenObtainPairSerializer(RoleAwareTokenObtainPairSerializer):
    login_role = 'user'


class BookingSerializer(serializers.ModelSerializer):
    trainer_name = serializers.CharField(source='trainer.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'user', 'trainer', 'trainer_name', 'user_email', 'booking_date', 
                  'duration_minutes', 'service_type', 'notes', 'status', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
