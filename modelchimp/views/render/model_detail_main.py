from django.conf import settings
from django.core.exceptions import PermissionDenied
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from modelchimp.enum import EvaluationMetric, PlatformLibraryType
from modelchimp.models.membership import Membership
from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.views.render.base import BaseView

from modelchimp.utils.data_utils import dict_to_kv


@method_decorator(login_required, name='dispatch')
class ModelDetailView(BaseView):
    template_name = "model_detail.html"

    def get_context_data(self, pk,  **kwargs):
        context = super(ModelDetailView, self).get_context_data(**kwargs)
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


        # Keep deep learning field if its keras
        if ml_model_obj.platform_library != PlatformLibraryType.KERAS:
            del(ml_model_obj.deep_learning_parameters)
            context['deep_learning_flag'] = False
        else:
            context['deep_learning_flag'] = True

        if isinstance(ml_model_obj.model_parameters, dict):
            ml_model_obj.model_parameters = dict_to_kv(ml_model_obj.model_parameters)

        if isinstance(ml_model_obj.evaluation_parameters, dict):
            ml_model_obj.evaluation_parameters = parse_epoch_data(ml_model_obj.evaluation_parameters)
            ml_model_obj.evaluation_parameters = dict_to_kv(ml_model_obj.evaluation_parameters)

        # Assign the enum name to the key
        if ml_model_obj.evaluation_parameters is not None:
            for eval in ml_model_obj.evaluation_parameters:
                for metric in EvaluationMetric.CHOICES:
                    if metric[0] == eval['key']:
                        eval['display_key'] = metric[1]

                    try:
                        eval['display_key']
                    except KeyError:
                        eval['display_key'] = None

        # Take first 7 characters if the name is hash
        if ml_model_obj.name == ml_model_obj.experiment_id:
            context['experiment_name'] = ml_model_obj.name[:7]
        else:
            context['experiment_name'] = ml_model_obj.name

        context['ml_model'] = ml_model_obj
        context['owner_flag'] = owner_flag

        return context

def parse_epoch_data(data):
    metric_list = data['metric_list']
    evaluation_data = data['evaluation']
    result = {}

    for metric in metric_list:
        max_value = 0
        min_value = 0

        for i, evaluation in  enumerate(evaluation_data[metric]):
            if i == 0:
                max_value = evaluation['value']
                min_value = evaluation['value']

            if evaluation['value'] > max_value:
                max_value = evaluation['value']

            if evaluation['value'] < min_value:
                min_value = evaluation['value']

        max_metric_name = "%s (max)" % metric
        min_metric_name = "%s (min)" % metric

        result[max_metric_name] = max_value
        result[min_metric_name] = min_value

    return result
