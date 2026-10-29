#!/bin/sh
# Build the site and publish dist/ to the gh-pages branch served by GitHub Pages.
set -e
REPO=https://github.com/devnexus-sdp/devnexus-sdp.github.io.git
OUT=dist/resume-website/browser

npm run build
cd "$OUT"
touch .nojekyll                     # serve files as-is, no Jekyll processing
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git push -q -f "$REPO" gh-pages
rm -rf .git
echo "Deployed to https://devnexus-sdp.github.io"
