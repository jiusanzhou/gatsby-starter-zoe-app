#!/bin/bash

theme="jiusanzhou/gatsby-starter-zoe-app"
branch="master"
script="hack/zoe-site.js"
target="/tmp/zoe-site"

if [ ! -d $target ]; then mkdir -p $target; fi

curl -sSL https://raw.githubusercontent.com/$theme/$branch/$script \
    > $target/zoe-site.js

# start the main
node $target/zoe-site.js $@