from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework import mixins

from modelchimp.models.experiment import Experiment

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentCodeAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = Experiment.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def retrieve(self, request, model_id,  *args, **kwargs):
        instance = self.get_queryset().get(id=model_id)
        result = dict()

        if instance.code_file:
            result['code'] =  str(instance.code_file.read(), 'utf-8')
            result['ipython_flag'] =  False
        else:
            result['code'] =  ''
            result['ipython_flag'] =  True

        return Response(result, status=status.HTTP_200_OK)
