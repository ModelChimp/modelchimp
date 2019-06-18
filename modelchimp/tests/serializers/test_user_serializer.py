from modelchimp.tests import BaseTest

from modelchimp.factories.factory_user import UserFactory
from modelchimp.serializers.user import UserSerializer
from modelchimp.models.user import User


class UserSerializerTest(BaseTest):
    serializer_class = UserSerializer
    model_class = User
    factory_class = UserFactory
    data = {
        'email':'admin@gmail.com',
        'password': 'modelchimp123',
        'confirm_password' : 'modelchimp123'
    }

    def setUp(self):
        super().setUp()
        self.obj1 = self.factory_class()
        self.obj2 = self.factory_class()

    def test_serialize_single(self):
        serialized_data = self.serializer_class(self.obj1)
        self.assertEqual(serialized_data.data['username'], self.obj1.username)
        self.assertEqual(serialized_data.data['email'], self.obj1.email)

        serialized_data = self.serializer_class(data=self.data)
        self.assertTrue(serialized_data.is_valid())

    def test_serialize_many(self):
        serialized_data = self.serializer_class(self.model_class.objects.all(), many=True)
        self.assertEqual(len(serialized_data.data), 3)
