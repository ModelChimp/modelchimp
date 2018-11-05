from uuid import uuid4
from django.db import models

from modelchimp.models.user import User
from modelchimp.models.project import Project


class Membership(models.Model):
	project = models.ForeignKey(Project, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)

	is_owner = models.BooleanField(default=False)
	key = models.CharField(max_length=50, default=None)

	date_created = models.DateTimeField(auto_now_add=True, blank=False)
	date_modified = models.DateTimeField(auto_now=True, blank=False)

	def __str__(self):
		return "%s - %s" % (self.user.email, self.project.name,)

	class Meta:
		unique_together = ('project', 'user',)

	def save(self, *args, **kwargs):
		if self.key is None:
			self.key = uuid4()

		return super(Membership, self).save(*args, **kwargs)
