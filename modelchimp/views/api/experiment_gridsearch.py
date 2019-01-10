from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import mixins

from modelchimp.models.machinelearning_model import MachineLearningModel

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentGridSearchAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = MachineLearningModel.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def retrieve(self, request, model_id,  *args, **kwargs):
        result = dict()
        result['data'] = list()
        result['columns'] = list()

        # Get the data from DB
        instance = self.get_queryset().get(id=model_id)
        data = instance.grid_search.get('data', None)

        # Return empty response for no data
        if not data:
            Response(status=status.HTTP_200_OK)

        # Remove params column
        if 'params' in data:
            data.pop('params', None)

        # Get the length of the long column and also create columns data
        result['columns'] = data.keys()
        row_size = 0
        for key in result['columns']:
            current_row_size = len(data[key])

            if current_row_size > row_size:
                row_size = current_row_size

        # Create the final data
        result['data'] = []
        for i in range(row_size):
            row = {'id': i}
            for key in result['columns']:
                row[key] = data[key][i]
            result['data'].append(row)

        return Response(result, status=status.HTTP_200_OK)
