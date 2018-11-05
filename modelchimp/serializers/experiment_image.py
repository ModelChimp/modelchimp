from rest_framework import serializers
from modelchimp.models.experiment_image import ExperimentImage


class ExperimentImageSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    metric_0 = serializers.SerializerMethodField(read_only=True)
    metric_1 = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ExperimentImage
        fields = '__all__'

    def get_name(self, obj):

        if obj.custom_file_name:
            return obj.custom_file_name

        # Remove the folder name from the name
        name = obj.experiment_image.name
        name = name.replace("experiment_image/","")

        return name;

    def get_metric_0(self,obj):
        metric = self.metric_list[0]
        if not metric:
            return None

        result = obj.metric_dict[metric]

        return result

    def get_metric_1(self,obj):
        metric = self.metric_list[1]
        if not metric:
            return None

        result = obj.metric_dict[metric]

        return result

    def __init__(self, *args, **kwargs):
            self.metric_list = kwargs.pop('metric_list', [None, None])
            super(ExperimentImageSerializer, self).__init__(*args, **kwargs)
