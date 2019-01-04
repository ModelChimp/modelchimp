from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import mixins

from modelchimp.serializers.user import UserSerializer
from modelchimp.models.user import User

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


class UserAPI(mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)

    def retrieve(self, *args, **kwargs):
        instance = self.get_queryset().get(id=self.request.user.id )
        serializer = self.serializer_class(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)
