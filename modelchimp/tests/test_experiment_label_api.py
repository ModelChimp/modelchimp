from django.test import TestCase, Client, override_settings
from rest_framework.test import APIClient
from django.urls import reverse
from modelchimp.models.comment import Comment
from modelchimp.models.user import User
from rest_framework import status
import json

class ExperimentLabelAPITest(TestCase):
    fixtures = ['modelchimp.json']

    def setUp(self):
        self.client = Client()
        self.client.login(username='admin@modelchimp.com', password='modelchimp123')

    def test_label_post(self):
        labels = ['D', 'T', 'M']

        for l in labels:
            response = self.client.post(
                    reverse('experiment_label_create',kwargs={'model_id': 888}),
                    data={'label': l}
                    )

            self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_label_get(self):
        response = self.client.get(
                reverse('experiment_label_create',kwargs={'model_id': 888}),
                )
        result = response.json()

        self.assertIn('Production', result['labels'])
        self.assertIn('Staging', result['labels'])
        self.assertIn('Testing', result['labels'])


    def test_label_delete(self):
        # Delete the label
        response = self.client.delete("%s?label=Production" %
                (reverse('experiment_label_create',kwargs={'model_id': 888}),),
                )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT )

        # Check if the label is actually deleted
        response = self.client.get(
                reverse('experiment_label_create',kwargs={'model_id': 888}),
                )
        result = response.json()

        self.assertIn('Staging', result['labels'])
        self.assertNotIn('Production', result['labels'])
