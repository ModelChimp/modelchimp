from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import mixins

from modelchimp.models.machinelearning_model import MachineLearningModel

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated

from django.forms.models import model_to_dict

class ExperimentMetricAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = MachineLearningModel.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def retrieve(self, request, model_id,  *args, **kwargs):
        instance= self.get_queryset().get(id=model_id)

        result = dict()
        result['summary'] = []
        result['metric'] = instance.evaluation_parameters
        result['duration'] = instance.epoch_durations

        if not result['metric']:
            return Response(result, status=status.HTTP_200_OK)

        for metric in result['metric']['metric_list']:
            # Get the max and min value
            max = 0
            min = 0
            for i,m in enumerate(result['metric']['evaluation'][metric]):
                current_value = m['value']

                if i == 0:
                    max = current_value
                    min = current_value
                    continue

                if current_value > max:
                    max = current_value

                if current_value < min:
                    min = current_value

            metric_dict = dict()
            metric_dict['name'] = metric
            metric_dict['max'] = max
            metric_dict['min'] = min

            result['summary'].append(metric_dict)

        return Response(result, status=status.HTTP_200_OK)
