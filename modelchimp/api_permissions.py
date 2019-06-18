from rest_framework.permissions import BasePermission

from modelchimp.models.membership import Membership
from modelchimp.models.experiment import Experiment

class HasProjectMembership(BasePermission):
    def has_permission(self, request, view):
        arguments = view.get_renderer_context()['kwargs']
        project_id = arguments.get('project_id')
        model_id = arguments.get('model_id')
        result  = False

        if project_id:
            result = self._check_membership_with_pid(request, project_id)

        if model_id:
            result = self._check_membership_with_mid(request, model_id)

        return result

    def _check_membership_with_mid(self, request, mid):
        try:
            exp_obj = Experiment.objects.get(id=mid)
            Membership.objects.get(user=request.user, project=exp_obj.project.id)
        except (Membership.DoesNotExist, Experiment.DoesNotExist):
            return False

        return True

    def _check_membership_with_pid(self, request, pid):
        try:
            Membership.objects.get(user=request.user, project=pid)
        except Membership.DoesNotExist:
            return False

        return True
