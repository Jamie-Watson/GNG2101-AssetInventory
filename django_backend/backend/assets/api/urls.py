from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet

# use default router for ease of use
item_router = DefaultRouter()
item_router.register(r'assets', ItemViewSet)