from django.contrib import admin
from .models.experiment import Experiment
from .models.comment import Comment
from .models.profile import Profile
from .models.invitation import Invitation
from .models.user import User
from modelchimp.models.experiment_custom_object import ExperimentCustomObject
from modelchimp.models.experiment_image import ExperimentImage


admin.site.register(Experiment)
admin.site.register(Comment)
admin.site.register(Invitation)
admin.site.register(ExperimentCustomObject)
admin.site.register(ExperimentImage)
admin.site.register(Profile)
admin.site.register(User)
