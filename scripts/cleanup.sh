#!/bin/bash

TEMP_STAGING_DIR='/tmp/codedeploy-deployment-staging-area'

if [ -d $TEMP_STAGING_DIR ]; then
    rm -rf $TEMP_STAGING_DIR
fi
mkdir -vp $TEMP_STAGING_DIR