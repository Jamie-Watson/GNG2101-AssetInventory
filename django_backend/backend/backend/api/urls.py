from rest_framework.routers import DefaultRouter
from assets.api.urls import item_router
from django.urls import path, include

# create and use default router
router = DefaultRouter()

# add the item router stuff to this main router
router.registry.extend(item_router.registry)

# api urls are automatically determined by this router
urlpatterns = [
    path('', include(router.urls))
]

