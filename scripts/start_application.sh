#!/bin/bash

set -e

EASYKNOCK_APP_DIR='/home/ec2-user/ek-cicd'

TEMP_STAGING_DIR='/tmp/codedeploy-deployment-staging-area'

# Copy the files in staging dir recursively to easyknock app directory
cp -R $TEMP_STAGING_DIR/* $EASYKNOCK_APP_DIR
