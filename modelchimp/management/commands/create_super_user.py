from django.core.management.base import BaseCommand, CommandError
from django.db import IntegrityError
from django.db import connections
from django.db.utils import OperationalError
from django.core.files.storage import default_storage
from django.conf import settings
from django.core.mail import send_mail
from modelchimp.models.user import User
from modelchimp.models.profile import Profile

from uuid import uuid4
import sys

class Command(BaseCommand):
    help = 'Check connections to external dependencies'

    def add_arguments(self, parser):
        parser.add_argument('--email', action='store', required=True )
        parser.add_argument('--password', action='store', required=True )


    def handle(self, *args, **options):
        email = options['email']
        password = options['password']

        try:
            User.objects.get(email=email)
            print("User: %s already exists" % (email) )
        except User.DoesNotExist:
            user = User.objects.create_superuser(email, password)
            Profile.objects.create(first_name="Super",last_name="User", user=user)
            print("Super user succesfully created")
