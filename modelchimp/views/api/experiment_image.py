from django.db.models import Q
from django.db.models.expressions import RawSQL

from rest_framework import generics, status
from rest_framework.response import Response

from modelchimp.models.experiment_image import ExperimentImage
from modelchimp.models.membership import Membership
from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.utils.data_utils import execute_query
from modelchimp.serializers.experiment_image import ExperimentImageSerializer

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ExperimentImageCreateAPI(generics.CreateAPIView):
    serializer_class = ExperimentImageSerializer
    queryset = ExperimentImage.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def create(self, request, project_id,  *args, **kwargs):
        project_id = request.data.get('project')
        user = self.request.user

        serializer = self.get_serializer(data=self.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class ExperimentImageFilterAPI(generics.GenericAPIView):
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def get(self, request, model_id, *args, **kwargs):
        ml_obj = MachineLearningModel.objects.get(id=model_id)
        user = self.request.user

        metric_query = f'''
        select distinct json_object_keys(metric_dict::json) as metric
        from modelchimp_experimentimage mei
        where json_typeof(metric_dict::json) = 'object'
        and ml_model_id = {model_id}
        '''

        epoch_query = f'''
        select distinct epoch
        from modelchimp_experimentimage mei
        where epoch is not null
        and ml_model_id = {model_id}
        '''

        metric_result = execute_query(metric_query)
        epoch_result = execute_query(epoch_query)

        return Response({
                'metric_filter': metric_result,
                'epoch_filter': epoch_result
                }, status=status.HTTP_200_OK)


class ExperimentImageListAPI(generics.GenericAPIView):
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def get(self, request, model_id, *args, **kwargs):
        ml_obj = MachineLearningModel.objects.get(id=model_id)
        user = self.request.user

        params = request.query_params
        draw = params.get('draw')
        start = int(params.get('start'))
        length = int(params.get('length'))
        search = params.get('search[value]')
        column_2 = params.get('columns[2][name]')
        column_3 = params.get('columns[3][name]')
        ordered_column = params.get('order[0][column]')
        ordered_column_dir = params.get('order[0][dir]')
        epoch = params.get('epoch')

        data = self.get_queryset(column_2, column_3)
        records_total = data.count()

        # Filter the query
        data = self.filter_queryset(data, search, ordered_column, ordered_column_dir)
        if epoch:
            data = data.filter(epoch=epoch)
        records_filtered = data.count()

        # Pagination
        data = data[start: start + length]

        # Serialize the data
        serializer = ExperimentImageSerializer(data,
                                                many=True,
                                                metric_list=[column_2, column_3])
        result = {
            'draw' : draw,
            'recordsTotal' : records_total,
            'recordsFiltered' : records_filtered,
            'data': serializer.data
        }

        return Response(result, status=status.HTTP_200_OK)


    def get_queryset(self, metric_0, metric_1):
        queryset = ExperimentImage.objects.filter(ml_model=self.kwargs['model_id'])
        queryset = queryset.annotate(metric_0=RawSQL("CAST(metric_dict->>%s AS DECIMAL)", (metric_0,)))
        queryset = queryset.annotate(metric_1=RawSQL("CAST(metric_dict->>%s AS DECIMAL)", (metric_1,)))
        queryset = queryset.annotate(name=RawSQL('''
            CASE WHEN custom_file_name = '' THEN experiment_image
			ELSE custom_file_name
            END
            ''',()))

        return queryset

    def filter_queryset(self, queryset, search_value, ordered_column, ordered_column_dir):
        ordered_dict = {
            '0' : 'name',
            '2' : 'metric_0',
            '3' : 'metric_1'
        }
        asc_dict = {
            'asc' : '',
            'desc' : '-'
        }
        order_value = "%s%s" % (asc_dict[ordered_column_dir],
                                ordered_dict[ordered_column])
        q_filter = Q(name__contains = search_value) | \
                   Q(metric_0__contains = search_value) | \
                   Q(metric_1__contains = search_value)

        result = queryset.filter(q_filter)
        result = result.order_by(order_value)

        return result
