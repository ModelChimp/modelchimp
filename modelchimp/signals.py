from allauth.exceptions import ImmediateHttpResponse
from allauth.account.signals import user_signed_up
from allauth.socialaccount.signals import pre_social_login

from django.conf import settings
from django.shortcuts import render_to_response
from django.db.models.signals import post_save
from django.dispatch import receiver

from modelchimp.models.comment import Comment
from modelchimp.models.profile import Profile
from modelchimp.models.experiment import Experiment


@receiver(post_save, sender=Comment)
def update_comment_count(sender, instance, created, **kwargs):
    if created:
        obj = Experiment.objects.get(pk = instance.ml_model.id)
        obj.comment_count += 1
        obj.save()


@receiver(user_signed_up)
def update_profile(request, user, **kwargs):
    extra_data =user.socialaccount_set.filter(provider='google')[0].extra_data
    profile = Profile.objects.create(user = user,
                                    first_name = extra_data['given_name'],
                                    last_name = extra_data['family_name'],
                                    avatar_url = extra_data['picture']
                                    )
    profile.get_remote_image()


@receiver(pre_social_login)
def check_allowed_domain(request, sociallogin, **kwargs):
    user_domain = sociallogin.user.email.split('@')[1]

    if settings.OAUTH_RESTRICT_USER_HOSTS != [''] and \
        user_domain not in settings.OAUTH_RESTRICT_USER_HOSTS:

        raise ImmediateHttpResponse(render_to_response('login_not_allowed.html',
                                                        {'domain': user_domain}))
