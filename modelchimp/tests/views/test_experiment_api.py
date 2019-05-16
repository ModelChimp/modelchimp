from modelchimp.tests import BaseTest

from modelchimp.models.user import User
from modelchimp.factories.factory_user import UserFactory
from modelchimp.factories.factory_profile import ProfileFactory
from modelchimp.enum import ExperimentStatus

from rest_framework import status
import json

class ExperimentApiTest(BaseTest):
    EXPECTED_KEYS = {
        'name'
        ,'status'
        ,'labels'
        ,'date_created'
        ,'date_modified'
        ,'code_file'
    }

    def setUp(self):
        super().setUp()

    def test_create_experiment(self):
        f = open('modelchimp/tests/sample_code.py')
        response = self.client.post(
                                f'/api/v2/experiment/create/{self.project.id}/',
                                data={
                                    'project' : self.project.id,
                                    'status' : ExperimentStatus.IN_PROCESS,
                                    'code_file': f
                                    },
                                    format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(
                        f'/api/v2/experiment/create/{self.project.id}/',
                        data={
                            'project' : self.project.id
                            ,'experiment_id' : response.data['experiment_id']
                            ,'status' : ExperimentStatus.IN_PROCESS
                            ,'code_file': f
                            },
                            format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        f.close()

    def test_single_experiment(self):
        response = self.client.get(f'/api/v2/experiment/{self.experiment1.id}/meta/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.experiment1.name)
        self.assertEqual(response.data['status'], self.experiment1.status)
        self.assertEqual(response.data['labels'], self.experiment1.labels)
        self.assertTrue(response.data['date_created'])
        self.assertTrue(response.data['date_modified'])
        self.assertTrue(response.data['code_file'])

    def test_list_experiment(self):
        response = self.client.get(f'/api/v2/experiment/list/{self.project.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), self.project.ml_model_project.count())

        for i,e in enumerate(response.data):
            for k in self.EXPECTED_KEYS:
                self.assertTrue(k in e.keys())

    def test_delete_single_experiment(self):
        response = self.client.delete(
                    f'/api/v2/experiment/delete/{self.project.id}/',
                    data={
                        'model_id' : self.experiment1.id,
                    }
                    ,format="multipart")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_multiple_experiments(self):
        response = self.client.delete(
                    f'/api/v2/experiment/delete/{self.project.id}/',
                    data={
                        'model_ids' : [self.experiment1.id, self.experiment2.id],
                    }
                    ,format="multipart")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
