from rest_framework import serializers
from modelchimp.models.machinelearning_model import MachineLearningModel


class ExperimentLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineLearningModel
        fields = ('labels', )
