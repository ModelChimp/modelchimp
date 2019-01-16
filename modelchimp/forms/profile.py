from django import forms
from modelchimp.models.user import User
from modelchimp.models.profile import Profile
from django.db import transaction
from django.template.defaultfilters import filesizeformat
from django.utils.translation import ugettext_lazy as _
from django.conf import settings


class ProfileForm(forms.ModelForm):
    first_name = forms.CharField()
    last_name = forms.CharField()
    avatar = forms.ImageField(required=False, widget=forms.FileInput)
    # email = forms.EmailField(disabled=True, required=False)

    class Meta:
        model = User
        fields = ('avatar', 'first_name', 'last_name')

    def save(self, commit=True):
        if commit:
            with transaction.atomic():
                profile = Profile.objects.get(user=self.request.user)
                profile.first_name = self.cleaned_data["first_name"]
                profile.last_name = self.cleaned_data["last_name"]

                try:
                    avatar = self.cleaned_data["avatar"]
                    profile.avatar = self.request.FILES['avatar']
                except Exception:
                    pass

                profile.save()

        return profile

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop("request")
        super(ProfileForm, self).__init__(*args, **kwargs)

    def clean_avatar(self):
        content = self.cleaned_data['avatar']
        if content is None:
            return content
        content_type = content.content_type.split('/')[0]
        if content_type in settings.CONTENT_TYPES:
            if content.size > settings.MAX_UPLOAD_SIZE:
                raise forms.ValidationError('Please keep filesize under %s. Current filesize %s' % (
                    filesizeformat(settings.MAX_UPLOAD_SIZE), filesizeformat(content._size)))
        else:
            raise forms.ValidationError('File type is not supported')
        return content
