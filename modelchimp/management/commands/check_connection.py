from django.core.management.base import BaseCommand, CommandError
from django.db import IntegrityError
from django.db import connections
from django.db.utils import OperationalError
from django.core.files.storage import default_storage
from django.conf import settings
from django.core.mail import send_mail

from uuid import uuid4
import sys

class Command(BaseCommand):
    help = 'Check connections to external dependencies'

    def add_arguments(self, parser):
        parser.add_argument('--db', action='store_true', default=False )
        parser.add_argument('--aws', action='store_true', default=False )
        parser.add_argument('--email', action='store_true', default=False )


    def handle(self, *args, **options):
        if options['db']: self._check_db_connection()
        if options['aws']: self._check_aws_connection()
        if options['email']: self._check_email_connection()


    def _check_db_connection(self):
        db_conn = connections['default']
        c = db_conn.cursor()


    def _check_aws_connection(self):
        if not settings.AWS_STORAGE_FLAG:
            raise Exception("Error: Please set the AWS_STORAGE_FLAG to True and add the required AWS Credentials")

        storage_content = str(uuid4())

        file = default_storage.open('storage_test', 'w')
        file.write(storage_content)
        file.close()

        file = default_storage.open('storage_test', 'r')
        received_content = file.read()
        file.close()

        if not storage_content == received_content.decode():
            raise Exception('''Error: There was an error while doing read and write to AWS.
                             The written content in storage_test does not match the read content''')


    def _check_email_connection(self):
        send_mail(
        'Test Mail',
        'Here is the message.',
        'admin@modelchimp.com',
        ['admin@modelchimp.com'],
        fail_silently=False,
        )
