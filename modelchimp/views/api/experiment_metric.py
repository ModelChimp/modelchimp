from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework import mixins

from modelchimp.models.experiment import Experiment

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentMetricAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = Experiment.objects.all()
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
            metric_max = 0
            metric_min = 0
            for i,m in enumerate(result['metric']['evaluation'][metric]):
                current_value = m['value']

                if i == 0:
                    metric_max = current_value
                    metric_min = current_value
                    continue

                if current_value > metric_max:
                    metric_max = current_value

                if current_value < metric_min:
                    metric_min = current_value

            metric_dict = dict()
            metric_dict['name'] = metric
            metric_dict['max'] = metric_max
            metric_dict['min'] = metric_min

            result['summary'].append(metric_dict)

        return Response(result, status=status.HTTP_200_OK)
