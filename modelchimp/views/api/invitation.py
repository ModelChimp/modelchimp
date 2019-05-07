from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage

from modelchimp.models.user import User
from modelchimp.models.project import Project
from modelchimp.models.invitation import Invitation
from modelchimp.models.membership import Membership
from modelchimp.serializers.invitation import InvitationSerializer

from rest_framework import status, generics
from rest_framework.response import Response

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class InviteAPI(generics.CreateAPIView):
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def create(self, request, project_id, *args, **kwargs):
        data = request.data.copy()
        data['from_user'] = request.user.id
        project = Project.objects.get(id=project_id)
        data['project'] = project.id
        serializer = self.serializer_class(data=data)
        serializer.is_valid()

        if serializer.is_valid():
            saved_instance = serializer.save()
            #Create the content for the email
            current_site = get_current_site(request)
            mail_subject = 'ModelChimp: You have been invited to join %s' % (project.name,)
            message = render_to_string('email/invitation_email.html', {
                'domain': current_site,
                'invite_id': urlsafe_base64_encode(force_bytes(saved_instance.id)),
                'project_name' : project.name
            })
            to_email = serializer.validated_data['to_email']
            email = EmailMessage(
                        mail_subject, message, to=[to_email]
            )
            try:
                email.send()
            except Exception as e:
                saved_instance.delete()

            return Response({}, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class InviteInfoAPI(generics.CreateAPIView):
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()
    permission_classes = ()

    def get(self, request, invite_id, *args, **kwargs):
        iid = force_text(urlsafe_base64_decode(invite_id))

        # Save the clicked event
        invite_object = self.queryset.get(pk=iid)
        invite_object.invite_clicked = True
        invite_object.save()

        # Check if the user already exists
        try:
            user = User.objects.get(email=invite_object.to_email)

            try:
                Membership.objects.get(project=invite_object.project, user=user)
            except Membership.DoesNotExist:
                Membership.objects.create(project=invite_object.project, user=user)

            return Response({'existing_user': True})
        except User.DoesNotExist:
            pass


        return Response({'existing_user': False})
