from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.serializers.experiment_label import ExperimentLabelSerializer

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentLabelAPI(generics.ListCreateAPIView):
    serializer_class = ExperimentLabelSerializer
    queryset = MachineLearningModel.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def create(self, request, model_id, *args, **kwargs):
        ml_obj = MachineLearningModel.objects.get(id=model_id)
        label = request.data.get('label')
        # Preprocess the label field
        label = label.strip()

        if not isinstance(ml_obj.labels, list):
            ml_obj.labels = [label]
        else :
            ml_obj.labels += [label]

        ml_obj.save()

        return Response(ml_obj.labels, status=status.HTTP_201_CREATED)

    def delete(self, request, model_id, *args, **kwargs):
        ml_obj = MachineLearningModel.objects.get(id=model_id)
        label = request.query_params.get('label')
        label = label.strip()

        if label in ml_obj.labels:
            ml_obj.labels.remove(label)
            ml_obj.save()

        return Response(ml_obj.labels, status=status.HTTP_200_OK)

    def list(self, request, model_id, *args, **kwargs):
        ml_obj = MachineLearningModel.objects.get(id=model_id)

        serializer = ExperimentLabelSerializer(ml_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
