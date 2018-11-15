from django.urls import reverse
from django.test import TestCase, Client, override_settings

from rest_framework.test import APIClient
from rest_framework import status

from modelchimp.models.comment import Comment
from modelchimp.models.user import User
from modelchimp.models.project import Project
from modelchimp.models.machinelearning_model import MachineLearningModel
from modelchimp.models.experiment_image import ExperimentImage

import json

class ExperimentImageAPITest(TestCase):
    fixtures = ['modelchimp.json']

    def setUp(self):
        self.client = Client()
        self.client.login(username='admin@modelchimp.com', password='modelchimp123')

        filepath = 'assets/img/logo.png'
        ExperimentImage.objects.create(
            metric_dict={"v":1,"w":2},
            epoch = 3,
            experiment_image = filepath,
            project = Project.objects.get(pk=15),
            ml_model = MachineLearningModel.objects.get(id=73),
            custom_file_name = "just_a_name",
        )

    @override_settings(AWS_STORAGE_FLAG=False)
    def test_upload_image(self):
        filepath = 'assets/img/logo.png'

        with open(filepath, 'rb') as f:
            response = self.client.post(
                    reverse('experiment_image_add_image',kwargs={'project_id': 15}),
                    data={
                        "custom_file_name": "test_name",
                        "metric_dict": json.dumps({"v":1,"w":2}),
                        "epoch": 2,
                        "project": 15,
                        "ml_model": 73,
                        'experiment_image' : f
                    },
                    format="multipart"
                )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_filters(self):
        count = ExperimentImage.objects.count()
        response = self.client.get(
                reverse('experiment_image_filter',kwargs={'model_id': 73}),)

        expected_metric_1 = 'v'
        expected_metric_2 = 'w'
        not_expected_metric_1 = 'z'

        expected_epoch = 3
        not_expected_epoch_1 = 1

        result = response.json()
        metric_filters = [ m['metric'] for m in result['metric_filter'] ]
        epoch_filters = [ e['epoch'] for e in result['epoch_filter'] ]

        self.assertIn(expected_metric_1, metric_filters)
        self.assertIn(expected_metric_2, metric_filters)
        self.assertNotIn(not_expected_epoch_1, metric_filters)

        self.assertIn(expected_epoch, epoch_filters)
        self.assertNotIn(not_expected_epoch_1, epoch_filters)

    def test_table_data(self):
        response = self.client.get("%s?draw=%d&start=%d&length=%d&columns[2][name]=%s&order[0][column]=%d&order[0][dir]=%s&epoch=%d&search[value]=%s" % (
        reverse('experiment_image_data',kwargs={'model_id': 73}),
                1,0,10,'v',0,'asc',3,''))

        result = response.json()
        self.assertEqual(result['data'][0]['name'], 'just_a_name')
        self.assertEqual(result['data'][0]['metric_0'], 1)
        self.assertEqual(result['recordsFiltered'], 1)
