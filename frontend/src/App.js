import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
      setLastUpdate(new Date());
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch stats on mount and every 5 seconds
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Format bytes to human readable
  const formatBytes = (bytes) => {
    const gb = (bytes / 1024 / 1024 / 1024).toFixed(2);
    return `${gb} GB`;
  };

  // Format uptime to human readable
  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading system stats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <p>Make sure the backend server is running on port 3001</p>
          <button onClick={fetchStats}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🖥️ System Monitor</h1>
        <p className="subtitle">Real-time Linux system statistics</p>
        {lastUpdate && (
          <p className="last-update">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        )}
      </header>

      <div className="stats-container">
        {/* System Info */}
        <div className="stat-card">
          <h2>System Info</h2>
          <div className="stat-item">
            <span className="label">Hostname:</span>
            <span className="value">{stats.system.hostname}</span>
          </div>
          <div className="stat-item">
            <span className="label">Platform:</span>
            <span className="value">{stats.system.platform} ({stats.system.arch})</span>
          </div>
          <div className="stat-item">
            <span className="label">Kernel:</span>
            <span className="value">{stats.system.kernel}</span>
          </div>
          <div className="stat-item">
            <span className="label">Uptime:</span>
            <span className="value">{formatUptime(stats.system.uptime)}</span>
          </div>
        </div>

        {/* CPU */}
        <div className="stat-card">
          <h2>CPU</h2>
          <div className="stat-item">
            <span className="label">Model:</span>
            <span className="value">{stats.cpu.model}</span>
          </div>
          <div className="stat-item">
            <span className="label">Cores:</span>
            <span className="value">{stats.cpu.count}</span>
          </div>
          <div className="stat-item">
            <span className="label">Speed:</span>
            <span className="value">{stats.cpu.speed} MHz</span>
          </div>
          <div className="usage-bar">
            <div className="label">Usage: {stats.cpu.usage}%</div>
            <div className="bar">
              <div 
                className="bar-fill cpu" 
                style={{ width: `${stats.cpu.usage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Memory */}
        <div className="stat-card">
          <h2>Memory</h2>
          <div className="stat-item">
            <span className="label">Total:</span>
            <span className="value">{formatBytes(stats.memory.total)}</span>
          </div>
          <div className="stat-item">
            <span className="label">Used:</span>
            <span className="value">{formatBytes(stats.memory.used)}</span>
          </div>
          <div className="stat-item">
            <span className="label">Free:</span>
            <span className="value">{formatBytes(stats.memory.free)}</span>
          </div>
          <div className="usage-bar">
            <div className="label">Usage: {stats.memory.usagePercent}%</div>
            <div className="bar">
              <div 
                className="bar-fill memory" 
                style={{ width: `${stats.memory.usagePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Disk */}
        <div className="stat-card">
          <h2>Disk</h2>
          <div className="stat-item">
            <span className="label">Filesystem:</span>
            <span className="value">{stats.disk.filesystem}</span>
          </div>
          <div className="stat-item">
            <span className="label">Size:</span>
            <span className="value">{stats.disk.size}</span>
          </div>
          <div className="stat-item">
            <span className="label">Used:</span>
            <span className="value">{stats.disk.used}</span>
          </div>
          <div className="stat-item">
            <span className="label">Available:</span>
            <span className="value">{stats.disk.available}</span>
          </div>
          <div className="usage-bar">
            <div className="label">Usage: {stats.disk.usePercent}</div>
            <div className="bar">
              <div 
                className="bar-fill disk" 
                style={{ width: stats.disk.usePercent }}
              />
            </div>
          </div>
        </div>

        {/* Top Processes */}
        <div className="stat-card wide">
          <h2>Top Processes (by Memory)</h2>
          <div className="process-table">
            <div className="process-header">
              <span>PID</span>
              <span>User</span>
              <span>CPU%</span>
              <span>MEM%</span>
              <span>Command</span>
            </div>
            {stats.processes.map((proc, idx) => (
              <div key={idx} className="process-row">
                <span>{proc.pid}</span>
                <span>{proc.user}</span>
                <span>{proc.cpu}</span>
                <span>{proc.mem}</span>
                <span className="command">{proc.command}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer>
        <p>Refreshes every 5 seconds</p>
      </footer>
    </div>
  );
}

export default App;
