from django import forms
from django.contrib import admin
from modelchimp.models.project import Project
from modelchimp.models.membership import Membership
from django.db import transaction


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        exclude = []

    def save(self, commit=True):
        project = super(ProjectForm, self).save(commit=False)

        if not project.id:
            with transaction.atomic():
                project.save()
                membership = Membership.objects.create(user=self.cleaned_data["user"],
    	        	project=project,
                    is_owner=True
    	        	)
                membership.save()
        else:
            membership = Membership.objects.get(is_owner=True,
	        	project=project)
            membership.user = self.cleaned_data["user"]
            membership.save()
            
        return project

class ProjectAdmin(admin.ModelAdmin):
    exclude = ['slug']
    form = ProjectForm
