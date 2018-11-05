import re

from rest_framework import generics, mixins, status
from rest_framework.response import Response

from modelchimp.models.experiment_mat_plot import ExperimentMatPlot
from modelchimp.models.membership import Membership
from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.serializers.experiment_mat_plot import ExperimentMatPlotSerializer

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentMatPlotAPI(mixins.CreateModelMixin, mixins.RetrieveModelMixin, generics.GenericAPIView):
    serializer_class = ExperimentMatPlotSerializer
    queryset = ExperimentMatPlot.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def create(self, request, project_id, *args, **kwargs):
        project_id = request.data.get('project_id')
        user = self.request.user

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
              print(serializer.save())
              return Response(status=status.HTTP_201_CREATED)

        print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, project_id, *args, **kwargs):
        return self.create(request, project_id, *args, **kwargs)

    def get(self, request, project_id, *args, **kwargs):
        return self.retrieve(project_id, *args, **kwargs)

    def _is_uuid4_pattern(self, text):
        pattern =  re.compile(
            (
                '[a-f0-9]{8}-' +
                '[a-f0-9]{4}-' +
                '4' + '[a-f0-9]{3}-' +
                '[89ab][a-f0-9]{3}-' +
                '[a-f0-9]{12}$'
            ),
            re.IGNORECASE
        )

        return pattern.match(text)


class ExperimentMatPlotDetailAPI(mixins.RetrieveModelMixin, generics.ListAPIView):
    serializer_class = ExperimentMatPlotSerializer
    queryset = ExperimentMatPlot.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def list(self, request,model_id):
        try:
            ml_model_obj = MachineLearningModel.objects.get(id=model_id)
        except Exception as e:
            return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.get_queryset().filter(ml_model_id=model_id)

        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
