#!/usr/bin/env bash

# Get the commandline arguments
POSITIONAL=()
while [[  $# -gt 0 ]]
do
    key="$1"

    case $key in
        --check-aws)
            AWS=1
            shift # past argument
            ;;
        --check-email)
            EMAIL=1
            shift # past argument
            ;;
        --set-oauth)
            OAUTH=1
            shift # past argument
            ;;
        *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument
            ;;
    esac
done

#Load the environment variables
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
source $DIR/.env

# Switch current directory to ModelChimp
cd $MODELCHIMP_PATH/
PIP_CMD=$MODELCHIMP_PATH/venv/bin/pip
PYTHON_CMD=$MODELCHIMP_PATH/venv/bin/python

if [ $AWS ]; then
  echo "Checking AWS configuration for S3"
  $PYTHON_CMD manage.py check_connection --aws
  if [ $? -eq 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi
fi

echo "Checking DB configuration"
$PYTHON_CMD manage.py check_connection --db
if [ $? -eq 0 ]; then
    echo "...Successfull"
else
    echo "...Failed"
    exit 1
fi

if [ $EMAIL ]; then
  echo "Checking Email configuration"
  $PYTHON_CMD manage.py check_connection --email
  if [ $? -eq 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi
fi

# Perform migrations
$PYTHON_CMD manage.py migrate
echo "Creating super user"
$PYTHON_CMD manage.py create_super_user --email $SUPERUSER_EMAIL --password $SUPERUSER_PASSWORD
if [ $? -eq 0 ]; then
    echo "...Successfull"
else
    echo "...Failed"
    exit 1
fi

if [ $OAUTH ]; then
  echo "Setting Google OAuth configuration"
  $PYTHON_CMD manage.py set_google_auth
  if [ $? -eq 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi
fi

# Restart services associated to ModelChimp
function service_restarts() {
  echo "Restarting daphne server"
  systemctl restart daphne
  systemctl is-active --quiet daphne.service
  if [ $? -eq 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi

  echo "Restarting gunicorn server"
  systemctl restart gunicorn
  systemctl is-active --quiet gunicorn.service
  if [ $? -eq 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi

  echo "Restarting redis server"
  systemctl restart redis
  systemctl is-active --quiet redis.service
  if [ $? -eq 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi

  echo "Restarting celery"
  supervisorctl restart modelchimpcelery
  status=`supervisorctl status modelchimpcelery | grep RUNNING | wc -l`
  if [ $status -ne 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi

  echo "Restarting celery beat"
  supervisorctl restart modelchimpcelerybeat
  status=`supervisorctl status modelchimpcelerybeat | grep RUNNING | wc -l`
  if [ $status -ne 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi

  echo "Restarting nginx server"
  systemctl restart nginx
  systemctl is-active --quiet nginx.service
  if [ $? -eq 0 ]; then
      echo "...Successfull"
  else
      echo "...Failed"
      exit 1
  fi
}


if [ $DEBUG == 'False' ]; then
service_restarts
fi
