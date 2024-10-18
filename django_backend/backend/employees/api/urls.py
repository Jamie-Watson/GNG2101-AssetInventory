from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AdminViewSet

# create default routers for each
employee_router = DefaultRouter()
admin_router = DefaultRouter()

# register each
employee_router.register(r'employees', EmployeeViewSet)
admin_router.register(r'admins', AdminViewSet)