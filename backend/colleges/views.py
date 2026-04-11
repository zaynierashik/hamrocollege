from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Application, College, CollegeCourse
from .serializers import (
    CollegeApplicationSerializer,
    CollegeCourseSerializer,
    CollegeDashboardSerializer,
)


class CollegeAdminRequiredMixin:
    permission_classes = [IsAuthenticated]

    def _validate_role(self, request):
        if request.user.role != 'college_admin':
            return Response(
                {'detail': 'Only college admins can access this endpoint.'},
                status=status.HTTP_403_FORBIDDEN,
            )
        return None

    def _get_college(self, request):
        return College.objects.filter(admin__user=request.user).first()


class CollegeAdminOverviewView(CollegeAdminRequiredMixin, APIView):
    def get(self, request):
        role_error = self._validate_role(request)
        if role_error:
            return role_error

        college = self._get_college(request)
        if not college:
            return Response({'detail': 'No college is linked to this account.'}, status=status.HTTP_404_NOT_FOUND)

        programs_count = CollegeCourse.objects.filter(college=college).count()
        applications_qs = Application.objects.filter(college=college)

        data = {
            'college_name': college.name,
            'total_applications': applications_qs.count(),
            'pending_review': applications_qs.filter(status='pending').count(),
            'active_programs': programs_count,
            'current_admissions': college.current_admissions,
        }
        return Response(data)


class CollegeAdminCollegeView(CollegeAdminRequiredMixin, APIView):
    def get(self, request):
        role_error = self._validate_role(request)
        if role_error:
            return role_error

        college = self._get_college(request)
        if not college:
            return Response({'detail': 'No college is linked to this account.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CollegeDashboardSerializer(college)
        return Response(serializer.data)

    def patch(self, request):
        role_error = self._validate_role(request)
        if role_error:
            return role_error

        college = self._get_college(request)
        if not college:
            return Response({'detail': 'No college is linked to this account.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CollegeDashboardSerializer(college, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CollegeAdminProgramsView(CollegeAdminRequiredMixin, APIView):
    def get(self, request):
        role_error = self._validate_role(request)
        if role_error:
            return role_error

        college = self._get_college(request)
        if not college:
            return Response({'detail': 'No college is linked to this account.'}, status=status.HTTP_404_NOT_FOUND)

        queryset = CollegeCourse.objects.filter(college=college).select_related('course').order_by('-created_at')
        serializer = CollegeCourseSerializer(queryset, many=True)
        return Response(serializer.data)


class CollegeAdminApplicationsView(CollegeAdminRequiredMixin, APIView):
    def get(self, request):
        role_error = self._validate_role(request)
        if role_error:
            return role_error

        college = self._get_college(request)
        if not college:
            return Response({'detail': 'No college is linked to this account.'}, status=status.HTTP_404_NOT_FOUND)

        queryset = (
            Application.objects.filter(college=college)
            .select_related('user', 'program', 'program__course')
            .order_by('-applied_at')
        )
        serializer = CollegeApplicationSerializer(queryset, many=True)
        return Response(serializer.data)
