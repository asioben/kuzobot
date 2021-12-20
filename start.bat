echo Lancement du bot, développer par Sudry, Aposh et Kaito.
call node index.js

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)