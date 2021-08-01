from django.conf.urls import include, url
from django.contrib import admin 

from django.conf import settings
from django.conf.urls.static import static

from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetConfirmView,
    PasswordResetDoneView,
    PasswordResetCompleteView,
)

urlpatterns = [
    url(r'^api/', include('settings.api_urls')),
    url(r'^api/v2/', include('settings.api_urls_v2')),
    url(r'^hq/', admin.site.urls),

    # Password reset views
    url(r'^password_reset/$', PasswordResetView.as_view(), name='password_reset'),
    url(r'^password_reset/done/$', PasswordResetDoneView.as_view(), name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    url(r'^reset/done/$', PasswordResetCompleteView.as_view(),name='password_reset_complete'),
]

urlpatterns = urlpatterns  + static(settings.MEDIA_URL,
                                document_root=settings.MEDIA_ROOT)
urlpatterns = urlpatterns  + static(settings.STATIC_URL,
                                document_root=settings.STATIC_ROOT) 
