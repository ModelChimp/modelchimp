from modelchimp.tests import BaseTest

from modelchimp.factories.factory_user import UserFactory
from modelchimp.models.user import User


class UserModelTest(BaseTest):
    model_class = User
    factory_class = UserFactory
    data = {
        'username' : 'modelchimp_admin',
        'email':'admin@gmail.com',
        'password': 'modelchimp123',
    }

    def setUp(self):
        super().setUp()
        self.obj1 = self.factory_class()

    def test_create(self):
        instance = self.model_class.objects.create(**self.data)
        self.assertEqual(instance.email, self.data['email'])
        self.assertEqual(instance.username, self.data['username'])

    def test_retrieve(self):
        instance = self.model_class.objects.get(username=self.obj1.username)

        self.assertEqual(instance.email, self.obj1.email)
        self.assertEqual(instance.username, self.obj1.username)

    def test_update(self):
        instance = self.model_class.objects.get(username=self.obj1.username)
        instance.username = 'admin'
        instance.save()

        self.assertEqual(instance.username, 'admin')

    def test_delete(self):
        instance = self.model_class.objects.get(username=self.obj1.username)
        instance.delete()

        delete_flag = False
        try:
            self.model_class.objects.get(username=self.obj1.username)
        except User.DoesNotExist:
            delete_flag = True

        self.assertTrue(delete_flag)
