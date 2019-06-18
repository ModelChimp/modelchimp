from faker import Faker
from django.test import TestCase
from rest_framework.test import APIClient

from modelchimp.factories.factory_user import UserFactory
from modelchimp.factories.factory_profile import ProfileFactory
from modelchimp.factories.factory_project import ProjectFactory
from modelchimp.factories.factory_membership import MembershipFactory
from modelchimp.factories.factory_experiment import ExperimentFactory

fake = Faker()

class BaseTest(TestCase):
    uname = fake.email()
    password = fake.password()

    def setUp(self):
        self._data_setup()
        self.client = APIClient()
        self.login = self.client.login(username=self.uname, password=self.password)

    def _data_setup(self):
        self.user = UserFactory(email=self.uname)
        self.profile = ProfileFactory(user=self.user)
        self.project = ProjectFactory(user=self.user)
        self.membership = MembershipFactory(user=self.user, project=self.project)
        self.experiment1 = ExperimentFactory(user=self.user, project=self.project)
        self.experiment2 = ExperimentFactory(user=self.user, project=self.project)
