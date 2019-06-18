import factory

from modelchimp.models.experiment import Project
from modelchimp.factories.factory_user import UserFactory


class ProjectFactory(factory.DjangoModelFactory):
    name = factory.Faker("word")
    description = factory.Faker("sentence")

    user = factory.SubFactory(UserFactory)

    class Meta:
        model = Project
