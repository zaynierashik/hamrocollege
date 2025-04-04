from django.urls import path
from app import views

urlpatterns = [
    path('', views.index, name='index'),

    # Website
    path('authentication/', views.authentication, name='authentication'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('about-us/', views.about_us, name='about-us'),
    path('all-institutions/', views.all_institutions, name='all-institutions'),
    path('institution-details/<int:id>', views.institution_details, name='institution-details'),
    path('course-details/<int:id>', views.course_details, name='course-details'),

    # User
    path('userpage/', views.userpage, name='userpage'),
    path('profile/', views.profile, name='profile'),
    path('institutions/', views.institutions, name='institutions'),
    path('courses/', views.courses, name='courses'),
    path('applications/', views.applications, name='applications'),
    path('feedbacks/', views.feedbacks, name='feedbacks'),
    
    path('update-profile/<int:id>', views.update_profile, name='update-profile'),
    path('send-application/', views.send_application, name='send-application'),
    path('send-feedback/', views.send_feedback, name='send-feedback'),

    # Institution
    path('institution-authentication/', views.institution_authentication, name='institution-authentication'),
    path('institution-signup/', views.institution_signup, name='institution-signup'),
    path('institution-login/', views.institution_login, name='institution-login'),
    path('institution-logout/', views.institution_logout, name='institution-logout'),
    path('institution-dashboard/', views.institution_dashboard, name='institution-dashboard'),
    path('institution-profile/', views.institution_profile, name='institution-profile'),
    path('institution-admin-profile/', views.institutionadmin_profile, name='institution-admin-profile'),
    path('programs/', views.programs, name='programs'),
    path('admission/', views.admission, name='admission'),

    path('add-institution/', views.add_institution, name='add-institution'),
    path('add-offered-course/', views.add_offered_course, name='add-offered-course'),
    path('edit-offered-course/<int:institution_course_id>/', views.edit_offered_course, name='edit-offered-course'),
    path('update-institution/<int:institution_id>/', views.update_institution, name='update-institution'),
    path('update-offered-course/<int:institution_course_id>/', views.update_offered_course, name='update-offered-course'),
    path('update-institutionadmin-profile/<int:id>', views.update_institutionadminprofile, name='update-institutionadmin-profile'),
    path('delete-offered-course/<int:course_id>/', views.delete_offered_course, name='delete-offered-course'),

    # Admin
    path('admin-authentication/', views.admin_authentication, name='admin-authentication'),
    path('admin-signup/', views.admin_signup, name='admin-signup'),
    path('admin-login/', views.admin_login, name='admin-login'),
    path('admin-logout/', views.admin_logout, name='admin-logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('admin-profile/', views.admin_profile, name='admin-profile'),
    path('system-user/', views.system_user, name='system-user'),
    path('user/', views.user, name='user'),
    path('institution/', views.institution, name='institution'),
    path('course/', views.course, name='course'),
    path('feedback/', views.feedback, name='feedback'),

    path('delete-system-user/<int:system_user_id>/', views.delete_system_user, name='delete-system-user'),
    
    path('add-course/', views.add_course, name='add-course'),
    path('edit-course/<int:course_id>/', views.edit_course, name='edit-course'),
    path('update-course/<int:course_id>/', views.update_course, name='update-course'),
    path('update-admin-profile/<int:id>', views.update_adminprofile, name='update-admin-profile'),

    # Algorithm
    path('update-location/', views.update_location, name='update_location'),
    path('update-institution-location/', views.update_institution_location, name='update_institution_location'),
    path('nearby-institutions/<int:user_id>/<int:radius>/', views.nearby_institutions_view, name='nearby_institutions'),

    # Optional for now. Can delete these two urls later
    path('password-setting/', views.password_setting, name='password-setting'),
    path('change-setting/', views.change_setting, name='change-setting'),
    
    path('request-otp/', views.request_otp, name='request-otp'),
    path('change-user-password/', views.change_user_password, name='change-user-password'),

    # Ajax
    path('update-status/<int:institution_id>/', views.update_status, name='update-status'),
    path('get-courses/<int:institution_id>/', views.get_courses, name='get_courses'),
    path("toggle-admission/<int:institution_id>/", views.toggle_admission, name="toggle-admission"),

    # Test URLs
    path('update-application-status/<int:application_id>/', views.update_application_status, name='update-application-status'),
    path('reset-admissions/<int:institution_id>/', views.reset_admission_count, name='reset-admissions'),

    # ChatBot API
    path('api/chatbotinstitutions/', views.chatbot_institutions, name='chatbotinstitutions'),
    path('api/chatbotinstitutions/<str:name>/', views.chatbot_institution_details, name='chatbot_institution_details'),
    path('api/chatbotcourses/', views.chatbot_courses, name='chatbotcourses'),
    path('api/chatbotcourses/<str:name>/', views.chatbot_course_details, name='chatbot_course_details'),
    path('chat/', views.chat, name='chat'),

    # Graph API
    path('api/user-distribution/', views.user_distribution_by_province, name='user_distribution'),
    path('api/institution-status/', views.institution_status_count, name='institution_status'),
    path('api/feedback-status/', views.feedback_status_count, name='feedback_status'),
]