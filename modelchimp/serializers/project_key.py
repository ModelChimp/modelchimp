from rest_framework import serializers
from modelchimp.models.membership import Membership


class ProjectKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('key',)
