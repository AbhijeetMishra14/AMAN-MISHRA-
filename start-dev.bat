@echo off
title Aman Mishra - Development Environment

echo.
echo 🚀 Aman Mishra Development Environment Startup
echo ================================================
echo.

REM Check if backend node_modules exists
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo ✅ Backend dependencies installed
    echo.
)

REM Check if backend .env exists
if not exist "backend\.env" (
    echo ⚠️  Backend .env file not found!
    echo 📋 Creating from template...
    copy backend\.env.example backend\.env
    echo.
    echo ⚙️  Please update backend\.env with your credentials:
    echo    - WHATSAPP_BUSINESS_PHONE_ID
    echo    - WHATSAPP_ACCESS_TOKEN
    echo    - OWNER_WHATSAPP_NUMBER
    echo    - SMTP credentials
    echo.
    pause
)

echo 🖥️  Starting servers...
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.

REM Start backend in new window
echo 🔵 Starting backend server...
start "Aman Mishra Backend" cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start frontend
echo 🔵 Starting frontend server...
call npm run dev

echo.
echo 👋 Development environment stopped
pause
