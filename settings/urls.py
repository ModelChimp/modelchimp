from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views


from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views

urlpatterns = [
    url(r'^', include('modelchimp.render_urls')),
    url(r'^api/', include('modelchimp.api_urls')),
    # All Auth urls
    url(r'^accounts/', include('allauth.urls')),
    url(r'^hq/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns = urlpatterns  + static(settings.MEDIA_URL,
                                document_root=settings.MEDIA_ROOT)
