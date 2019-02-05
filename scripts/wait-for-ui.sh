#!/bin/sh
# wait-for-ui.sh

set -e

cmd="$@"

until [ -d ./client/build ]; do
  >&2 echo "Waiting for the UI to be built!"
  sleep 1
done

>&2 echo "UI built successfully!"
exec $cmd
