from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import mixins

from modelchimp.models.machinelearning_model import MachineLearningModel

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentParamAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = MachineLearningModel.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def retrieve(self, request, model_id,  *args, **kwargs):
        instance = self.get_queryset().get(id=model_id)
        return Response(instance.model_parameters, status=status.HTTP_200_OK)
