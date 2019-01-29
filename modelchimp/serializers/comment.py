from rest_framework import serializers
from modelchimp.models.comment import Comment
from modelchimp.serializers.profile import ProfileSerializer


class CommentSerializer(serializers.ModelSerializer):
    user_detail = ProfileSerializer(source='user.profile', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
