#!/bin/bash

echo "🚀 Starting NexaStore Backend..."

# Check if tunnel is already running
if lsof -Pi :5433 -sTCP:LISTEN -t >/dev/null ; then
    echo "✓ Database tunnel is already running"
else
    echo "🔌 Starting database tunnel..."
    gcloud compute ssh nexastore --zone=europe-north1-a -- -L 5433:10.166.0.2:5432 -N -f

    # Wait and verify
    sleep 2
    if lsof -Pi :5433 -sTCP:LISTEN -t >/dev/null ; then
        echo "✓ Database tunnel connected"
    else
        echo "✗ Failed to start database tunnel"
        exit 1
    fi
fi

# Start the development server
echo "🔥 Starting development server..."
tsx watch src/server.ts
