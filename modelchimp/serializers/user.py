from rest_framework import serializers

from modelchimp.models.user import User
from modelchimp.serializers.profile import ProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    profile_detail = ProfileSerializer(source='profile', read_only=True)
    first_name = serializers.CharField(source='profile.first_name')
    last_name = serializers.ReadOnlyField(source='profile.last_name')
    avatar = serializers.ReadOnlyField(source='user.profile.avatar')

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'profile_detail','avatar')
