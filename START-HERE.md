# 👉 DO THIS NOW - Getting Started

## Right Now (Next 10 Minutes)

### 1. Download the project (2 minutes)
Download `system-monitor.tar.gz` from this conversation to your Arch laptop.

### 2. Extract it (1 minute)
```bash
cd ~/Downloads  # or wherever you downloaded it
tar -xzf system-monitor.tar.gz
cd system-monitor
ls  # You should see: backend/ frontend/ README.md start.sh
```

### 3. Install backend dependencies (2 minutes)
```bash
cd backend
npm install
```

Wait for it to finish. You'll see "added 70 packages" or similar.

```bash
cd ..  # Go back to system-monitor folder
```

### 4. Install frontend dependencies (3 minutes)
```bash
cd frontend
npm install
```

This takes a bit longer. You'll see "added ~1400 packages" or similar.

```bash
cd ..  # Go back to system-monitor folder
```

### 5. Make startup script executable (10 seconds)
```bash
chmod +x start.sh
```

---

## Next (5 Minutes)

### 6. Start everything
```bash
./start.sh
```

You'll see:
- ✓ Backend running on http://localhost:3001
- ✓ Frontend will open on http://localhost:3000

Your browser will automatically open to http://localhost:3000

### 7. Check if it works

You should see:
- Your system stats displayed in colorful cards
- CPU usage bar
- Memory usage bar
- Disk space info
- Top processes list
- Everything updates every 5 seconds

---

## If Something Goes Wrong

### "npm: command not found"
You need Node.js installed:
```bash
sudo pacman -S nodejs npm
```

### "Cannot find module 'express'"
Run `npm install` in the backend folder:
```bash
cd backend
npm install
cd ..
```

### "Failed to fetch stats"
Make sure backend is running:
```bash
# In another terminal:
curl http://localhost:3001/api/health

# Should return: {"status":"ok","timestamp":...}
```

### Port already in use
Kill whatever's using the port:
```bash
# Kill process on port 3001:
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000:
lsof -ti:3000 | xargs kill -9
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
./start.sh
```

---

## After It's Working (10 Minutes)

### 1. Test the backend API directly
Open a new terminal:
```bash
curl http://localhost:3001/api/stats
```

You'll see raw JSON data. This is what the frontend is fetching.

### 2. Look at the code
Open the project in your text editor:
```bash
# If you use VS Code:
code .

# Or just open these files:
# - backend/server.js
# - frontend/src/App.js
```

### 3. Make a small change
Try changing the refresh interval:

In `frontend/src/App.js`, find this line (around line 24):
```javascript
const interval = setInterval(fetchStats, 5000);
```

Change `5000` to `2000` (updates every 2 seconds instead of 5):
```javascript
const interval = setInterval(fetchStats, 2000);
```

Save the file. The browser will automatically refresh and you'll see faster updates!

### 4. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - System Monitor Dashboard"

# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/system-monitor.git
git push -u origin main
```

---

## What to Do Today

✅ Get it running
✅ Test that all stats display correctly
✅ Test the API with curl
✅ Read through backend/server.js
✅ Read through frontend/src/App.js
✅ Make one small change (color, refresh rate, etc.)
✅ Push to GitHub

**Time needed: ~30 minutes total**

---

## What to Do This Weekend

📖 Read NEXT-STEPS.md for ideas on what to add
🎨 Customize the colors/design
⚡ Add one new feature (network stats, system load, etc.)
📸 Take screenshots
📝 Write a good README for GitHub
💼 Update your resume

---

## The Commands You Need

```bash
# Extract the project
tar -xzf system-monitor.tar.gz
cd system-monitor

# Install everything
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Make script executable
chmod +x start.sh

# Run it
./start.sh

# Stop it (in the terminal where it's running)
Ctrl+C
```

---

## Success Criteria

You'll know it's working when:
✅ Browser opens to localhost:3000
✅ You see system stats displayed
✅ Numbers update every 5 seconds
✅ Process list shows your running programs
✅ Usage bars move as your system activity changes

---

## What You're Looking At

When it's working, you'll see:

1. **System Info Card** - hostname, kernel version, uptime
2. **CPU Card** - usage percentage with purple bar
3. **Memory Card** - RAM usage with pink bar
4. **Disk Card** - storage usage with blue bar
5. **Process Table** - top 10 processes by memory

All with a cool purple gradient background!

---

## Important Files Reference

```
backend/server.js       ← The backend code (read this first)
frontend/src/App.js     ← The React component (read this second)
frontend/src/App.css    ← The styling (read this third)
README.md               ← Full documentation
start.sh                ← Easy startup script
```

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't extract .tar.gz | `tar -xzf system-monitor.tar.gz` |
| npm not found | `sudo pacman -S nodejs npm` |
| Module not found | Run `npm install` in that folder |
| Port in use | `lsof -ti:3001 \| xargs kill -9` |
| Backend not responding | Check it's running: `curl localhost:3001/api/health` |
| Frontend error | Make sure backend is running first |

---

## The Absolute Minimum

If you do nothing else today, just do this:

```bash
# 1. Extract
tar -xzf system-monitor.tar.gz
cd system-monitor

# 2. Install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 3. Run
chmod +x start.sh
./start.sh
```

**That's it. Everything else can wait.**

Once you see it working in your browser, you've successfully started your first non-blockchain full-stack project! 🎉

---

Now go extract that tar.gz file and get it running! 🚀
