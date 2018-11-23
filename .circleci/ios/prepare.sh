#!/bin/bash

pushd ios
curl https://cocoapods-specs.circleci.com/fetch-cocoapods-repo-from-s3.sh | bash -s cf
pod install
popd
