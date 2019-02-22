from rest_framework import serializers
from modelchimp.models.experiment_asset import ExperimentAsset
from modelchimp.models.machinelearning_model import MachineLearningModel


class ExperimentAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperimentAsset
        fields = ('meta_dict', 'asset', 'file_name', 'file_size')

    def create(self, validated_data):
        mid = self.context['request'].parser_context['kwargs']['model_id']
        model_obj = MachineLearningModel.objects.get(id=mid)

        instance = ExperimentAsset.objects.create(
         ml_model=model_obj,
         project=model_obj.project,
         **validated_data
        )

        return instance
