from uuid import uuid4

from rest_framework import generics, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view

from modelchimp.models.project import Project
from modelchimp.models.membership import Membership
from modelchimp.serializers.project import ProjectSerializer


class ProjectAPI(generics.ListCreateAPIView, mixins.UpdateModelMixin):
	serializer_class = ProjectSerializer
	queryset = Project.objects.all()

	def list(self, request, project_id=None, st=None):
		if project_id:
			queryset = self.get_queryset().filter(membership__user=self.request.user, id=project_id)
		else:
			queryset = self.get_queryset().filter(membership__user=self.request.user).order_by('-date_created')

		serializer = ProjectSerializer(queryset, many=True, context={'user_id': self.request.user.id})
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
		headers = self.get_success_headers(serializer.data)

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
		print(self.request.data)
		instance = self.get_queryset().get(id=project_id )
		serializer = self.get_serializer(instance, data=self.request.data, partial=True)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_200_OK)

	def put(self, request, *args, **kwargs):
	    return self.update(request, *args, **kwargs)
