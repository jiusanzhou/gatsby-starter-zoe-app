#!/bin/bash

# /**
#  * The main/index function, things we should do:
#  * - clone the zoe site theme (default: jiusanzhou/gatsby-starter-zoe-app) 
#  *   as theme
#  * - generate the zoe-site config list  (loadzoefile should implement load multi file)
#  * - build: npm run install && npm run build
#  * - copy [dist] to [target]
#  * - commint to current branch or create a new branch
#  */

DEFAULT_THEME = "jiusanzhou/gatsby-starter-zoe-app"

function main() {
    echo "Welcome \`zoe site\`!"

}

# zoe-site.sh build jiusanzhou/gatsby-starter-zoe-app
main $@