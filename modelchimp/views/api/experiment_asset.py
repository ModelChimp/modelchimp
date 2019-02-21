from rest_framework import generics

from modelchimp.serializers.experiment_asset import ExperimentAssetSerializer
from modelchimp.models.experiment_asset import ExperimentAsset

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentAssetAPI(generics.ListCreateAPIView):
    serializer_class = ExperimentAssetSerializer
    queryset = ExperimentAsset.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def perform_create(self, serializer):
        model_id = self.kwargs['model_id']
        instance = serializer.save()
