#!/bin/bash

#uploadToRDS
#Author : Deepak G. Singh | deepak@modelchimp.com

cd "${0%/*}"
set -e -x


###################
# Set RDS Config
###################
RDS_ENDPOINT='modelchimptest.cxlivgiiwqnt.us-west-1.rds.amazonaws.com'
RDS_PORT=5432
RDS_DB_USER=modelchimp
RDS_DB_NAME=modelchimpdb
RDS_DB_PWD='modelchimp123'
LOCAL_DB_USER=modelchimp
LOCAL_DB_NAME=modelchimpdb
LOCAL_DB_PWD='modelchimp123'
LOCAL_BKP='localdmp.bak'

rm ./$LOCAL_BKP

echo "Creating local dump"
pg_dump --host=127.0.0.1 -U $LOCAL_DB_USER -W $LOCAL_DB_NAME > ./$LOCAL_BKP


echo "Local dump created"

echo "Connecting to RDS"
psql \
   -f $LOCAL_BKP \
   --host $RDS_ENDPOINT \
   --port $RDS_PORT \
   --username $RDS_DB_USER \
   --password \
   $RDS_DB_NAME

echo "Removing temp files"
rm ./$LOCAL_BKP