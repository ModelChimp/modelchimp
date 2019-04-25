from rest_framework import serializers

from modelchimp.models.user import User
from modelchimp.models.profile import Profile

from django.db import transaction


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects._create_user(**validated_data)
        Profile.objects.create(user=user)
        return user

    def validate(self,data):
        password = data.get('password')
        confirm_password = data.pop('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError("Passwords don't match")

        return data
