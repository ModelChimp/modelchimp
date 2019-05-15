from uuid import uuid4
from django.db import models

from modelchimp.models.project import Project
from modelchimp.models.experiment import Experiment


class ExperimentMatPlot(models.Model):
    name = models.CharField(max_length=200, blank=True, default='', null=True)
    filesize = models.BigIntegerField(default=None, null=True)
    mat_plot_file = models.FileField(upload_to='mat_plot/', null=True)

    project = models.ForeignKey(Project,
                                on_delete=models.CASCADE,
                                related_name='mat_plot_project')
    ml_model = models.ForeignKey(Experiment,
                                    related_name='mat_plot_experiment',
                                    on_delete=models.CASCADE,)
    mat_plot_id = models.CharField(max_length=50, default=None)

    date_created = models.DateTimeField(auto_now_add=True, blank=False)
    date_modified = models.DateTimeField(auto_now=True, blank=False)

    def save(self, *args, **kwargs):
        if self.mat_plot_id is None:
        	self.mat_plot_id = uuid4()

        return super(ExperimentMatPlot, self).save(*args, **kwargs)
