from django.conf import settings
from django.core.exceptions import PermissionDenied
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from modelchimp.views.render.base import BaseView
from modelchimp.models.membership import Membership
from modelchimp.models.machinelearning_model import MachineLearningModel


@method_decorator(login_required, name='dispatch')
class ModelDetailCustomObjectsView(BaseView):
    template_name = "model_detail_custom_objects.html"

    def get_context_data(self, pk,  **kwargs):
        context = super(ModelDetailCustomObjectsView, self).get_context_data(**kwargs)
        ml_model_obj = MachineLearningModel.objects.get(pk=pk)
        project = ml_model_obj.project
        project_owner = ml_model_obj.project.user
        user = self.request.user

        # Check if the user has access to the project
        access = Membership.objects.filter(user=user, project=project).exists()
        if not access:
            raise PermissionDenied("Oops, you don't have permission for this!")

        # Set an owner flag based on project_owner or model owner
        owner_flag = True if user == ml_model_obj.user or user == project_owner  else False

        # Take first 7 characters if the name is hash
        if ml_model_obj.name == ml_model_obj.experiment_id:
            context['experiment_name'] = ml_model_obj.name[:7]
        else:
            context['experiment_name'] = ml_model_obj.name

        context['ml_model'] = ml_model_obj
        context['owner_flag'] = owner_flag

        return context
