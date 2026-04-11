from django.urls import path

from .views import (
    CollegeAdminApplicationsView,
    CollegeAdminCollegeView,
    CollegeAdminOverviewView,
    CollegeAdminProgramsView,
)

app_name = 'colleges'

urlpatterns = [
    path('dashboard/overview/', CollegeAdminOverviewView.as_view(), name='dashboard_overview'),
    path('dashboard/college/', CollegeAdminCollegeView.as_view(), name='dashboard_college'),
    path('dashboard/programs/', CollegeAdminProgramsView.as_view(), name='dashboard_programs'),
    path('dashboard/applications/', CollegeAdminApplicationsView.as_view(), name='dashboard_applications'),
]
