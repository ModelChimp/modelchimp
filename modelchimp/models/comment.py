from django.db import models

from modelchimp.models.experiment import Experiment
from modelchimp.models.project import Project
from modelchimp.models.user import User


class Comment(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE,)
	ml_model = models.ForeignKey(Experiment, related_name='comment_ml_model', on_delete=models.CASCADE,)
	project = models.ForeignKey(Project,
								on_delete=models.CASCADE,)

	comment = models.TextField(null=True, blank=True)

	date_created = models.DateTimeField(auto_now_add=True, blank=False)
	date_modified = models.DateTimeField(auto_now=True, blank=False)


	def __str__(self):
	    return "%s - %s" % (self.user.profile.first_name, self.ml_model.name)
