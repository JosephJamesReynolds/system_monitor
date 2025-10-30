# System Monitor Backend

Node.js/Express server that provides system statistics via REST API.

## Setup

```bash
npm install
```

## Run

```bash
node server.js
```

Server will run on http://localhost:3001

## Endpoints

- `GET /api/stats` - Get all system statistics
- `GET /api/health` - Health check

## What it does

Reads system information from:
- CPU usage and info
- Memory usage
- Disk usage
- System info (hostname, uptime, kernel)
- Top 10 processes by memory usage
