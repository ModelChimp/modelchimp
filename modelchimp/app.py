from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class ModelChimpConfig(AppConfig):
    name = 'modelchimp'
    verbose_name = 'ModelChimp'

    def ready(self):
        import modelchimp.signals
