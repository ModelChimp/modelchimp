import json

from settings import settings
from datetime import datetime

from django.utils import timezone
from django.contrib.auth.models import AnonymousUser

from channels.db import database_sync_to_async
from channels.auth import login
from channels.generic.websocket import AsyncWebsocketConsumer

from modelchimp.models.membership import Membership
from modelchimp.models.experiment import Experiment
from modelchimp.enum import ClientEvent, ExperimentStatus


class TrackerConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        #self.experiment_id = self.scope['url_route']['kwargs']['experiment_id']
        self.project = ''

        await self.accept()
        await self.send(text_data=json.dumps({
            'type': 'ACCEPTED',
            'message': 'Accepted'
        }))

    async def disconnect(self, close_code):
        pass

    # Receive message from WebSocket
    async def receive(self, text_data):
        data_json = json.loads(text_data)
        message = data_json['message']
        self.user = self.scope['user']
        self.experiment_id = message.get('experiment_id', None)

        if not self.experiment_id:
            return None

        if isinstance(self.user, AnonymousUser):
            key = message['key']
            membership_object = await self.get_user_project_details(key)
            if membership_object:
                await login(self.scope, membership_object.user, settings.AUTHENTICATION_BACKENDS[0])
                self.project = membership_object.project
                self.user = membership_object.user
            else:
                return

        #Add to the experiment
        self.experiment_obj = await self.register_experiment(self.experiment_id)

        if message['type'] == ClientEvent.MODEL_PARAM:
            await self.add_parameters(message['value'])
        elif message['type'] == ClientEvent.EVAL_PARAM:
            await self.add_metrics(message['value'], message['epoch'])
            await self.channel_layer.group_send('experiment_' + str(self.experiment_obj.id),
                                {"type": "send_new_metric_notification"}
            )
        elif message['type'] == ClientEvent.DURATION_PARAM:
            await self.add_epoch_duration(message['value'], message['epoch'])
            await self.channel_layer.group_send('experiment_' + str(self.experiment_obj.id),
                                {"type": "send_new_duration_notification"}
            )
        elif message['type'] == ClientEvent.EXPERIMENT_START:
            await self.add_experiment_start(message['value'])
        elif message['type'] == ClientEvent.EXPERIMENT_COMPLETED:
            await self.add_experiment_complete_status(message['value'])
        elif message['type'] == ClientEvent.HEART_BEAT:
            print('got heart beat')
            await self.update_heart_beat()
        elif message['type'] == ClientEvent.DATASET_ID:
            await self.add_dataset_id(message['value'])
        elif message['type'] == ClientEvent.GRID_SEARCH:
            await self.add_grid_search(message['value'])

    @database_sync_to_async
    def get_user_project_details(self, key):
        try:
            result = Membership.objects.get(key=key)
            return result
        except Membership.DoesNotExist:
            pass

        return None

    @database_sync_to_async
    def register_experiment(self, experiment_id):
        '''
        Check if the experiment already exists and if not then add the experiment to
        the project
        '''
        try:
            experiment = Experiment.objects.get(experiment_id=experiment_id)
        except Experiment.DoesNotExist:
            experiment = Experiment.objects.create(experiment_id=experiment_id,
                project = self.project,
                user = self.user,
                name = experiment_id,
                status = ExperimentStatus.IN_PROCESS
             )

        return experiment

    @database_sync_to_async
    def add_parameters(self, value):
        '''
        Add the model parameter event to the experiment in the db
        '''
        if( isinstance(self.experiment_obj.parameters, dict)):
            self.experiment_obj.parameters = {**self.experiment_obj.parameters,
            **value}
        else:
            self.experiment_obj.parameters = value


        self.experiment_obj.save()

    @database_sync_to_async
    def add_metrics(self, value, epoch=None):
        '''
        Add the evaluation parameters event to the experiment in the db
        '''

        if not isinstance(self.experiment_obj.metrics, dict):
            self.experiment_obj.metrics = {
                'evaluation' : {},
                'metric_list' : []
            }

        metric_keys = value.keys()
        existing_metric_list = self.experiment_obj.metrics['metric_list']
        metric_data = self.experiment_obj.metrics['evaluation']

        for metric in metric_keys:
            if metric in existing_metric_list:

                # Remove the existing epoch if present
                for i,d in enumerate(metric_data[metric]):
                    if d['epoch'] == epoch:
                        metric_data[metric].pop(i)
                        break

                metric_data[metric] += [{
                    'epoch': epoch,
                    'value': value[metric]
                }]
            else:
                existing_metric_list.append(metric)
                metric_data[metric] = [{
                    'epoch': epoch,
                    'value': value[metric]
                }]

        self.experiment_obj.save()

    @database_sync_to_async
    def add_epoch_duration(self, value, epoch=None):
        '''
        Add durations at every epoch to the db
        '''

        if not isinstance(self.experiment_obj.durations, dict):
            self.experiment_obj.durations = {
                'duration' : {},
                'tag_list' : []
            }

        duration_keys = value.keys()
        existing_tag_list = self.experiment_obj.durations['tag_list']

        for duration in duration_keys:
            if duration not in existing_tag_list:
                existing_tag_list.append(duration)
                self.experiment_obj.durations['duration'][duration] = [{
                    'epoch': epoch,
                    'value': value[duration]
                }]
            else:
                self.experiment_obj.durations['duration'][duration] += [{
                    'epoch': epoch,
                    'value': value[duration]
                }]

        self.experiment_obj.save()

    @database_sync_to_async
    def add_experiment_start(self, value):
        '''
        Add the start datetime of experiment
        '''
        dt = datetime.strptime(value, "%Y-%m-%d %H:%M:%S.%f")
        self.experiment_obj.experiment_start = dt
        self.experiment_obj.save()

    @database_sync_to_async
    def add_experiment_complete_status(self, value):
        dt = datetime.strptime(value, "%Y-%m-%d %H:%M:%S.%f")
        self.experiment_obj.experiment_end = dt
        self.experiment_obj.status = ExperimentStatus.COMPLETED
        self.experiment_obj.save()

    @database_sync_to_async
    def update_heart_beat(self):
        self.experiment_obj.last_heart_beat = timezone.now()
        self.experiment_obj.save()

    @database_sync_to_async
    def add_dataset_id(self, value):
        '''
        Add the dataset id of the experiment
        '''
        self.experiment_obj.dataset_id = value
        self.experiment_obj.parameters['dataset_id'] = value
        self.experiment_obj.save()

    @database_sync_to_async
    def add_grid_search(self, value):
        '''
        Add the grid search result
        '''

        self.experiment_obj.grid_search = value
        self.experiment_obj.save()
