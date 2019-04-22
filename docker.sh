#!/bin/sh -
# Get the commandline arguments
POSITIONAL=()
while [[  $# -gt 0 ]]
do
    key="$1"

    case $key in
        --development)
            DEVELOPMENT=1
            shift # past argument
            ;;
        -d)
            DEVELOPMENT=1
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

if [ $DEVELOPMENT ]
then
  docker-compose -f docker-compose.dev.yml up --build --abort-on-container-exit
  exit
fi

docker-compose -f docker-compose.local.yml up --build --abort-on-container-exit
