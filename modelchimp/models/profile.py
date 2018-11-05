import os

from urllib import request

from django.db import models
from django.core.files import File

from modelchimp.models.user import User



class Profile(models.Model):
    user   = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(null=True, upload_to='profile/')
    avatar_url = models.URLField(null=True)
    first_name = models.CharField(max_length=200, blank=True, default='')
    last_name = models.CharField(max_length=200, blank=True, default='')

    def __str__(self):
	    return "%s - %s" % (self.first_name, self.last_name)

    def get_remote_image(self):
        if self.avatar_url:
            try:
                result = request.urlretrieve(self.avatar_url)
                self.avatar.save(
                        os.path.basename(self.avatar_url),
                        File(open(result[0], 'rb'))
                        )
                self.save()
            except Exception:
                pass
