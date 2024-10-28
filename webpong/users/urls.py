from django.urls import path
from django.contrib.auth.views import LogoutView, LoginView

from . import views


app_name = 'users'

urlpatterns = [
    path('', views.index, name='index'),
    path(
        'login/',
        LoginView.as_view(template_name='users/login.html'),
        name='login'
    ),
    path(
        'logout/',
        LogoutView.as_view(template_name='users/logged_out.html'),
        name='logout'
    ),
    path('signup/', views.SingUp.as_view(), name='signup'),
]
