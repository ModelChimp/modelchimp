import factory

from modelchimp.models.profile import Profile
from modelchimp.factories.factory_user import UserFactory


class ProfileFactory(factory.DjangoModelFactory):
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")

    user = factory.SubFactory(UserFactory)

    class Meta:
        model = Profile
