#!/bin/sh
# ----------------------------------------------------------------------------
# Apache Maven Wrapper startup script for POSIX environments
# ----------------------------------------------------------------------------

DIRNAME="$(cd "$(dirname "$0")" && pwd)"
WRAPPER_JAR="$DIRNAME/.mvn/wrapper/maven-wrapper.jar"

if [ -f "$WRAPPER_JAR" ]; then
    exec java -jar "$WRAPPER_JAR" "$@"
else
    exec mvn "$@"
fi
