#!/usr/bin/env bash
# This package has migrated to the Next.js version.
# git.io/zoe-site (legacy short link) is preserved by forwarding to the new repo.
#
#   New: https://github.com/jiusanzhou/nextjs-starter-zoe-app
#   Old: https://github.com/jiusanzhou/gatsby-starter-zoe-app  (this repo, archived)
#
# Usage: curl -sSL https://git.io/zoe-site | bash -s <command> [args...]

set -euo pipefail

NEW_SCRIPT="https://raw.githubusercontent.com/jiusanzhou/nextjs-starter-zoe-app/main/scripts/zoe-site.sh"

exec bash -c "$(curl -fsSL "$NEW_SCRIPT")" -- "$@"
