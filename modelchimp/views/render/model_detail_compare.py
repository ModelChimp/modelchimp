from django.core.exceptions import PermissionDenied
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from modelchimp.enum import EvaluationMetric, PlatformLibraryType
from modelchimp.models.membership import Membership
from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.utils.data_utils import dict_to_kv
from modelchimp.views.render.base import BaseView
from modelchimp.views.render.model_detail_main import parse_epoch_data


@method_decorator(login_required, name='dispatch')
class ModelCompareView(BaseView):
    template_name = "model_compare.html"

    def get_context_data(self,m1,m2,  **kwargs):
        context = super(ModelCompareView, self).get_context_data(**kwargs)

        ml_model1_obj = MachineLearningModel.objects.get(pk=m1)
        ml_model2_obj = MachineLearningModel.objects.get(pk=m2)

        # Check both the ml models belong to the same project
        if ml_model1_obj.project != ml_model2_obj.project:
            raise PermissionDenied("You seem to be doing something fishy!")

        # Check the user has access to the project
        project = ml_model1_obj.project
        user = self.request.user
        access = Membership.objects.filter(user=user, project=project).exists()
        if not access:
            raise PermissionDenied("Oops, you don't have permission for this project")

        if isinstance(ml_model1_obj.model_parameters, dict):
            ml_model1_obj.model_parameters = dict_to_kv(ml_model1_obj.model_parameters)

        if isinstance(ml_model1_obj.evaluation_parameters, dict):
            ml_model1_obj.evaluation_parameters = parse_epoch_data(ml_model1_obj.evaluation_parameters)
            ml_model1_obj.evaluation_parameters = dict_to_kv(ml_model1_obj.evaluation_parameters)

        if isinstance(ml_model2_obj.model_parameters, dict):
            ml_model2_obj.model_parameters = dict_to_kv(ml_model2_obj.model_parameters)
        print(ml_model2_obj.evaluation_parameters)
        if isinstance(ml_model2_obj.evaluation_parameters, dict):
            ml_model2_obj.evaluation_parameters = parse_epoch_data(ml_model2_obj.evaluation_parameters)
            ml_model2_obj.evaluation_parameters = dict_to_kv(ml_model2_obj.evaluation_parameters)

        # Assign the enum name to the key
        if ml_model1_obj.evaluation_parameters is not None:
            for eval in ml_model1_obj.evaluation_parameters:
                for metric in EvaluationMetric.CHOICES:
                    if metric[0] == eval['key']:
                        eval['display_key'] = metric[1]

                    try:
                        eval['display_key']
                    except KeyError:
                        eval['display_key'] = None

        # Assign the enum name to the key
        if ml_model2_obj.evaluation_parameters is not None:
            for eval in ml_model2_obj.evaluation_parameters:
                for metric in EvaluationMetric.CHOICES:
                    if metric[0] == eval['key']:
                        eval['display_key'] = metric[1]

                    try:
                        eval['display_key']
                    except KeyError:
                        eval['display_key'] = None

        # Keep deep learning field if its keras
        if ml_model1_obj.platform_library != PlatformLibraryType.KERAS:
            del(ml_model1_obj.deep_learning_parameters)
            context['deep_learning_flag1'] = False
        else:
            context['deep_learning_flag1'] = True

        if ml_model2_obj.platform_library != PlatformLibraryType.KERAS:
            del(ml_model2_obj.deep_learning_parameters)
            context['deep_learning_flag2'] = False
        else:
            context['deep_learning_flag2'] = True

        # Take first 20 characters if the name is hash
        if ml_model1_obj.name == ml_model1_obj.experiment_id:
            context['experiment_name1'] = ml_model1_obj.name[:7]
        else:
            context['experiment_name1'] = ml_model1_obj.name

        if ml_model2_obj.name == ml_model2_obj.experiment_id:
            context['experiment_name2'] = ml_model2_obj.name[:7]
        else:
            context['experiment_name2'] = ml_model2_obj.name

        context['ml_model1'] = ml_model1_obj
        context['ml_model2'] = ml_model2_obj

        return context
