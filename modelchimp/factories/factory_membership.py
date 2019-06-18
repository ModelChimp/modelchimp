import factory

from modelchimp.models.membership import Membership
from modelchimp.factories.factory_user import UserFactory
from modelchimp.factories.factory_project import ProjectFactory


class MembershipFactory(factory.DjangoModelFactory):
    project = factory.SubFactory(ProjectFactory)
    user = factory.SubFactory(UserFactory)

    is_owner = True

    class Meta:
        model = Membership
