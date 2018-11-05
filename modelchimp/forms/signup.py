from django import forms
from django.contrib.auth.forms import UserCreationForm
from modelchimp.models.user import User
from modelchimp.models.profile import Profile
from django.db import transaction

class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text='Required')
    first_name = forms.CharField(required=True)
    last_name = forms.CharField()

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password1', 'password2')

    def save(self, commit=True):
        user = super(SignupForm, self).save(commit=False)

        if commit:
	        with transaction.atomic():
	            user.save()
	            profile = Profile.objects.create(first_name=self.cleaned_data["first_name"],
		        	last_name=self.cleaned_data["last_name"],
		        	user=user
		        	)
	            profile.save()

        return user
