import json

from rest_framework import status

from modelchimp.tests import BaseTest
from modelchimp.enum import ExperimentStatus, Constants


class ExperimentParamApiTest(BaseTest):
    
    def setUp(self):
        super().setUp()
        self.url = '/{}/experiment/{}/metric/'.format(Constants.API_V2
                                                    ,self.experiment1.id)

    def test_status(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_metric_data(self):
        response = self.client.get(self.url)

        self.assertTrue(isinstance(response.data, dict))

        self.assertTrue(response.data['summary'])
        self.assertTrue(isinstance(response.data['summary'], list))
        self.assertTrue(response.data['metric'])
        self.assertTrue(isinstance(response.data['metric'], dict))

        self.assertEqual(response.data['metric'], self.experiment1.metrics)
        self.assertEqual(response.data['metric'], self.experiment1.metrics)

        self.assertEqual(len(response.data['summary'])
                            ,len(response.data['metric']['metric_list']))
