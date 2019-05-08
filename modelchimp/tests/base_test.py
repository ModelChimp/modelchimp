from django.test import TestCase, Client

from modelchimp.factories.factory_user import UserFactory
from modelchimp.factories.factory_profile import ProfileFactory


class BaseTest(TestCase):
    def setUp(self):
        self.user = UserFactory(email='admin@modelchimp.com')
        self.profile = ProfileFactory(user=self.user)
        self.client = Client()
        self.login = self.client.login(username='admin@modelchimp.com', password='modelchimp123')
