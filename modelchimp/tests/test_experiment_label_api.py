import json

from django.test import TestCase, Client, override_settings
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from modelchimp.models.comment import Comment
from modelchimp.models.user import User
from modelchimp.models.machinelearning_model import MachineLearningModel


class ExperimentLabelAPITest(TestCase):
    fixtures = ['modelchimp.json']

    def setUp(self):
        self.client = Client()
        self.client.login(username='admin@modelchimp.com', password='modelchimp123')
        ml_obj = MachineLearningModel.objects.get(pk=73)
        ml_obj.labels = ['Production', 'Staging']
        ml_obj.save()

    def test_label_post(self):
        labels = ['D', 'T', 'M']

        for l in labels:
            response = self.client.post(
                    reverse('experiment_label_create',kwargs={'model_id': 73}),
                    data={'label': l}
                    )

            self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_label_get(self):
        response = self.client.get(
                reverse('experiment_label_create',kwargs={'model_id': 73}),
                )
        result = response.json()

        self.assertIn('Production', result['labels'])
        self.assertIn('Staging', result['labels'])
        self.assertNotIn('Testing', result['labels'])


    def test_label_delete(self):
        # Delete the label
        response = self.client.delete("%s?label=Production" %
                (reverse('experiment_label_create',kwargs={'model_id': 73}),),
                )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT )

        # Check if the label is actually deleted
        response = self.client.get(
                reverse('experiment_label_create',kwargs={'model_id': 73}),
                )
        result = response.json()

        self.assertIn('Staging', result['labels'])
        self.assertNotIn('Production', result['labels'])
