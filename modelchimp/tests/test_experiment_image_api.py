from django.test import TestCase, Client, override_settings
from rest_framework.test import APIClient
from django.urls import reverse
from modelchimp.models.comment import Comment
from modelchimp.models.user import User
from rest_framework import status
import json

class ExperimentImageAPITest(TestCase):
    fixtures = ['modelchimp.json']

    def setUp(self):
        self.client = Client()
        self.client.login(username='admin@modelchimp.com', password='modelchimp123')

    def test_filters(self):
        response = self.client.get(
                reverse('experiment_image_filter',kwargs={'model_id': 888}),)

        expected_metric_1 = 'v'
        expected_metric_2 = 'w'
        not_expected_metric_1 = 'z'

        expected_epoch_1 = 0
        expected_epoch_1 = 2
        not_expected_epoch_1 = 1

        result = response.json()
        metric_filters = [ m['metric'] for m in result['metric_filter'] ]
        epoch_filters = [ e['epoch'] for e in result['epoch_filter'] ]

        self.assertIn(expected_metric_1, metric_filters)
        self.assertIn(expected_metric_2, metric_filters)
        self.assertNotIn(not_expected_epoch_1, metric_filters)

        self.assertIn(expected_epoch_1, epoch_filters)
        self.assertIn(expected_epoch_1, epoch_filters)
        self.assertNotIn(not_expected_epoch_1, epoch_filters)


    @override_settings(AWS_STORAGE_FLAG=False)
    def test_upload_image(self):
        filepath = 'assets/img/logo.png'

        with open(filepath, 'rb') as f:
            response = self.client.post(
                    reverse('experiment_image_add_image'),
                    data={
                        "custom_file_name": "test_name",
                        "metric_dict": json.dumps({"v":1,"w":2}),
                        "epoch": 2,
                        "project": 14,
                        "ml_model": 888,
                        'experiment_image' : f
                    },
                    format="multipart"
                )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_table_data(self):
        response = self.client.get("%s?draw=%d&start=%d&length=%d&columns[2][name]=%s&order[0][column]=%d&order[0][dir]=%s&epoch=%d&search[value]=%s" % (
        reverse('experiment_image_data',kwargs={'model_id': 888}),
                1,0,10,'v',0,'asc',0,''))

        result = response.json()
        self.assertEqual(result['data'][0]['name'], 'dog.8011_UjIfcaA.jpg')
        self.assertEqual(result['data'][0]['metric_0'], 0)
        self.assertEqual(result['recordsFiltered'], 1)
