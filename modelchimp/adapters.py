from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class ModelchimpSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_user(self, request, sociallogin, data):
        print(data)
