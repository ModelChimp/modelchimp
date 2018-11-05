from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage

from modelchimp.models.user import User
from modelchimp.models.invitation import Invitation
from modelchimp.models.membership import Membership
from modelchimp.serializers.invitation import InvitationSerializer

from rest_framework import status, generics
from rest_framework.response import Response

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class SendInviteAPI(generics.CreateAPIView):
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['from_user'] = request.user.id
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            saved_instance = serializer.save()

            #Check if the from user is member of the project
            from_user = serializer.validated_data['from_user']
            project = serializer.validated_data['project']

            #Create the content for the email
            current_site = request.META['HTTP_HOST']
            mail_subject = 'ModelChimp: You have been invited to join %s' % (project.name,)
            message = render_to_string('email/invitation_email.html', {
                'domain': current_site,
                'invite_id': urlsafe_base64_encode(force_bytes(saved_instance.id)).decode('utf-8'),
                'project_name' : project.name
            })
            to_email = serializer.validated_data['to_email']
            email = EmailMessage(
                        mail_subject, message, to=[to_email]
            )
            try:
                email.send()
            except Exception as e:
                print(e)
                saved_instance.delete()

            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def invite_clicked(request, invite_id, *args, **kwargs):
    try:
        iid = force_text(urlsafe_base64_decode(invite_id))
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        return HttpResponse('This invitation link is no longer valid!')

    # Save the clicked event
    invite_object = Invitation.objects.get(pk=iid)
    invite_object.invite_clicked = True
    invite_object.save()

    # Check if the user already exists
    try:
        user = User.objects.get(email=invite_object.to_email)

        try:
            Membership.objects.get(project=invite_object.project, user=user)
        except Membership.DoesNotExist:
            Membership.objects.create(project=invite_object.project, user=user)

        login(request, user, settings.AUTHENTICATION_BACKENDS[0])
        return HttpResponseRedirect('/project/' + str(invite_object.project.id))
    except User.DoesNotExist:
        pass

    if settings.ENTERPRISE_FLAG:
        return HttpResponseRedirect('/invite/' + invite_id)

    return HttpResponseRedirect('/signup/' + invite_id)
