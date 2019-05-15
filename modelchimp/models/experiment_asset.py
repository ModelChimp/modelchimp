import ntpath
from django.db import models
from django.contrib.postgres.fields import JSONField

from modelchimp.models.project import Project
from modelchimp.models.experiment import Experiment


class ExperimentAsset(models.Model):
    meta_dict = JSONField(null=True)
    asset = models.FileField(upload_to='asset/', null=True)
    custom_file_name = models.CharField(max_length=200, blank=True, default='', null=True)

    project = models.ForeignKey(Project,
                                on_delete=models.CASCADE,
                                related_name='asset_project')
    ml_model = models.ForeignKey(Experiment,
                                    related_name='asset_experiment',
                                    on_delete=models.CASCADE)

    date_created = models.DateTimeField(auto_now_add=True, blank=False)
    date_modified = models.DateTimeField(auto_now=True, blank=False)

    @property
    def file_name(self):
        if self.custom_file_name: return self.custom_file_name

        file_name = ntpath.basename(self.asset.name)
        return file_name

    @property
    def file_size(self):
        if self.asset: return self.asset.size

        return 0
