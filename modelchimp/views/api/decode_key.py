from settings import settings

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from modelchimp.models.membership import Membership


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def decode_key(request):
    key = request.data.get('key')

    membership_object = Membership.objects.get(key=key)
    project_id = membership_object.project.id
    token = Token.objects.get(user=membership_object.user).key

    return Response({"project_id": project_id,
                    "token": token,
                    },
                    status=status.HTTP_200_OK)
