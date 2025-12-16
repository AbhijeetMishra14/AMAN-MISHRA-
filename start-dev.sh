#!/bin/bash

echo "🚀 Aman Mishra Development Environment Startup"
echo "================================================"
echo ""

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo "✅ Backend dependencies installed"
    echo ""
fi

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found!"
    echo "📋 Creating from template..."
    cp backend/.env.example backend/.env
    echo ""
    echo "⚙️  Please update backend/.env with your WhatsApp and email credentials:"
    echo "   - WHATSAPP_BUSINESS_PHONE_ID"
    echo "   - WHATSAPP_ACCESS_TOKEN"
    echo "   - OWNER_WHATSAPP_NUMBER"
    echo "   - SMTP credentials"
    echo ""
    echo "Press Enter to continue..."
    read
fi

echo "🖥️  Starting servers..."
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""

# Start backend in background
echo "🔵 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🔵 Starting frontend server..."
npm run dev

# Kill backend when frontend exits
kill $BACKEND_PID 2>/dev/null

echo ""
echo "👋 Development environment stopped"
