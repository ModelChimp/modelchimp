from modelchimp.tests import BaseTest

from modelchimp.models.user import User
from modelchimp.factories.factory_user import UserFactory
from modelchimp.factories.factory_profile import ProfileFactory

from rest_framework import status
import json

class ExperimentApiTest(BaseTest):
    def setUp(self):
        super().setUp()

    def test_profile_retrieve(self):
        response = self.client.get('/api/v2/user',)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['first_name'])
        self.assertTrue(response.data['last_name'])

    def test_profile_update(self):
        profile_data = ProfileFactory()

        response = self.client.post(
                        '/api/v2/user',
                        data=json.dumps({
                            'first_name' : profile_data.first_name,
                            'last_name' : profile_data.last_name,
                        }),
                        content_type='application/json',
                    )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], profile_data.first_name)
        self.assertEqual(response.data['last_name'], profile_data.last_name)
