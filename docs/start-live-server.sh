#!/bin/bash

echo "🚀 Starting Live Server with Auto-Reload..."
echo "📁 Directory: $(pwd)"
echo "🌐 URL: http://localhost:8000"
echo ""

# Kill any existing Python servers
pkill -f "python3 -m http.server" 2>/dev/null || true

# Start the live server
python3 live-server.py 