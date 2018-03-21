#!/bin/sh

set -eux

ROOT=$(cd $(dirname $0)/.. && pwd)
DIST=$ROOT/dist

cd $ROOT
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

git add --all
git commit -m '[ci skip] update gh-pages'
git push origin gh-pages
