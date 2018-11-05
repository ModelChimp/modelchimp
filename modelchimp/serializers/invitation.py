from rest_framework import serializers
from modelchimp.models.invitation import Invitation


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'
