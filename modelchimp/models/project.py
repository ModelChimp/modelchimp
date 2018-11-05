from django.db import models
from django.template.defaultfilters import slugify

from modelchimp.models.user import User

class Project(models.Model):
	name =  models.CharField(max_length=200, blank=True, default='')
	description = models.TextField(null=True, blank=True)

	slug = models.SlugField(default='')

	members = models.ManyToManyField(
        User,
        through='Membership',
        through_fields=('project', 'user'),
        related_name="members"
    )

	user = models.ForeignKey(User, on_delete=models.CASCADE)
	date_created = models.DateTimeField(auto_now_add=True, blank=False)
	date_modified = models.DateTimeField(auto_now=True, blank=False)

	def __str__(self):
	    return "%s" % (self.name,)

	def save(self, *args, **kwargs):
	    self.slug = slugify(self.name)
	    super().save(*args, **kwargs)
