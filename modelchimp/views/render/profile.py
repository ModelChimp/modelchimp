from django import forms
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.decorators import login_required

from modelchimp.models.user import User
from modelchimp.views.render.base import BaseView
from modelchimp.forms.profile import ProfileForm


@method_decorator(login_required, name='dispatch')
class ProfilePageView(BaseView):
    template_name = "profile.html"

    def get_context_data(self, **kwargs):
        context = super(ProfilePageView, self).get_context_data(**kwargs)
        user_object = User.objects.get(pk=self.request.user.id)

        form = ProfileForm(initial={'email': user_object.email,
            'first_name':user_object.profile.first_name,
            'last_name':user_object.profile.last_name,
            'avatar':user_object.profile.avatar }, request=self.request)

        context['form'] = form
        if user_object.profile.avatar:
            context['profile_pic'] = user_object.profile.avatar.url
        else:
            current_site = get_current_site(self.request)
            context['profile_pic'] = f'/assets/img/profile_pic.png'

        return context

    def post(self, request):
        form = ProfileForm(request.POST, request.FILES or None, request=request)

        if form.is_valid():
            form.save()
        else:
            context = super(ProfilePageView, self).get_context_data()
            context['form'] = form
            return render(request, 'profile.html', context)

        return redirect('profile')
