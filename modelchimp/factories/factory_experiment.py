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

    model_parameters = parameters_data
    evaluation_parameters = metrics_data
    epoch_durations = duration_data
    grid_search = grid_search_data

    user = factory.SubFactory(UserFactory)
    project = factory.SubFactory(ProjectFactory)

    class Meta:
        model = Experiment
