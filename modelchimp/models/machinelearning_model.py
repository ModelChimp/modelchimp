from django.db import models
from django.contrib.postgres.fields import JSONField

from modelchimp.enum import PlatformType
from modelchimp.enum import PlatformLibraryType, ExperimentStatus
from modelchimp.models.user import User
from modelchimp.models.project import Project
from modelchimp.utils.generate_uid import generate_uid
from marshmallow import Schema, fields

class MachineLearningModel(models.Model):
    '''
    Experiments table that store the experiments conducted in each project.

    - JSON Fields -
    model_parameters: dict
    evaluation_parameters: # 0.1 version
         evaluation:
            <metric_name>:
                - epoch: int
                  value: float
                - ...
         metric_list:
            - metric_name 1
            - metric_name 2
    epoch_durations:
         duration:
            <tag_name>:
                - epoch: int
                  value: float
                - ...
         tag_list:
            - tag_name 1
            - tag_name 2
    grid_search: dict
    '''

    # New structure to store metrics in the future
    # --------------------------------------------
    # metric_data:
    #      data:
    #         <>:
    #             - epoch: int
    #               value: float
    #               metric_name:
    #               step: int   # 0.2 onwards
    #               index: int  # 0.2 onwards
    #               time: epoch # 0.2 onwards
    #             - ...
    #      metric_list:
    #         - metric_name 1
    #         - metric_name 2
    #      time_list: # 0.2 onwards
    #         - epoch
    #         - step
    #         - time

    name = models.CharField(max_length=200, blank=True, default='', null=True)
    algorithm = models.CharField(max_length=200, blank=True, default='', null=True)
    platform = models.CharField(max_length=200,
								blank=True, default='',
								choices=PlatformType.CHOICES,
                                null=True)
    platform_library = models.CharField(max_length=5,
										blank=True,
										default='',
										choices=PlatformLibraryType.CHOICES,
                                        null=True)
    experiment_id = models.CharField(max_length=70, unique=True, default=generate_uid)
    dataset_id = models.CharField(max_length=100, default='', null=True)
    status = models.CharField(max_length=5,
										blank=True,
										default=ExperimentStatus.COMPLETED,
										choices=ExperimentStatus.CHOICES,
                                        null=True)
    comment_count = models.IntegerField(default=0)
    labels = JSONField(null=True)

    features = JSONField(null=True)
    model_parameters = JSONField(null=True, default=dict) # Simple dict
    evaluation_parameters = JSONField(null=True)
    epoch_durations = JSONField(null=True)
    grid_search = JSONField(null=True)

    ml_model_file = models.FileField(upload_to='model/', null=True)
    code_file = models.FileField(upload_to='code/', null=True)

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='ml_model_project')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    experiment_start = models.DateTimeField(null=True)
    experiment_end = models.DateTimeField(null=True)

    date_created = models.DateTimeField(auto_now_add=True, blank=False)
    date_modified = models.DateTimeField(auto_now=True, blank=False)
    last_heart_beat = models.DateTimeField(auto_now=True)

    @property
    def short_name(self):
        if self.name == self.experiment_id:
            return self.name[:7]

        return self.name

    def __str__(self):
        return "%s" % (self.name,)


class MetricSchema(Schema):
    pass
