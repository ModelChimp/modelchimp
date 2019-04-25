from django.apps import AppConfig

class ModelChimpConfig(AppConfig):
    name = 'modelchimp'
    verbose_name = 'ModelChimp'

    def ready(self):
        import modelchimp.signals
