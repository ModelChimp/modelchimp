import factory

from modelchimp.models.experiment_mat_plot import ExperimentMatPlot
from modelchimp.factories.factory_project import ProjectFactory
from modelchimp.factories.factory_experiment import ExperimentFactory


class ExperimentMatPlotFactory(factory.DjangoModelFactory):
    name = factory.Faker("first_name")
    mat_plot_file = factory.django.FileField(filename='modelchimp/tests/matplot.png')

    ml_model = factory.SubFactory(ExperimentFactory)
    project = factory.SubFactory(ProjectFactory)

    class Meta:
        model = ExperimentMatPlot
