from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode

from modelchimp.models.membership import Membership
from modelchimp.models.invitation import Invitation
from modelchimp.models.user import User
from modelchimp.views.render.base import BaseView


@method_decorator(login_required, name='dispatch')
class InviteOAuthView(BaseView):
    template_name = "registration/login_oauth.html"

    def dispatch(self, request, invite_id, *args, **kwargs):
        iid = force_text(urlsafe_base64_decode(invite_id))

        if request.user.is_authenticated:
            invite_object = Invitation.objects.get(pk=iid)
            if request.user.email != invite_object.to_email:
                return HttpResponse('Logged in user does not match the invitee link! Go back <a href="/">Home</a>')

            user = User.objects.get(email=invite_object.to_email)
            # Check if the user is already added to the project
            try:
                Membership.objects.get(project=invite_object.project, user=user)
            except Membership.DoesNotExist:
                Membership.objects.create(project=invite_object.project, user=user)

            return HttpResponseRedirect('/project/' + str(invite_object.project.id))

        return super(InviteOAuthView, self).dispatch(request, *args, **kwargs)
