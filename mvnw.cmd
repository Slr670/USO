@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script for Windows
@REM ----------------------------------------------------------------------------

@IF "%DEBUG%" == "" @ECHO OFF
@SETLOCAL EnableExtensions EnableDelayedExpansion

set "DIRNAME=%~dp0"
if "%DIRNAME:~-1%" == "\" set "DIRNAME=%DIRNAME:~0,-1%"
if "%DIRNAME%" == "" set "DIRNAME=."
set "APP_BASE_NAME=%~n0"
set "APP_HOME=%DIRNAME%"

@REM Auto-detect Java 17+ for Spring Boot 3 compatibility
if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot\bin\java.exe" (
    set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
    set "JAVACMD=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot\bin\java.exe"
    set "PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot\bin;%PATH%"
) else if exist "C:\Program Files\Java\jdk-17\bin\java.exe" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-17"
    set "JAVACMD=C:\Program Files\Java\jdk-17\bin\java.exe"
    set "PATH=C:\Program Files\Java\jdk-17\bin;%PATH%"
) else if exist "C:\Program Files\Eclipse Adoptium\jdk-21.0.12.8-hotspot\bin\java.exe" (
    set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.12.8-hotspot"
    set "JAVACMD=C:\Program Files\Eclipse Adoptium\jdk-21.0.12.8-hotspot\bin\java.exe"
    set "PATH=C:\Program Files\Eclipse Adoptium\jdk-21.0.12.8-hotspot\bin;%PATH%"
) else if not "%JAVA_HOME%" == "" (
    set "JAVACMD=%JAVA_HOME%\bin\java.exe"
) else (
    set "JAVACMD=java"
)

@REM Execute Maven
if exist "%APP_HOME%\.mvn\wrapper\maven-wrapper.jar" (
    "%JAVACMD%" "-Dmaven.multiModuleProjectDirectory=%APP_HOME%" -cp "%APP_HOME%\.mvn\wrapper\maven-wrapper.jar" org.apache.maven.wrapper.MavenWrapperMain %*
) else (
    mvn %*
)
