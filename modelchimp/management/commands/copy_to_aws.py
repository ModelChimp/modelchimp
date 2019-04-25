from django.core.management.base import BaseCommand
from django.core.files.storage import default_storage
from decouple import config

from os import listdir
from os.path import isfile, join
import botocore

class Command(BaseCommand):
    help = 'Send files to AWS Storage'

    def add_arguments(self, parser):
        parser.add_argument('--folder', action='store', required=True)

    def handle(self, *args, **options):
        if not config('AWS_STORAGE_FLAG', default=False, cast=bool):
            print("AWS Storage not set")
            return

        modelchimp_path = config('MODELCHIMP_PATH')
        folder_name = options['folder']

        local_folder_path = f"{modelchimp_path}/media/{folder_name}"
        aws_folder_path = f"{folder_name}"


        files = [f for f in listdir(local_folder_path) if isfile(join(local_folder_path, f))]
        for i,f in enumerate(files):
            local_file_path = f"{local_folder_path}/{f}"
            aws_file_path = f"{aws_folder_path}/{f}"

            try:
                with open(local_file_path, 'rb') as lf:
                    file_obj = lf.read()
                    with default_storage.open(aws_file_path, 'wb') as al:
                        al.write(file_obj)
            except botocore.exceptions.ClientError as e:
                print(f'''There was an error uploading the file: {f}
                Error: {e}
                ''')
                continue

            print(f"Files written {i+1}/{len(files)}")
