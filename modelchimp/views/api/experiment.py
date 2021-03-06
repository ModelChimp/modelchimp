import logging

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from modelchimp.models.experiment import Experiment
from modelchimp.serializers.experiment import ExperimentSerializer
from modelchimp.api_permissions import HasProjectMembership

logger = logging.getLogger(__name__)


class ListExperimentAPI(generics.ListAPIView):
	serializer_class = ExperimentSerializer
	queryset = Experiment.objects.select_related('user__profile').all()
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
			metric_fields = params.getlist('metric_fields[]')
		except Exception:
		   	logger.info("There are no query parameters")

		# Serialize the data
		serializer = ExperimentSerializer(queryset,
												many=True,
												context={
												'param_fields':param_fields,
												'metric_fields':metric_fields,
												})
		if st is None:
			st = status.HTTP_200_OK

		return Response(serializer.data, status=st)


class DeleteExperimentAPI(generics.DestroyAPIView):
	permission_classes = (IsAuthenticated, HasProjectMembership)

	def delete(self, request, project_id):
		model_id = self.request.data.get('model_id')
		model_ids = self.request.data.get('model_ids')

		if model_id:
			delete_list = [model_id]
		elif model_ids:
			delete_list = model_ids.split(',')
		else:
			raise ValueError('Experiment ids to delete are not present')

		for elem in delete_list:
			obj = Experiment.objects.get(pk=elem)
			obj.delete()

		return Response({}, status=status.HTTP_204_NO_CONTENT)


class CreateExperimentAPI(generics.CreateAPIView):
	serializer_class = ExperimentSerializer
	queryset = Experiment.objects.all()
	permission_classes = (IsAuthenticated, HasProjectMembership)

	def create(self, request, *args, **kwargs):
		data = request.data.copy()
		data['user'] = self.request.user.id
		experiment_id = self.request.data.get('experiment_id')

		# If the experiment already exists then don't create the experiment
		try:
			exp_obj = Experiment.objects.get(experiment_id = experiment_id)
			return Response({ 'model_id': exp_obj.id }, status=status.HTTP_200_OK)
		except Experiment.DoesNotExist:
			logger.info("Experiment already exists")

		serializer = self.get_serializer(data=data)
		serializer.is_valid()
		exp_obj = serializer.save()

		return Response({ 'model_id': exp_obj.id
							,'experiment_id' : exp_obj.experiment_id
		 				}, status=status.HTTP_201_CREATED)
