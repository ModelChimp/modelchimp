from django import forms
from django.contrib import admin
from modelchimp.models.user import User
from django.db import transaction
from modelchimp.models.profile import Profile

class UserForm(forms.ModelForm):
    first_name = forms.CharField()
    last_name = forms.CharField()

    class Meta:
        model = User
        exclude = ['name']

    def save(self, commit=True):
        user = super(UserForm, self).save(commit=False)
        user.set_password(user.password)

        if not user.id:
            with transaction.atomic():
                user.save()
                profile = Profile.objects.create(first_name=self.cleaned_data["first_name"],
    	        	last_name=self.cleaned_data["last_name"],
    	        	user=user
    	        	)
                profile.save()
        else:
            user.profile.first_name = self.cleaned_data["first_name"]
            user.profile.last_name = self.cleaned_data["last_name"]
            user.save()
            user.profile.save()
        return user


class UserAdmin(admin.ModelAdmin):
    exclude = ['groups','user_permissions','last_login','username']
    form = UserForm
