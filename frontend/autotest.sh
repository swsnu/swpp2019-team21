#!/bin/bash -eu
DIRECTORY_TO_OBSERVE="."      # might want to change this
function block_for_change {
  inotifywait --recursive \
    --event modify,move,create,delete \
    $DIRECTORY_TO_OBSERVE
}
function build {
  yarn test --coverage --watchAll=false || true
}
build
while block_for_change; do
  build
done
Uses inotify-tools. Ch