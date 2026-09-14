@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script for Windows
@REM ----------------------------------------------------------------------------

@IF "%DEBUG%" == "" @ECHO OFF
@SETLOCAL EnableExtensions EnableDelayedExpansion

set "DIRNAME=%~dp0"
if "%DIRNAME%" == "" set "DIRNAME=."
set "APP_BASE_NAME=%~n0"
set "APP_HOME=%DIRNAME%"

@REM Execute Maven
if exist "%APP_HOME%\.mvn\wrapper\maven-wrapper.jar" (
    java -jar "%APP_HOME%\.mvn\wrapper\maven-wrapper.jar" %*
) else (
    mvn %*
)
