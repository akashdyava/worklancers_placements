from django.urls import path
from .admin_views import admin_dashboard
from .import views


urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path("apply/", views.submit_application, name="submit_application"),
    path("submit-testimonial/", views.submit_testimonial, name="submit_testimonial"),
]
urlpatterns += [
    path("admin_dashboard/", admin_dashboard, name="admin-dashboard"),
]