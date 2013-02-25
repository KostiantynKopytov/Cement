@echo off

if NOT EXIST "%~d0%~p0mongodb-install.timestamp.user" (
  echo INSTALL MONGODB
  call "%~d0%~p0..\database\mongodb\mongodb-service-install.cmd"
  if %errorlevel% NEQ 0 goto :error
  echo done >"%~d0%~p0mongodb-install.timestamp.user"
)

for %%i in ("%~d0%~p0*.js") do (
  call :mongo %%i %%i.timestamp.user
)

echo OK
exit 0

:mongo
if EXIST %2 (
  if %%~t1 GEQ %%~t2 (
    echo UPDATE %1
    "%~d1%~p1..\database\MongoDb\bin\mongo.exe" "%1"
    if %errorlevel% NEQ 0 goto :error
    echo done >"%2"
  )
) else (
  echo INIT %1
  "%~d1%~p1..\database\MongoDb\bin\mongo.exe" "%1"
  if %errorlevel% NEQ 0 goto :error
  echo done >"%2"
)
exit /b 0

:error
echo ERROR
exit 1
