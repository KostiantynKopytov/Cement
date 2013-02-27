@echo off

if NOT EXIST "%~d0%~p0mongodb-install.done.user" (
  echo INSTALL MONGODB
  call :run call "%~d0%~p0..\..\database\mongodb\mongodb-service-install.cmd"
  echo done >"%~d0%~p0mongodb-install.done.user"
)

for %%i in ("%~d0%~p0*.js") do (
  call :mongo "%%i" "%%i.copy.user"
)

echo OK
exit 0

:mongo
fc /b %1 %2 >NUL 2>NUL
if %errorlevel% NEQ 0 (
  echo SEED %1
  call :run "%~d1%~p1..\..\database\MongoDb\bin\mongo.exe" --quiet %1
  copy /y %1 %2 >NUL
)
exit /b 0

:run
%1 %2 %3 %4
if %errorlevel% NEQ 0 goto :error
exit /b 0

:error
echo ERROR
exit 1
