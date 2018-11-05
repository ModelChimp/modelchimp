from django.shortcuts import redirect, render
from django.conf import settings
from django.core.exceptions import PermissionDenied
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.views import login

from modelchimp.models.project import Project
from modelchimp.models.membership import Membership
from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.views.render.base import BaseView


@method_decorator(login_required, name='dispatch')
class HomePageView(BaseView):
    template_name = "home.html"


class DocPageView(BaseView):
    template_name = "python_client_doc.html"


@method_decorator(login_required, name='dispatch')
class EvaluationDashboardView(BaseView):
    template_name = "model_evaluation_dashboard.html"

    def get_context_data(self, pk,  **kwargs):
        context = super(EvaluationDashboardView, self).get_context_data(**kwargs)
        project =  Project.objects.get(pk=pk)
        user = self.request.user

        # Check if the user has access to the project
        try:
            Membership.objects.get(user=user, project=project)
        except Membership.DoesNotExist:
            raise PermissionDenied("Oops, you don't have permission for this!")

        context['project'] = project

        return context


@method_decorator(login_required, name='dispatch')
class ModelListView(BaseView):
    template_name = "model_list.html"

    def get_context_data(self, **kwargs):
        context = super(ModelListView, self).get_context_data(**kwargs)
        project_id = self.kwargs['project_id']
        user = self.request.user
        project = Project.objects.get(pk = project_id)

        # Check if the user is the owner
        owner_flag = True if user == project.user else False

        # Check if the user has access to the project
        access = Membership.objects.filter(user=user, project=project).exists()
        if not access:
        	raise PermissionDenied("Oops, you don't have permission for this!")

        project_key = Membership.objects.get(user=user, project=project).key
        context['project'] = project
        context['project_key'] = project_key
        context['member_count'] = project.members.count()
        context['owner_flag'] = owner_flag

        return context


@method_decorator(login_required, name='dispatch')
class ModelDetailCodeView(BaseView):
    template_name = "model_detail_code.html"

    def get_context_data(self, pk,  **kwargs):
        context = super(ModelDetailCodeView, self).get_context_data(**kwargs)
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

        context['ml_model'] = ml_model_obj
        context['owner_flag'] = owner_flag

        try:
            context['code'] = str(ml_model_obj.code_file.read(), 'utf-8')
            context['jupyter_flag'] = False
        except ValueError:
            context['code'] = ''
            context['jupyter_flag'] = True

        # Take first 7 characters if the name is hash
        if ml_model_obj.name == ml_model_obj.experiment_id:
            context['experiment_name'] = ml_model_obj.name[:7]
        else:
            context['experiment_name'] = ml_model_obj.name

        return context


@method_decorator(login_required, name='dispatch')
class ModelDetailReportsView(BaseView):
    template_name = "model_detail_reports.html"

    def get_context_data(self, pk,  **kwargs):
        context = super(ModelDetailReportsView, self).get_context_data(**kwargs)
        ml_model_obj = MachineLearningModel.objects.get(pk=pk)
        project = ml_model_obj.project
        project_owner = ml_model_obj.project.user
        user = self.request.user

        # Check if the user has access to the project
        try:
            access = Membership.objects.get(user=user, project=project)
        except Membership.DoesNotExist:
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
        context['project_key'] = access.key
        context['experiment_id'] = ml_model_obj.experiment_id

        return context


class LandingPageView(BaseView):
    template_name = "landing_page.html"

    def get_context_data(self, **kwargs):
        context = super(LandingPageView, self).get_context_data(**kwargs)

        user = self.request.user
        if isinstance(user,AnonymousUser):
            context['logged_flag'] = False
        else:
            context['logged_flag'] = True

        return context


class PricingPageView(BaseView):
    template_name = "pricing.html"

    def get_context_data(self, **kwargs):
        context = super(PricingPageView, self).get_context_data(**kwargs)

        user = self.request.user
        if isinstance(user,AnonymousUser):
            context['logged_flag'] = False
        else:
            context['logged_flag'] = True

        return context
