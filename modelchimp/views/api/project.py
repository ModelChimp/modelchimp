from uuid import uuid4

from rest_framework import generics, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from modelchimp.models.project import Project
from modelchimp.serializers.project import ProjectSerializer
from modelchimp.api_permissions import HasProjectMembership
from modelchimp.models.membership import Membership
from modelchimp.utils.data_utils import execute_query


class ProjectAPI(generics.ListCreateAPIView, mixins.UpdateModelMixin):
	serializer_class = ProjectSerializer
	queryset = Project.objects.all()

	def list(self, request, project_id=None, st=None):
		if project_id:
			queryset = self.get_queryset().filter(membership__user=self.request.user, id=project_id)
		else:
			queryset = self.get_queryset().filter(membership__user=self.request.user).order_by('-date_created')

		serializer = self.get_serializer(queryset, many=True, context={'user_id': self.request.user.id})
		if st is None:
			st = status.HTTP_200_OK

		return Response(serializer.data, status=st)

	def create(self, request, *args, **kwargs):
		data = request.data.copy()
		data['user_object'] = self.request.user
		data['project_id'] = str(uuid4())
		serializer = self.get_serializer(data = data)
		serializer.is_valid(raise_exception = True)

		serializer.save(user_id = self.request.user.id)

		return self.list(request, st=status.HTTP_201_CREATED)

	def delete(self, request, project_id, format=None):
		pid = project_id
		user = request.user

		project_obj = Project.objects.get(pk=pid)

		# Does the user own the project
		if project_obj.user == user:
			project_obj.delete()
		else:
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		return Response(status=status.HTTP_204_NO_CONTENT)

	def update(self, request, project_id, *args, **kwargs):
		instance = self.get_queryset().get(id=project_id )
		serializer = self.get_serializer(instance, data=self.request.data, partial=True)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_200_OK)

	def put(self, request, *args, **kwargs):
	    return self.update(request, *args, **kwargs)


@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def param_metric_meta(request, project_id):
	'''
	List of model parameters as columns to be shown on customize menu
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
	from modelchimp_experiment ml
	where json_typeof(model_parameters::json) = 'object'
	and project_id = %s
	'''

	query = query % (
	    project_id,
	)
	result['parameter'] = execute_query(query)

	query = '''
	select distinct value as name
	from modelchimp_experiment ml,
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
		result['metric'].append({'name': f"{metric['name']}$0"})
		result['metric'].append({'name': f"{metric['name']}$1"})

	return Response(result, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def param_metric_data(request, project_id):
	'''
	Send the data of the model parameters to be displayed in the table
	'''
	try:
	    param_fields = request.data.getlist('param_fields[]')
	except Exception as e:
	    return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

	query = '''
	select distinct id,key,value
	from modelchimp_experiment ml, json_each_text(model_parameters::json)
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
