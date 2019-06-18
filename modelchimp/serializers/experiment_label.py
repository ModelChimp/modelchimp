from rest_framework import serializers
from modelchimp.models.experiment import Experiment


class ExperimentLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiment
        fields = ('labels', )
