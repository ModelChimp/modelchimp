#!/bin/sh -
# Get the commandline arguments
POSITIONAL=()
while [[  $# -gt 0 ]]
do
    key="$1"

    case $key in
        --load-data)
            LOAD_DATA=1
            shift # past argument
            ;;
        *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument
            ;;
    esac
done

# Create .env if it doesn't exist
if [ ! -e .env ]
then
    cp .env-dev .env
fi

if [ $LOAD_DATA ]
then
  docker-compose -p modelchimp-django up --build --abort-on-container-exit
  exit
fi

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build --abort-on-container-exit
