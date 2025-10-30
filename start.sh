#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🖥️  System Monitor Dashboard${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo -e "${RED}Backend dependencies not found. Installing...${NC}"
    cd backend
    npm install
    cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${RED}Frontend dependencies not found. Installing...${NC}"
    cd frontend
    npm install
    cd ..
fi

echo -e "${GREEN}✓ Dependencies ready${NC}\n"

echo -e "${BLUE}Starting backend server...${NC}"
cd backend
node server.js &
BACKEND_PID=$!
cd ..

echo -e "${GREEN}✓ Backend running on http://localhost:3001${NC}"
echo -e "${BLUE}Backend PID: $BACKEND_PID${NC}\n"

sleep 2

echo -e "${BLUE}Starting frontend...${NC}"
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}✓ Frontend will open on http://localhost:3000${NC}"
echo -e "${BLUE}Frontend PID: $FRONTEND_PID${NC}\n"

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}🚀 System Monitor is running!${NC}"
echo -e "${GREEN}================================${NC}\n"
echo -e "Backend: ${BLUE}http://localhost:3001${NC}"
echo -e "Frontend: ${BLUE}http://localhost:3000${NC}\n"

echo -e "${BLUE}Press Ctrl+C to stop both servers${NC}\n"

# Trap Ctrl+C and kill both processes
trap "echo -e '\n${RED}Stopping servers...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Wait for both processes
wait
