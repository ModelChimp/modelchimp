import json

from rest_framework import status

from modelchimp.tests import BaseTest
from modelchimp.enum import ExperimentStatus, Constants


class ExperimentParamApiTest(BaseTest):

    def setUp(self):
        super().setUp()
        self.url = '/{}/experiment/{}/param/'.format(Constants.API_V2,
                                                    self.experiment1.id)

    def test_status(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_parameter_data(self):
        response = self.client.get(self.url)

        self.assertTrue(isinstance(response.data, dict))
        self.assertEqual(response.data, self.experiment1.parameters)
