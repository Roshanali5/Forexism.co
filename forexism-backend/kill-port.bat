@echo off
echo Finding process on port 5001...
netstat -ano | findstr :5001
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001 ^| findstr LISTENING') do (
    echo Killing process %%a...
    taskkill /PID %%a /F
    echo Process killed!
)
echo.
echo Port 5001 is now free. Start server with: npm start
pause

