from rest_framework import serializers
from modelchimp.models.experiment import Experiment


class ExperimentParamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiment
        fields = ('parameters', )
