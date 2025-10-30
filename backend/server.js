const express = require('express');
const cors = require('cors');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

const app = express();
app.use(cors());

// Helper function to read CPU stats
function getCPUStats() {
  const cpus = os.cpus();
  const cpuCount = cpus.length;
  
  let totalIdle = 0;
  let totalTick = 0;
  
  cpus.forEach(cpu => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });
  
  const idle = totalIdle / cpuCount;
  const total = totalTick / cpuCount;
  const usage = 100 - ~~(100 * idle / total);
  
  return {
    usage: usage,
    count: cpuCount,
    model: cpus[0].model,
    speed: cpus[0].speed
  };
}

// Helper function to get memory stats
function getMemoryStats() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  
  return {
    total: totalMem,
    used: usedMem,
    free: freeMem,
    usagePercent: ((usedMem / totalMem) * 100).toFixed(1)
  };
}

// Helper function to get disk stats
async function getDiskStats() {
  try {
    const { stdout } = await execPromise('df -h / | tail -1');
    const parts = stdout.trim().split(/\s+/);
    
    return {
      filesystem: parts[0],
      size: parts[1],
      used: parts[2],
      available: parts[3],
      usePercent: parts[4],
      mountPoint: parts[5]
    };
  } catch (error) {
    return { error: 'Could not get disk stats' };
  }
}

// Helper function to get system info
function getSystemInfo() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: os.uptime(),
    kernel: os.release()
  };
}

// Helper function to get top processes
async function getTopProcesses() {
  try {
    const { stdout } = await execPromise('ps aux --sort=-%mem | head -11');
    const lines = stdout.trim().split('\n').slice(1); // Skip header
    
    const processes = lines.map(line => {
      const parts = line.trim().split(/\s+/);
      return {
        user: parts[0],
        pid: parts[1],
        cpu: parts[2],
        mem: parts[3],
        command: parts.slice(10).join(' ').substring(0, 50)
      };
    });
    
    return processes;
  } catch (error) {
    return [];
  }
}

// Main stats endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const [disk, processes] = await Promise.all([
      getDiskStats(),
      getTopProcesses()
    ]);
    
    const stats = {
      timestamp: Date.now(),
      cpu: getCPUStats(),
      memory: getMemoryStats(),
      disk: disk,
      system: getSystemInfo(),
      processes: processes
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get system stats' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Stats endpoint: http://localhost:${PORT}/api/stats`);
});
