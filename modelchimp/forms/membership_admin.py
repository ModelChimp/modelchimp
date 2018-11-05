from django import forms
from django.contrib import admin
from modelchimp.models.membership import Membership


class MembershipForm(forms.ModelForm):
    class Meta:
        model = Membership
        exclude = []

    def save(self, commit=True):
        membership = super(MembershipForm, self).save(commit=False)
        return membership

class MembershipAdmin(admin.ModelAdmin):
    exclude = ['key']
    form = MembershipForm
