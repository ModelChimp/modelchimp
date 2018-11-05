from django.conf import settings
from django.contrib import admin
from django.contrib.sites.models import Site
from django.contrib.auth.models import Group

from .models.project  import Project
from .models.membership import Membership
from .models.machinelearning_model import MachineLearningModel
from .models.comment import Comment
from .models.profile import Profile
from .models.user import User
from .models.invitation import Invitation
from modelchimp.forms.user_admin import UserAdmin
from modelchimp.forms.project_admin import ProjectAdmin
from modelchimp.forms.membership_admin import MembershipAdmin
from modelchimp.models.experiment_custom_object import ExperimentCustomObject
from modelchimp.models.experiment_image import ExperimentImage

from allauth.socialaccount.models import SocialApp, SocialAccount, SocialToken
from allauth.account.models import EmailAddress

from rest_framework.authtoken.models import Token


if settings.ENTERPRISE_FLAG:
    admin.site.unregister(Group)
    admin.site.unregister(Site)
    admin.site.unregister(SocialApp)
    admin.site.unregister(SocialAccount)
    admin.site.unregister(SocialToken)
    admin.site.unregister(Token)
    admin.site.unregister(EmailAddress)
else:
    admin.site.register(MachineLearningModel)
    admin.site.register(Comment)
    admin.site.register(Invitation)
    admin.site.register(ExperimentCustomObject)
    admin.site.register(ExperimentImage)

admin.site.register(User, UserAdmin)
admin.site.register(Membership, MembershipAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Profile)
