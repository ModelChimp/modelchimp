from django.conf.urls import url
from django.conf import settings

from rest_framework.authtoken import views

from modelchimp.views.render import (common,
                                    signup,
                                    activate,
                                    profile,
                                    login_oauth,
                                    invite_oauth,
                                    model_detail_main,
                                    model_detail_compare,
                                    model_detail_custom_objects,
                                    model_detail_images,
                                    project_dashboard)
from modelchimp.views.api import invitation
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetConfirmView,
    PasswordResetDoneView,
    PasswordResetCompleteView,
    LoginView,
    LogoutView
)

urlpatterns = [
    url(r'^project/$', common.HomePageView.as_view(), name='home'),
    url(r'^project/(?P<project_id>\d+)/$',
        common.ModelListView.as_view(),
        name='model_list'),
    url(r'^project/(?P<project_id>\d+)/dashboard/experiment$',
        project_dashboard.ProjectDashboardExperimentView.as_view(),
        name='project_dashboard_experiment_render'),
    url(r'^project/(?P<project_id>\d+)/dashboard/parameter$',
        project_dashboard.ProjectDashboardParameterView.as_view(),
        name='project_dashboard_parameter_render'),
    url(r'^model-detail/(?P<pk>\d+)/$',
        model_detail_main.ModelDetailView.as_view(),
        name='model_detail'),
    url(r'^model-detail/(?P<pk>\d+)/code$',
        common.ModelDetailCodeView.as_view(),
        name='model_detail_code'),
    url(r'^model-detail/(?P<pk>\d+)/reports$',
        common.ModelDetailReportsView.as_view(),
        name='model_detail_reports'),
    url(r'^model-detail/(?P<pk>\d+)/custom-objects$',
        model_detail_custom_objects.ModelDetailCustomObjectsView.as_view(),
        name='model_detail_custom_objects'),
    url(r'^model-detail/(?P<pk>\d+)/images$',
        model_detail_images.ModelDetailImagesView.as_view(),
        name='model_detail_images'),
    url(r'^model-compare/(?P<m1>\d+)/(?P<m2>\d+)/$',
        model_detail_compare.ModelCompareView.as_view(),
        name='model_compare'),
    url(r'^pricing/$', common.PricingPageView.as_view(), name='pricing_page'),
    url(r'^evaluation/(?P<pk>\d+)/$',
        common.EvaluationDashboardView.as_view(),
        name='evaluation_dashboard'),
    url(r'^password_reset/$', PasswordResetView.as_view(), name='password_reset'),
    url(r'^password_reset/done/$',
        PasswordResetDoneView.as_view(),
        name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/'
    + '(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    url(r'^reset/done/$', PasswordResetCompleteView.as_view(),
        name='password_reset_complete'),
    url(r'^logout/$', LogoutView.as_view(), {'next_page': '/login'},name='logout'),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^special-invite/(?P<invite_name>[0-9A-Za-z_\-]+)/$', signup.signup,
        name='special_invite'),
    url(r'^signup/$', signup.signup, name='signup'),
    url(r'^signup/(?P<invite_id>[0-9A-Za-z_\-]+)$', signup.signup,
        name='signup_invite'),
    url(r'^profile/$', profile.ProfilePageView.as_view(), name='profile'),
    url(r'^profile/(?P<error_msg>\w+)$', profile.ProfilePageView.as_view(),
        name='profile'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/'
    + '(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        activate.activate, name='activate'),
]

if settings.OAUTH_LOGIN:
    urlpatterns += [url(r'^$', login_oauth.LoginOAuthView.as_view(), name='landing_page'),
                    url(r'^login/$', login_oauth.LoginOAuthView.as_view(), name='login'),
                    url(r'^invitation/(?P<invite_id>[0-9A-Za-z_\-]+)/$',
                        invite_oauth.InviteOAuthView.as_view(), name='invitation'),
                    ]
elif settings.ENTERPRISE_FLAG:
    urlpatterns += [
            url(r'^$', LoginView.as_view(template_name='registration/login_enterprise.html'),
                        name='landing_page'),
                    url(r'^login/$',
                        LoginView.as_view(template_name='registration/login_enterprise.html'),
                        name='login'),
                    url(r'^invitation/(?P<invite_id>[0-9A-Za-z_\-]+)/$',
                        invitation.invite_clicked, name='invitation'),
                        ]
else:
    urlpatterns += [url(r'^$', LoginView.as_view(template_name='registration/login.html'),
                        name='landing_page'),
                    url(r'^login/$',
                        LoginView.as_view(template_name='registration/login.html'),
                        name='login'),
                    url(r'^invitation/(?P<invite_id>[0-9A-Za-z_\-]+)/$',
                        invitation.invite_clicked, name='invitation'),
                        ]
