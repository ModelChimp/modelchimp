from django.db import models

from modelchimp.models.project import Project
from modelchimp.models.user import User


class Invitation(models.Model):
	from_user = models.ForeignKey(User, on_delete=models.CASCADE)
	to_email =  models.EmailField()

	project = models.ForeignKey(Project, on_delete=models.CASCADE,)
	invite_clicked = models.BooleanField(default=False)

	date_created = models.DateTimeField(auto_now_add=True, blank=False)
	date_modified = models.DateTimeField(auto_now=True, blank=False)


	def __str__(self):
		return "%s" % (self.to_email,)
