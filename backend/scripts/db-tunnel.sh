#!/bin/bash

# Check if tunnel is already running
if lsof -Pi :5433 -sTCP:LISTEN -t >/dev/null ; then
    echo "✓ Database tunnel is already running on port 5433"
    exit 0
fi

echo "🔌 Starting database tunnel..."
gcloud compute ssh nexastore --zone=europe-north1-a -- -L 5433:10.166.0.2:5432 -N -f

# Wait a moment and check if it worked
sleep 2
if lsof -Pi :5433 -sTCP:LISTEN -t >/dev/null ; then
    echo "✓ Database tunnel started successfully on port 5433"
else
    echo "✗ Failed to start database tunnel"
    exit 1
fi
