from modelchimp.tests import BaseTest

from modelchimp.serializers.experiment import ExperimentSerializer
from modelchimp.models.experiment import Experiment

from rest_framework import status
import json


class ExperimentSerializerTest(BaseTest):
    serializer_class = ExperimentSerializer
    model_class = Experiment


    def setUp(self):
        super().setUp()
        self.data = {
            'name' : 'Manhattan'
            ,'status' : self.experiment1.status
            ,'labels' : self.experiment1.labels

            ,'parameters' : self.experiment1.parameters
            ,'metrics' : self.experiment1.metrics
            ,'durations' : self.experiment1.durations
            ,'grid_search' : self.experiment1.grid_search

            ,'user' : self.experiment1.user.id
            ,'project' : self.experiment1.project.id
        }

    def test_serialize_single(self):
        serialized_data = self.serializer_class(self.experiment1)
        self.assertEqual(serialized_data.data['name'], self.experiment1.name)
        self.assertEqual(serialized_data.data['status'], self.experiment1.status)

        serialized_data = self.serializer_class(data=self.data)
        self.assertTrue(serialized_data.is_valid())

    def test_serialize_many(self):
        serialized_data = self.serializer_class(self.model_class.objects.all(), many=True)
        self.assertEqual(len(serialized_data.data), 2)
