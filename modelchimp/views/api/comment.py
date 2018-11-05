from django.http import Http404

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from modelchimp.serializers.comment import CommentSerializer
from modelchimp.models.comment import Comment
from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.models.membership import Membership
from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class CommentAPI(generics.ListCreateAPIView):
	serializer_class = CommentSerializer
	queryset = Comment.objects.all()
	permission_classes = (IsAuthenticated, HasProjectMembership)

	def list(self, request, model_id, st=None):
		ml_model_obj = MachineLearningModel.objects.get(pk=model_id)
		project_id = ml_model_obj.project.id
		user_id = request.user.id

		queryset = self.get_queryset().filter(ml_model=ml_model_obj)
		serializer = CommentSerializer(queryset, many=True)

		if st is None:
			st = status.HTTP_200_OK

		return Response(serializer.data, status=st)

	def create(self, request, model_id, *args, **kwargs):
		data = request.data.copy()
		data['user'] = self.request.user.id

		ml_model_obj = MachineLearningModel.objects.get(pk=model_id)
		data['ml_model'] = model_id
		data['project'] = ml_model_obj.project.id

		serializer = self.get_serializer(data=data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		headers = self.get_success_headers(serializer.data)

		return self.list(request, model_id, status.HTTP_201_CREATED)
