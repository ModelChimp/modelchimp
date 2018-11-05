from rest_framework import serializers
from modelchimp.models.comment import Comment
from modelchimp.serializers.user import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
