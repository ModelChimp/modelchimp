from rest_framework import generics

from modelchimp.serializers.experiment_asset import ExperimentAssetSerializer
from modelchimp.models.experiment_asset import ExperimentAsset
from modelchimp.utils.data_utils import execute_query

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


class ExperimentAssetAPI(generics.ListCreateAPIView):
    serializer_class = ExperimentAssetSerializer
    queryset = ExperimentAsset.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def filter_queryset(self, queryset):
        mid = self.kwargs.get('model_id')
        return queryset.filter(ml_model=mid)


@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def get_asset_meta_fields(request, model_id):
	'''
    List the meta fields of assets in an experiment
	'''

	query = '''
	select distinct json_object_keys(meta_dict::json) as name
	from modelchimp_experimentasset me
	where json_typeof(meta_dict::json) = 'object'
	and me.ml_model_id = %s
	'''

	query = query % (
	    model_id,
	)
	result = execute_query(query)

	return Response(result)

@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def get_asset_blob(request, model_id, asset_id):
    '''
    Get the blob of the asset
    '''

    asset_obj = ExperimentAsset.objects.get(id=asset_id)
    return Response({'asset_blob': asset_obj.asset.read()})
