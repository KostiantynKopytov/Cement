@echo off

if NOT EXIST "%~d0%~p0seed.timestamp.user" (
  for %%i in ("%~d0%~p0*.js") do (
    "%~d0%~p0..\database\MongoDb\bin\mongo.exe" "%%i"
    if %errorlevel% NEQ 0 goto :EOF
  )
) else (
  for %%t in ("%~d0%~p0seed.timestamp.user") do (
    for %%i in ("%~d0%~p0*.js") do (
      if %%~ti GEQ %%~tt "%~d0%~p0..\database\MongoDb\bin\mongo.exe" "%%i"
      if %errorlevel% NEQ 0 goto :EOF
    )
  )
)

echo done>"%~d0%~p0seed.timestamp.user"
