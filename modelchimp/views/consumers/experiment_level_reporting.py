import json
import asyncio

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from modelchimp.enum import ClientEvent, ServerEvent
from modelchimp.models.membership import Membership
from modelchimp.models.experiment import Experiment
from modelchimp.utils.data_utils import execute_query


class ExperimentLevelReportingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = None
        self.project_key = self.scope['url_route']['kwargs']['project_key']
        membership_object = await self.get_membership_object(self.project_key)
        self.project = membership_object.project
        self.user = membership_object.user
        self.experiment_obj = await self.get_experiment(self.scope['url_route']['kwargs']['experiment_id'])

        if membership_object is None:
            self.close()
            return

        self.group_name = 'experiment_%s' % self.experiment_obj.id

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
        message = json.loads(text_data)

        if message['type'] == ClientEvent.GET_EXPERIMENT_METRIC_FILTER:
            await self.channel_layer.group_send('experiment_' + str(self.experiment_obj.id),
                                {"type": "send_experiment_level_metric_filters"})
        elif message['type'] == ClientEvent.GET_EXPERIMENT_METRIC_DATA:
            await self.channel_layer.group_send('experiment_' + str(self.experiment_obj.id),
                                {"type": "send_experiment_level_metric_report", "value": message['value']})
        elif message['type'] == ClientEvent.GET_EXPERIMENT_DURATION_FILTER:
            await self.channel_layer.group_send('experiment_' + str(self.experiment_obj.id),
                                {"type": "send_experiment_level_duration_filters"})
        elif message['type'] == ClientEvent.GET_EXPERIMENT_DURATION_DATA:
            await self.channel_layer.group_send('experiment_' + str(self.experiment_obj.id),
                                {"type": "send_experiment_level_duration_report", "value": message['value']})

    async def send_experiment_level_metric_report(self, event):
        asyncio.sleep(1)
        experiment_data = await self.get_experiment_level_metric_data(self.experiment_obj.id, event['value'])

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': ServerEvent.DATA_EXPERIMENT_LEVEL_METRIC,
            'message': experiment_data,
            'metric' : event['value']
        }))

    # Send metric list for filters
    async def send_experiment_level_metric_filters(self, event):
        asyncio.sleep(1)
        self.experiment_obj.refresh_from_db()

        if (not self.experiment_obj.metrics
            or isinstance(self.experiment_obj.metrics, list)):
            await self.send(text_data=json.dumps({
                'type': ServerEvent.NO_FILTER_EXPERIMENT_LEVEL_METRIC,
            }))
            return

        if 'metric_list' in self.experiment_obj.metrics.keys():
            result = self.experiment_obj.metrics['metric_list']
        else:
            await self.send(text_data=json.dumps({
                'type': ServerEvent.NO_FILTER_EXPERIMENT_LEVEL_METRIC,
            }))
            return

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': ServerEvent.FILTER_EXPERIMENT_LEVEL_METRIC,
            'message': result
        }))

    async def send_experiment_level_duration_report(self, event):
        asyncio.sleep(1)
        experiment_data = await self.get_experiment_level_duration_data(self.experiment_obj.id, event['value'])

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': ServerEvent.DATA_EXPERIMENT_LEVEL_DURATION,
            'message': experiment_data,
            'tag' : event['value']
        }))

    # Send metric list for filters
    async def send_experiment_level_duration_filters(self, event):
        asyncio.sleep(1)
        self.experiment_obj.refresh_from_db()
        if not self.experiment_obj.durations:
            await self.send(text_data=json.dumps({
                'type': ServerEvent.NO_FILTER_EXPERIMENT_LEVEL_DURATION,
            }))
            return

        result = self.experiment_obj.durations['tag_list']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': ServerEvent.FILTER_EXPERIMENT_LEVEL_DURATION,
            'message': result
        }))

    # Send notification to client that new metric has been added
    async def send_new_metric_notification(self, event):
        asyncio.sleep(1)
        await self.send(text_data=json.dumps({
            'type': ServerEvent.NOTIFICATION_NEW_METRIC,
        }))

    # Send notification to client that new duration has been added
    async def send_new_duration_notification(self, event):
        asyncio.sleep(1)
        await self.send(text_data=json.dumps({
            'type': ServerEvent.NOTIFICATION_NEW_DURATION,
        }))

    @database_sync_to_async
    def get_membership_object(self, key):
        try:
            result = Membership.objects.get(key=key)
            return result
        except Membership.DoesNotExist:
            pass

        return None

    @database_sync_to_async
    def get_experiment(self, id):
        try:
            result = Experiment.objects.get(experiment_id=id)
            return result
        except Experiment.DoesNotExist:
            pass

        return None

    @database_sync_to_async
    def get_experiment_level_metric_data(self, project_id, metric_name):
        metric_query = '''
            select value ->> 'epoch' as epoch,
            		value ->> 'value' as value
            from modelchimp_experiment ml,
            json_array_elements(ml.metrics::json -> 'evaluation' -> '%s')
            where id = %s
    	'''

        metric_query = metric_query % (metric_name,
                                        project_id )
        result = execute_query(metric_query)

        return result

    @database_sync_to_async
    def get_experiment_level_duration_data(self, project_id, tag):
        duration_query = '''
            select value ->> 'epoch' as epoch,
            		value ->> 'value' as value
            from modelchimp_experiment ml,
            json_array_elements(ml.durations::json -> 'duration' -> '%s')
            where id = %s
    	'''

        duration_query = duration_query % (
                                        tag,
                                        project_id )
        result = execute_query(duration_query)

        return result
