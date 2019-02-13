from django.conf import settings
from django.views.generic import TemplateView
from django.contrib.auth.models import AnonymousUser
from django.contrib.sites.shortcuts import get_current_site

from modelchimp.models.profile import Profile


class BaseView(TemplateView):
    meta_dict = {
        'url': '',
        'type': 'website',
        'title': 'Modelchimp',
        'description': 'Modelchimp helps you to keep track of your machine learning models, share and collaborate on it.',
        'image': '/assets/img/logo.png'
    }

    def get_context_data(self, **kwargs):
        self.meta_dict['url'] = self.request.get_full_path()
        context = super(BaseView, self).get_context_data(**kwargs)
        context['meta_dict'] = self.meta_dict
        context['enterprise_flag'] = settings.ENTERPRISE_FLAG
        context['aws_storage_flag'] = settings.AWS_STORAGE_FLAG
        context['url_name'] = self.request.resolver_match.url_name
        if not isinstance(self.request.user, AnonymousUser):
            profile = Profile.objects.get(user = self.request.user)
            context['email'] = self.request.user.email
            context['name'] = profile.first_name

            if profile.avatar:
                context['profile_pic'] = profile.avatar.url
            else:
                current_site = get_current_site(self.request)
                context['profile_pic'] = f'/assets/img/profile_pic.png'

        return context
