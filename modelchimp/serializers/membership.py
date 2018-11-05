from rest_framework import serializers
from modelchimp.models.membership import Membership


class MembershipSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')
    email = serializers.ReadOnlyField(source='user.email')
    first_name = serializers.ReadOnlyField(source='user.profile.first_name')
    last_name = serializers.ReadOnlyField(source='user.profile.last_name')
    avatar = serializers.ImageField(source='user.profile.avatar')

    class Meta:
        model = Membership
        fields = ('id', 'email', 'first_name', 'last_name','avatar','is_owner')
