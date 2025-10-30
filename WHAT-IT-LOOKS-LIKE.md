# What Your System Monitor Looks Like

## Main Dashboard View

```
┌─────────────────────────────────────────────────────┐
│           🖥️  System Monitor                        │
│      Real-time Linux system statistics              │
│      Last updated: 6:30:45 PM                       │
└─────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│   System Info        │  │   CPU                │
│                      │  │                      │
│ Hostname: arch-pc    │  │ Model: Intel i7-8850H│
│ Platform: linux      │  │ Cores: 12            │
│ Kernel: 6.17.3       │  │ Speed: 2600 MHz      │
│ Uptime: 7h 50m       │  │                      │
│                      │  │ Usage: 23%           │
│                      │  │ ████████░░░░░░░░░░   │
└──────────────────────┘  └──────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│   Memory             │  │   Disk               │
│                      │  │                      │
│ Total: 31.09 GB      │  │ Filesystem: /dev/sda │
│ Used: 15.07 GB       │  │ Size: 1.8T           │
│ Free: 16.02 GB       │  │ Used: 1.2T           │
│                      │  │ Available: 500G      │
│ Usage: 48.5%         │  │                      │
│ █████████░░░░░░░░░░  │  │ Usage: 67%           │
│                      │  │ █████████████░░░░░░░ │
└──────────────────────┘  └──────────────────────┘

┌────────────────────────────────────────────────────┐
│   Top Processes (by Memory)                        │
│                                                    │
│ PID    User      CPU%  MEM%  Command              │
│ 1234   joe       5.2   12.1  /usr/bin/firefox     │
│ 5678   joe       2.1   8.3   node server.js       │
│ 9012   joe       1.5   5.2   /usr/bin/kitty       │
│ ...                                                │
└────────────────────────────────────────────────────┘

         Refreshes every 5 seconds
```

## Color Scheme

- **Background**: Purple/blue gradient (Instagram-like)
- **Cards**: White with subtle shadow
- **CPU Bar**: Purple gradient
- **Memory Bar**: Pink/red gradient  
- **Disk Bar**: Blue gradient
- **Text**: Clean, readable typography

## Responsive Design

Works on:
- ✅ Desktop (full layout)
- ✅ Laptop (optimized for your ThinkPad)
- ✅ Tablet (stacked cards)
- ✅ Phone (mobile-friendly)

## Features in Action

**Auto-refresh**: 
Page updates every 5 seconds with new data - you'll see the bars move as CPU usage changes

**Error handling**: 
If backend goes down, shows friendly error message with retry button

**Loading state**: 
Shows "Loading system stats..." while fetching initial data

**Hover effects**: 
Cards lift up slightly when you hover over them

**Smooth animations**: 
Usage bars smoothly transition when values change

## What Makes It Look Professional

1. **Modern gradient background** - Not boring white
2. **Card-based layout** - Organized and clean
3. **Color-coded usage bars** - Easy to understand at a glance
4. **Monospace font for values** - Looks technical and precise
5. **Responsive grid** - Adapts to any screen size
6. **Smooth hover effects** - Feels interactive
7. **Live updates** - Shows it's working in real-time

## Tech That Makes It Work

**Frontend (React):**
- useState for managing stats data
- useEffect for auto-refresh every 5 seconds
- Fetch API to get data from backend
- CSS Grid for responsive layout
- CSS transitions for smooth animations

**Backend (Node.js):**
- Express web server
- CORS enabled for local development
- Reads from Linux system files
- Returns JSON data

**No external libraries needed** for the UI - just clean React and CSS!
