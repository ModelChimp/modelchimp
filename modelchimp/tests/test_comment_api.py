from django.test import TestCase, Client
from django.urls import reverse
from modelchimp.models.comment import Comment
from modelchimp.models.user import User
from rest_framework import status
import json

class CommentApiTest(TestCase):
    fixtures = ['modelchimp.json']

    def setUp(self):
        self.client = Client()
        self.valid_comment = {
        	'comment' : 'This is a test comment'
        }

    def test_commet_post(self):
        login = self.client.login(username='admin@modelchimp.com', password='modelchimp123')
        response = self.client.post(
                reverse('comment_api',kwargs={'model_pk': 16}),
                data=json.dumps(self.valid_comment),
                content_type='application/json',
            )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
