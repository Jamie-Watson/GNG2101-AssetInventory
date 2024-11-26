from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from django.conf.urls.static import static
from backend import settings

urlpatterns = [
    # Admin and API routes
    path('admin/', admin.site.urls),
    path('api/', include('backend.api.urls')),

    # Template route for index.html
    path('', TemplateView.as_view(template_name='index.html')),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
