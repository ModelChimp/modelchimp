from django.core.management.base import BaseCommand
from django.contrib.sites.models import Site
from decouple import config


class Command(BaseCommand):
    help = 'Set the domain'

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
