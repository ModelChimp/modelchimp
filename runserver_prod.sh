#!/bin/sh -

# Creating some dummy assets
mkdir -p media/code
mkdir -p media/profile
cp assets/sample_code.py media/code/sample_code.py
cp assets/img/profile_pic.png media/profile/profile_pic.png

# Setting up the server
python3 /code/manage.py migrate
python3 /code/manage.py collectstatic --noinput
python3 manage.py create_super_user --email admin@modelchimp.com --password modelchimp123
python3 /code/manage.py set_google_auth
python3 /code/manage.py runserver 0.0.0.0:8000
