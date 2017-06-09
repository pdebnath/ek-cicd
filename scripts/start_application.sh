#!/bin/bash

set -e

EASYKNOCK_HOME='/home/ec2-user/ek-cicd'

TEMP_STAGING_DIR='/tmp/codedeploy-deployment-staging-area'

# Copy the WAR file to the webapps directory
su ec2-user -c 'cp -R '$TEMP_STAGING_DIR'/* '$EASYKNOCK_HOME
