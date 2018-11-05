import re

from django.http import HttpResponse

from rest_framework import status
from rest_framework import generics, mixins, views
from rest_framework.response import Response

from modelchimp.serializers.experiment_custom_object import ExperimentCustomObjectSerializer
from modelchimp.models.experiment_custom_object import ExperimentCustomObject
from modelchimp.models.membership import Membership
from modelchimp.models.machinelearning_model import MachineLearningModel

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentCustomObjectAPI(mixins.RetrieveModelMixin,
                                mixins.CreateModelMixin,
                                generics.GenericAPIView):
    serializer_class = ExperimentCustomObjectSerializer
    queryset = ExperimentCustomObject.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def retrieve(self, project_id):
        try:
            # Get the filter parameters from the request
            params = self.request.query_params
            custom_object_id = None

            # Check if the duration exists
            if 'custom-object-id' in params:
                custom_object_id = params['custom-object-id']
                if not self._is_uuid4_pattern(custom_object_id):
                    raise TypeError('custom_object_id is of wrong type')

        except Exception as e:
            return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

        custom_object_instance = self.get_queryset().get(custom_object_id=custom_object_id)

        custom_object_pointer = custom_object_instance.custom_object_file
        response = HttpResponse(custom_object_pointer,content_type='application/gzip')
        response['Content-Disposition'] = 'attachment; filename=NameOfFile'

        return response

    def create(self, request, project_id):
        project_id = request.data.get('project_id')
        user = self.request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

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


class ExperimentCustomObjectDetailAPI(mixins.RetrieveModelMixin, generics.ListAPIView):
    serializer_class = ExperimentCustomObjectSerializer
    queryset = ExperimentCustomObject.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def list(self, request, model_id):
        try:
            ml_model_obj = MachineLearningModel.objects.get(id=model_id)
        except Exception as e:
            return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

        access = Membership.objects.filter(user=self.request.user, project=ml_model_obj.project).exists()
        if not access:
            return Response(status=status.HTTP_403_FORBIDDEN)

        queryset = self.get_queryset().filter(ml_model_id=model_id)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
