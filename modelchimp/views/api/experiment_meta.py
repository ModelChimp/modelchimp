from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework import mixins

from modelchimp.models.experiment import Experiment
from modelchimp.serializers.experiment import ExperimentSerializer

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentMetaAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = Experiment.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)
    serializer_class = ExperimentSerializer

    def retrieve(self, request, model_id,  *args, **kwargs):
        instance = self.get_queryset().get(id=model_id)
        serialized = self.serializer_class(instance)

        return Response(serialized.data, status=status.HTTP_200_OK)
