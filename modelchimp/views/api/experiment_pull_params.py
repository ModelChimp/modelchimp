from rest_framework import generics, mixins, status
from rest_framework.response import Response

from modelchimp.models.membership import Membership
from modelchimp.models.experiment import Experiment
from modelchimp.serializers.experiment_params import ExperimentParamsSerializer
from modelchimp.utils.data_utils import dict2native


class ExperimentPullParamAPI(mixins.RetrieveModelMixin, generics.GenericAPIView):
    serializer_class = ExperimentParamsSerializer
    queryset = Experiment.objects.all()

    def retrieve(self):
        try:
            # Get the filter parameters from the request
            params = self.request.query_params
            experiment_id = None

            # Check if the experiment id exists
            if 'experiment-id' in params:
                experiment_id = params['experiment-id']
                ml_obj = Experiment.objects.get(experiment_id = experiment_id)
            else:
                raise Exception("experiment-id required")
        except Exception as e:
            return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

        try:
            Membership.objects.get(user=self.request.user, project= ml_obj.project)
        except Membership.DoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)

        ml_obj.model_parameters = dict2native(ml_obj.model_parameters)
        serializer = self.serializer_class(ml_obj)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        return self.retrieve(*args, **kwargs)
