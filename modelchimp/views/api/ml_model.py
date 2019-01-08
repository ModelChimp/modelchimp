from django.conf import settings
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.models.membership import Membership
from modelchimp.serializers.machinelearning_model import MachineLearningModelSerializer
from modelchimp.utils.data_utils import execute_query

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class MLModelAPI(generics.ListAPIView):
	serializer_class = MachineLearningModelSerializer
	queryset = MachineLearningModel.objects.select_related('user__profile').all()
	permission_classes = (IsAuthenticated, HasProjectMembership)

	def list(self, request,model_id=None, project_id=None, st=None):
		if model_id:
			queryset = self.get_queryset().filter(id=model_id, project=project_id).order_by("-date_created")
		else:
			queryset = self.get_queryset().filter(project=project_id).order_by("-date_created")

		# Get optional fields
		try:
			params = self.request.query_params
			param_fields = params.getlist('param_fields[]')
		except Exception as e:
		   	pass

		# Serialize the data
		serializer = MachineLearningModelSerializer(queryset, many=True, context={'param_fields':param_fields})
		if st is None:
			st = status.HTTP_200_OK

		return Response(serializer.data, status=st)

	def delete(self, request, project_id):
		mid = request.data.get('model_id')
		user = request.user
		ml_model_obj = MachineLearningModel.objects.get(pk=mid)

		# Set an owner flag based on project_owner or model owner
		owner_flag = True if user == ml_model_obj.user or user == ml_model_obj.project.user else False
		if not owner_flag:
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		ml_model_obj.delete()

		return Response(status=status.HTTP_204_NO_CONTENT)


class CreateExperimentAPI(generics.CreateAPIView):
	serializer_class = MachineLearningModelSerializer
	queryset = MachineLearningModel.objects.all()
	permission_classes = (IsAuthenticated, HasProjectMembership)

	def create(self, request, *args, **kwargs):
		data = request.data.copy()
		data['user'] = self.request.user.id
		experiment_id = self.request.data.get('experiment_id')

		# If the experiment already exists then don't create the experiment
		try:
			 exp_obj = MachineLearningModel.objects.get(experiment_id = experiment_id)
			 return Response({ 'model_id': exp_obj.id }, status=status.HTTP_200_OK)
		except MachineLearningModel.DoesNotExist:
			pass

		serializer = self.get_serializer(data=data)
		serializer.is_valid()
		exp_obj = serializer.save()
		headers = self.get_success_headers(serializer.data)

		return Response({ 'model_id': exp_obj.id }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def get_param_fields(request, project_id):
	'''
	List of model parameters as columnas to be shown on customize menu
	'''

	try:
	    project_id = int(project_id)
	except Exception as e:
	    return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

	# Check the user has permission for the project
	try:
	    Membership.objects.get(user=request.user, project=project_id)
	except Membership.DoesNotExist:
	    return Response(status=status.HTTP_403_FORBIDDEN)

	result = dict()
	query = '''
	select distinct json_object_keys(model_parameters::json) as name
	from modelchimp_machinelearningmodel ml
	where json_typeof(model_parameters::json) = 'object'
	and project_id = %s
	'''

	query = query % (
	    project_id,
	)
	result['parameter'] = execute_query(query)

	query = '''
	select distinct value as name
	from modelchimp_machinelearningmodel ml,
	jsonb_array_elements(ml.evaluation_parameters::jsonb -> 'metric_list')
	where project_id = %s
	order by name
	'''

	query = query % (
	    project_id,
	)
	result_metric = execute_query(query)

	result['metric'] = []
	for metric in result_metric:
		result['metric'].append({'name': f"{metric['name']}#0"})
		result['metric'].append({'name': f"{metric['name']}#1"})

	return Response(result, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def send_selected_param_data(request, project_id):
	'''
	Send the data of the model parameters to be displayed in the table
	'''
	try:
	    param_fields = request.data.getlist('param_fields[]')
	except Exception as e:
	    return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

	query = '''
	select distinct id,key,value
	from modelchimp_machinelearningmodel ml, json_each_text(model_parameters::json)
	where json_typeof(model_parameters::json) = 'object'
	and project_id = %s
	and key in (%s)
	'''
	query = query % (
	    project_id,
		",".join([ "'" + param + "'" for param in param_fields])
	)
	result_raw = execute_query(query)

	return Response(result_raw, status=status.HTTP_200_OK)
