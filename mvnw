#!/bin/sh
# ----------------------------------------------------------------------------
# Apache Maven Wrapper startup script for POSIX environments
# ----------------------------------------------------------------------------

DIRNAME="$(cd "$(dirname "$0")" && pwd)"
WRAPPER_JAR="$DIRNAME/.mvn/wrapper/maven-wrapper.jar"

if [ -d "/c/Program Files/Eclipse Adoptium/jdk-17.0.18.8-hotspot" ]; then
    export JAVA_HOME="/c/Program Files/Eclipse Adoptium/jdk-17.0.18.8-hotspot"
    export PATH="$JAVA_HOME/bin:$PATH"
elif [ -d "C:/Program Files/Eclipse Adoptium/jdk-17.0.18.8-hotspot" ]; then
    export JAVA_HOME="C:/Program Files/Eclipse Adoptium/jdk-17.0.18.8-hotspot"
    export PATH="$JAVA_HOME/bin:$PATH"
fi

if [ -f "$WRAPPER_JAR" ]; then
    exec java -jar "$WRAPPER_JAR" "$@"
else
    exec mvn "$@"
fi
