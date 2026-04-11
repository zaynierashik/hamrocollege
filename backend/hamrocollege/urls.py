"""
Main URL configuration for hamrocollege.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls', namespace='core')),
    path('api/users/', include('users.urls', namespace='users')),
    path('api/colleges/', include('colleges.urls', namespace='colleges')),
    path('api-auth/', include('rest_framework.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
