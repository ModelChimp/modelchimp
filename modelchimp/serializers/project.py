from uuid import uuid4

from rest_framework import serializers

from django.db import transaction

from modelchimp.models.project import Project
from modelchimp.models.membership import Membership
from modelchimp.serializers.membership import MembershipSerializer


class ProjectSerializer(serializers.ModelSerializer):
    members = MembershipSerializer(source="membership_set",
                                    many=True, read_only=True)
    member_count = serializers.SerializerMethodField()
    owner_flag = serializers.SerializerMethodField()
    date_created = serializers.SerializerMethodField('to_date')
    submission_count = serializers.SerializerMethodField()
    last_submitted = serializers.SerializerMethodField()
    last_submitted_epoch = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'
        depth = 1

    def get_member_count(self, obj):
        return obj.members.count()

    def get_owner_flag(self, obj):
        request_user = self.context.get("user_id")

        if request_user == obj.user.id:
            return True

        return False

    def get_submission_count(self, obj):
        return obj.ml_model_project.count()

    def get_last_submitted(self, obj):
        result = obj.ml_model_project.order_by('-date_created')

        if result.count() > 0:
            result = result[0].date_created
        else:
            result = obj.date_created

        return result.strftime('%b %d %Y, %H:%M:%S')

    def to_date(self, obj):
        return obj.date_created.strftime('%b %d %Y, %H:%M:%S')

    def get_last_submitted_epoch(self,obj):
        result = obj.ml_model_project.order_by('-date_created')

        if result.count() > 0:
            result = result[0].date_created
        else:
            result = obj.date_created

        return int(result.strftime("%s"))

    @transaction.atomic
    def create(self, validated_data):
        project = Project.objects.create(**validated_data)
        user_object = self.initial_data.get("user_object")
        Membership(project=project, user=user_object, key=uuid4()).save()
        project.save()

        return project
