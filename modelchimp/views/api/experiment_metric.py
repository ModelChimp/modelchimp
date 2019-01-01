from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import mixins

from modelchimp.models.machinelearning_model import MachineLearningModel

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentMetricAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = MachineLearningModel.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def retrieve(self, request, model_id,  *args, **kwargs):
        result = []
        instance = self.get_queryset().get(id=model_id)

        for metric in instance.evaluation_parameters['metric_list']:
            # Get the max and min value
            max = 0
            min = 0
            for i,m in enumerate(instance.evaluation_parameters['evaluation'][metric]):
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

            result.append(metric_dict)


        return Response(result, status=status.HTTP_200_OK)
