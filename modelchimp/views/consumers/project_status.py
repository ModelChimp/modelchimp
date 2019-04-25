import json

from django.core import serializers

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from modelchimp.models.membership import Membership
from modelchimp.models.machinelearning_model import MachineLearningModel


class ProjectStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = None
        self.project_key = self.scope['url_route']['kwargs']['project_key']
        membership_object = await self.get_membership_object(self.project_key)
        self.project = membership_object.project
        self.user = membership_object.user

        if membership_object is None:
            self.close()
            return

        self.group_name = 'project_%s' % membership_object.project.id

        # Join group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()
        await self.send(text_data=json.dumps({
            'message': 'Accepted'
        }))

    async def disconnect(self, close_code):
        # Leave room group
        if self.group_name:
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )

    # Receive message from WebSocket
    async def receive(self, text_data):
        #text_data_json = json.loads(text_data)
        pass

    # Receive message from room group
    async def project_message_send(self, event):
        experiment_data = await self.get_project_experiment_status(self.project.id)

        # Send message to WebSocket
        experiment_data = serializers.serialize("json",experiment_data)

        await self.send(text_data=experiment_data)

    @database_sync_to_async
    def get_membership_object(self, key):
        try:
            result = Membership.objects.get(key=key)
            return result
        except Membership.DoesNotExist:
            pass

        return None

    @database_sync_to_async
    def get_project_experiment_status(self, project_id):
        try:
            result = MachineLearningModel.objects.filter(project=project_id)
            return result
        except Membership.DoesNotExist:
            pass

        return None
