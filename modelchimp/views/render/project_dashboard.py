from django.core.exceptions import PermissionDenied
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from modelchimp.models.project import Project
from modelchimp.models.membership import Membership
from modelchimp.views.render.base import BaseView


@method_decorator(login_required, name='dispatch')
class ProjectDashboardExperimentView(BaseView):
    template_name = "project_dashboard_experiment.html"

    def get_context_data(self, project_id,  **kwargs):
        context = super(ProjectDashboardExperimentView, self).get_context_data(**kwargs)
        project =  Project.objects.get(id=project_id)
        user = self.request.user

        # Check if the user has access to the project
        try:
            Membership.objects.get(user=user, project=project)
        except Membership.DoesNotExist:
            raise PermissionDenied("Oops, you don't have permission for this!")

        context['project'] = project
        return context


@method_decorator(login_required, name='dispatch')
class ProjectDashboardParameterView(BaseView):
    template_name = "project_dashboard_parameter.html"

    def get_context_data(self, project_id,  **kwargs):
        context = super(ProjectDashboardParameterView, self).get_context_data(**kwargs)
        project =  Project.objects.get(id=project_id)
        user = self.request.user

        # Check if the user has access to the project
        try:
            Membership.objects.get(user=user, project=project)
        except Membership.DoesNotExist:
            raise PermissionDenied("Oops, you don't have permission for this!")

        context['project'] = project
        return context
