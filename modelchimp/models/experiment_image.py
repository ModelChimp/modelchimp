from django.db import models
from django.contrib.postgres.fields import JSONField

from modelchimp.models.project import Project
from modelchimp.models.experiment import Experiment


class ExperimentImage(models.Model):
    metric_dict = JSONField(null=True)
    epoch = models.IntegerField(default=None, null=True)
    experiment_image = models.FileField(upload_to='experiment_image/', null=True)
    custom_file_name = models.CharField(max_length=200, blank=True, default='', null=True)

    project = models.ForeignKey(Project,
                                on_delete=models.CASCADE,
                                related_name='image_project')
    ml_model = models.ForeignKey(Experiment,
                                    related_name='image_experiment',
                                    on_delete=models.CASCADE,)

    date_created = models.DateTimeField(auto_now_add=True, blank=False)
    date_modified = models.DateTimeField(auto_now=True, blank=False)
