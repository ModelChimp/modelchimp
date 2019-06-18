from rest_framework import serializers
from modelchimp.models.experiment import Experiment
from django.utils import timezone

class ExperimentSerializer(serializers.ModelSerializer):
    date_created_epoch = serializers.SerializerMethodField('to_epoch_date')
    comment_count = serializers.SerializerMethodField()
    submitted_by = serializers.SerializerMethodField()
    project_name = serializers.SerializerMethodField()
    param_fields = serializers.SerializerMethodField()
    metric_fields = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()

    class Meta:
        model = Experiment
        fields = '__all__'
        extra_kwargs = {
            'features': {'write_only': True},
            'parameters': {'write_only': True},
            'metrics': {'write_only': True},
            'durations': {'write_only': True},
            'deep_learning_parameters': {'write_only': True},
            'ml_model_file': {'write_only': True},
        }

    def to_epoch_date(self,obj):
        return int(obj.date_created.strftime("%s"))

    def get_comment_count(self, obj):
        return obj.comment_count

    def get_submitted_by(self, obj):
        return obj.user.profile.first_name + ' ' + obj.user.profile.last_name

    def get_project_name(self, obj):
        return obj.project.name

    def get_param_fields(self, obj):
        param_list = self.context.get("param_fields", [])
        result = dict()
        if not isinstance(obj.parameters, dict):
            return result

        for param in param_list:
            param_value = obj.parameters.get(param, None)
            if param_value:
                result[param] = param_value

        return result

    def get_metric_fields(self, obj):
        metric_list = self.context.get("metric_fields", [])
        result = dict()

        if not isinstance(obj.metrics, dict) or len(metric_list) == 0:
            return result

        for metric in metric_list:
            metric_name = metric.split("$")[0]
            max_flag = metric.split("$")[1]

            if metric_name not in obj.metrics['metric_list']:
                continue

            # Get the max and min value
            max = 0
            min = 0
            for i,m in enumerate(obj.metrics['evaluation'][metric_name]):
                current_value = m['value']

                if i == 0:
                    max = current_value
                    min = current_value
                    continue

                if current_value > max:
                    max = current_value

                if current_value < min:
                    min = current_value

            if max_flag == '1':
                result[metric] = max
            else:
                result[metric] = min

        return result

    def get_duration(self, obj):
        if obj.experiment_end and obj.experiment_start:
            return obj.experiment_end - obj.experiment_start

        if not obj.experiment_end and obj.experiment_start:
            return timezone.now() - obj.experiment_start

        return None
