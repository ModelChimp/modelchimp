from rest_framework import serializers
from modelchimp.models.machinelearning_model import MachineLearningModel


class MachineLearningModelSerializer(serializers.ModelSerializer):
    date_created_epoch = serializers.SerializerMethodField('to_epoch_date')
    comment_count = serializers.SerializerMethodField()
    submitted_by = serializers.SerializerMethodField()

    class Meta:
        model = MachineLearningModel
        fields = '__all__'
        extra_kwargs = {
            'features': {'write_only': True},
            'model_parameters': {'write_only': True},
            'evaluation_parameters': {'write_only': True},
            'deep_learning_parameters': {'write_only': True},
            'ml_model_file': {'write_only': True},
        }

    def to_epoch_date(self,obj):
        return int(obj.date_created.strftime("%s"))

    def get_comment_count(self, obj):
        return obj.comment_count

    def get_submitted_by(self, obj):
        return obj.user.profile.first_name + ' ' + obj.user.profile.last_name
