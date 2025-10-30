# 🖥️ System Monitor Dashboard

Real-time Linux system monitoring dashboard built with React and Node.js.

## Features

- ✅ CPU usage and information
- ✅ Memory usage statistics
- ✅ Disk space monitoring
- ✅ System information (hostname, uptime, kernel)
- ✅ Top 10 processes by memory usage
- ✅ Auto-refresh every 5 seconds
- ✅ Clean, modern UI with gradient design

## Tech Stack

**Backend:**
- Node.js
- Express
- Native OS modules

**Frontend:**
- React
- CSS3 (no external UI libraries needed)
- Fetch API

## Quick Start

### Terminal 1 - Start Backend

```bash
cd backend
node server.js
```

Backend will run on http://localhost:3001

### Terminal 2 - Start Frontend

```bash
cd frontend
npm start
```

Frontend will open automatically on http://localhost:3000

## Project Structure

```
system-monitor/
├── backend/
│   ├── server.js          # Express server with system stats API
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   └── App.css       # Styling
│   ├── public/
│   └── package.json
└── README.md             # This file
```

## API Endpoints

**GET /api/stats**
Returns all system statistics:
- CPU usage, count, model, speed
- Memory total, used, free, usage percentage
- Disk size, used, available, usage percentage
- System hostname, platform, architecture, uptime, kernel
- Top 10 processes by memory

**GET /api/health**
Health check endpoint

## How It Works

### Backend
The server reads system information from:
- `os` module for CPU, memory, and system info
- `child_process.exec` to run `df` for disk stats
- `child_process.exec` to run `ps aux` for process list

### Frontend
- Fetches data from backend every 5 seconds
- Displays stats in organized cards
- Color-coded usage bars for CPU, memory, and disk
- Responsive design

## What You Can Add Next

**Phase 2 (Real-time with WebSockets):**
- [ ] Add Socket.io for live updates (every 1 second)
- [ ] Historical data (charts showing last 60 seconds)
- [ ] Network stats (upload/download speeds)

**Phase 3 (Advanced Features):**
- [ ] Control systemd services (start/stop/restart)
- [ ] View system logs
- [ ] Package update checker (pacman -Qu)
- [ ] Custom alerts when CPU/memory exceeds threshold
- [ ] Dark mode toggle

**Phase 4 (Deployment):**
- [ ] Add authentication
- [ ] Deploy to VPS or cloud
- [ ] HTTPS support
- [ ] Mobile-responsive improvements

## Development Notes

This project demonstrates:
- Full-stack development (React + Node.js)
- REST API design
- System-level programming
- Real-time data handling
- Linux system administration

Built for Arch Linux but works on any Linux distribution.

## License

MIT - Do whatever you want with this code!
