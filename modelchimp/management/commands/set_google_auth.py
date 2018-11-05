from django.core.management.base import BaseCommand
from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.providers.google.provider import GoogleProvider
from decouple import config

class Command(BaseCommand):
    help = 'Set the Google OAuth Credentials'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        try:
            site_object = Site.objects.get(id=1)
            site_object.domain=config('DOMAIN')
            site_object.name = config('DOMAIN')
            site_object.save()
        except Site.DoesNotExist:
            site_object = Site.objects.create(id=1,
                                domain=config('DOMAIN'),
                                name=config('DOMAIN'))

        try:
            social_app_obj = SocialApp.objects.get(id=1)
            social_app_obj.name = "Google - ModelChimp"
            social_app_obj.provider=GoogleProvider.id
            social_app_obj.client_id=config('GOOGLE_OAUTH_CLIENT_ID')
            social_app_obj.secret=config('GOOGLE_OAUTH_SECRET_KEY')
            social_app_obj.sites.set([site_object])
        except SocialApp.DoesNotExist:
            social_app_obj = SocialApp.objects.create(id=1,
                                name="Google - ModelChimp",
                                provider=GoogleProvider.id,
                                client_id=config('GOOGLE_OAUTH_CLIENT_ID'),
                                secret=config('GOOGLE_OAUTH_SECRET_KEY'),
                                )
            social_app_obj.sites.set([site_object])

        social_app_obj.save()
