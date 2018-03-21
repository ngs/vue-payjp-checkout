#!/bin/sh

set -eux

ROOT=$(cd $(dirname $0)/.. && pwd)
DIST=$ROOT/dist

cd $ROOT
COMMIT=$(git rev-parse HEAD)
REPO_URL=$(git config remote.origin.url)

rm -rf $DIST/.git
git init $DIST
cd $DIST

git remote add origin $REPO_URL
rm -rf .tmp
mkdir .tmp
ls -lsa
mv * .tmp/

git fetch origin gh-pages
git checkout gh-pages || git checkout -b gh-pages

rm -rf *
mv .tmp/* .
rmdir .tmp
rm -rf .circleci
mkdir .circleci

cat <<EOF > .circleci/config.yml
version: 2
jobs: {}
workflows:
  version: 2
EOF

git add --all
git commit -m "Update gh-pages from ${COMMIT}"
git push origin gh-pages
