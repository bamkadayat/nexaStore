#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting NexaStore...${NC}"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${GREEN}Installing frontend dependencies...${NC}"
    cd frontend && pnpm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo -e "${GREEN}Installing backend dependencies...${NC}"
    cd backend && pnpm install && cd ..
fi

# Start both frontend and backend
echo -e "${GREEN}Starting frontend and backend...${NC}"
trap 'kill 0' EXIT
(cd backend && pnpm dev) & (cd frontend && pnpm dev) &
wait
