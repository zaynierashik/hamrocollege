from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserViewSet,
    BookingViewSet,
    UserRegisterView,
    CollegeAdminRegisterView,
    LoginView,
    CollegeAdminLoginView,
)

app_name = 'users'

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'bookings', BookingViewSet, basename='bookings')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegisterView.as_view(), name='register_user'),
    path('register/college-admin/', CollegeAdminRegisterView.as_view(), name='register_college_admin'),
    path('login/', LoginView.as_view(), name='login'),
    path('login/college-admin/', CollegeAdminLoginView.as_view(), name='college_admin_login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
