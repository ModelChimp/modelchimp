import re

from rest_framework import generics, status
from rest_framework.response import Response

from modelchimp.models.experiment_mat_plot import ExperimentMatPlot
from modelchimp.serializers.experiment_mat_plot import ExperimentMatPlotSerializer

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentMatPlotAPI(generics.ListCreateAPIView):
    serializer_class = ExperimentMatPlotSerializer
    queryset = ExperimentMatPlot.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def create(self, request, project_id, *args, **kwargs):
        project_id = request.data.get('project_id')

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
              serializer.save()
              return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, project_id, *args, **kwargs):
        return self.create(request, project_id, *args, **kwargs)

    def filter_queryset(self, queryset):
        mid = self.kwargs.get('model_id')
        return queryset.filter(ml_model=mid)

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
