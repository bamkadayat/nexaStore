#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting NexaStore...${NC}"

# Setup database tunnel
echo -e "${YELLOW}Checking database connection...${NC}"
if lsof -Pi :5433 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${GREEN}✓ Database tunnel is already running${NC}"
else
    echo -e "${YELLOW}🔌 Starting database tunnel...${NC}"
    gcloud compute ssh nexastore --zone=europe-north1-a -- -L 5433:10.166.0.2:5432 -N -f

    sleep 2
    if lsof -Pi :5433 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo -e "${GREEN}✓ Database tunnel connected${NC}"
    else
        echo -e "\033[0;31m✗ Failed to start database tunnel${NC}"
        exit 1
    fi
fi

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
