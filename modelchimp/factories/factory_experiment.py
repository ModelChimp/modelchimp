import factory

from modelchimp.models.experiment import Experiment
from modelchimp.factories.factory_user import UserFactory
from modelchimp.factories.factory_project import ProjectFactory
from modelchimp.enum import ExperimentStatus

from .experiment_data import (parameters_data
                                ,metrics_data
                                ,duration_data
                                ,grid_search_data)


class ExperimentFactory(factory.DjangoModelFactory):
    name = factory.Faker("first_name")
    status = ExperimentStatus.COMPLETED
    labels = factory.Faker("words", nb=3, unique=True)

    parameters = parameters_data
    metrics = metrics_data
    durations = duration_data
    grid_search = grid_search_data

    code_file = factory.django.FileField(filename='modelchimp/tests/sample_code.py')

    user = factory.SubFactory(UserFactory)
    project = factory.SubFactory(ProjectFactory)

    class Meta:
        model = Experiment
