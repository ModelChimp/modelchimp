from rest_framework import serializers
from modelchimp.models.experiment_mat_plot import ExperimentMatPlot


class ExperimentMatPlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperimentMatPlot
        fields = '__all__'
