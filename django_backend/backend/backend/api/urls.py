from rest_framework.routers import DefaultRouter
from assets.api.urls import item_router
from employees.api.urls import employee_router, admin_router
from django.urls import path, include
from backend import settings
from django.conf.urls.static import static

# create and use default router
router = DefaultRouter()

# add all routers for each model to this central router
router.registry.extend(item_router.registry)
router.registry.extend(employee_router.registry)
router.registry.extend(admin_router.registry)

# api urls are automatically determined by this router
urlpatterns = [
    path('', include(router.urls))
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

