from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import mixins
from django.http import HttpResponse

from modelchimp.serializers.project_key import ProjectKeySerializer
from modelchimp.models.membership import Membership

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class ProjectKeyAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    serializer_class = ProjectKeySerializer
    queryset = Membership.objects.all()
    permission_classes = (IsAuthenticated, HasProjectMembership)

    def retrieve(self, request, project_id,  *args, **kwargs):
        user_id = request.user.id

        instance = self.get_queryset().get(project=project_id, user=request.user.id )
        serializer = self.serializer_class(instance)

        # if serializer.is_valid():
            #return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     print(serializer.errors)
