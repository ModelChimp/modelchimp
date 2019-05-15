from uuid import uuid4

from django.db import models

from modelchimp.models.project import Project
from modelchimp.models.experiment import Experiment


class ExperimentCustomObject(models.Model):
    name = models.CharField(max_length=200, blank=True, default='', null=True)
    filesize = models.BigIntegerField(default=None, null=True)
    custom_object_file = models.FileField(upload_to='custom_object/', null=True)

    project = models.ForeignKey(Project,
                                on_delete=models.CASCADE,
                                related_name='custom_object_project')
    ml_model = models.ForeignKey(Experiment,
                                    related_name='custom_object_experiment',
                                    on_delete=models.CASCADE,)
    custom_object_id = models.CharField(max_length=50, default=None)

    date_created = models.DateTimeField(auto_now_add=True, blank=False)
    date_modified = models.DateTimeField(auto_now=True, blank=False)

    def save(self, *args, **kwargs):
        if self.custom_object_id is None:
        	self.custom_object_id = uuid4()

        return super(ExperimentCustomObject, self).save(*args, **kwargs)
