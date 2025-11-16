/**
 * Development Console Service
 * Cin7 Core Platform - Enhanced Debugging and Development Tools
 */

import React, { useState, useEffect, useRef } from 'react';
import { Text, Button, TextField, Select, Badge, InlineStack, Tabs } from '@shopify/polaris';
import { ViewIcon, HideIcon, SearchIcon, RefreshIcon } from '@shopify/polaris-icons';
import errorMonitor from './ErrorMonitor';
import performanceLogger from '../utils/PerformanceLogger';

class DevConsole {
  constructor() {
    this.isVisible = false;
    this.position = 'bottom-right';
    this.history = [];
    this.maxHistory = 1000;
    this.filters = {
      levels: ['error', 'warn', 'info', 'debug', 'log'],
      sources: [],
      components: [],
      searchText: ''
    };
    this.commands = new Map();
    this.plugins = new Map();
    this.isInitialized = false;

    this.setupCommands();
    this.setupInterceptors();
  }

  initialize() {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Override console methods to capture logs
    this.setupConsoleOverride();

    // Add keyboard shortcut (Ctrl/Cmd + Shift + D)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggle();
      }
    });

    this.isInitialized = true;
    this.log('info', 'DevConsole initialized', { version: '1.0.0' });
  }

  setupCommands() {
    // Register built-in commands
    this.registerCommand('help', () => this.showHelp(), 'Show available commands');
    this.registerCommand('clear', () => this.clear(), 'Clear console history');
    this.registerCommand('errors', () => this.showErrors(), 'Show all errors');
    this.registerCommand('metrics', () => this.showMetrics(), 'Show performance metrics');
    this.registerCommand('components', () => this.showComponents(), 'Show component performance');
    this.registerCommand('memory', () => this.showMemory(), 'Show memory usage');
    this.registerCommand('export', () => this.exportData(), 'Export console data');
    this.registerCommand('report', () => this.generateReport(), 'Generate performance report');
    this.registerCommand('debug', (mode) => this.setDebugMode(mode), 'Toggle debug mode');
    this.registerCommand('filter', (filter) => this.setFilter(filter), 'Set console filter');
  }

  setupInterceptors() {
    // Intercept fetch requests for logging
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      const url = args[0];
      const method = args[1]?.method || 'GET';

      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - start;

        this.log('info', `API Request: ${method} ${typeof url === 'string' ? url : url.url}`, {
          method,
          url: typeof url === 'string' ? url : url.url,
          status: response.status,
          duration: `${duration.toFixed(2)}ms`,
          type: 'network'
        });

        return response;
      } catch (error) {
        const duration = performance.now() - start;

        this.log('error', `API Request Failed: ${method} ${typeof url === 'string' ? url : url.url}`, {
          method,
          url: typeof url === 'string' ? url : url.url,
          error: error.message,
          duration: `${duration.toFixed(2)}ms`,
          type: 'network'
        });

        throw error;
      }
    };
  }

  setupConsoleOverride() {
    const originalConsole = { ...console };
    const self = this;

    ['log', 'info', 'warn', 'error', 'debug'].forEach(level => {
      console[level] = function(...args) {
        // Call original console method
        originalConsole[level].apply(console, args);

        // Add to our console history
        const message = args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');

        self.log(level, message, {
          source: 'console',
          originalArgs: args,
          level
        });
      };
    });
  }

  registerCommand(name, handler, description) {
    this.commands.set(name, { handler, description });
  }

  registerPlugin(name, plugin) {
    this.plugins.set(name, plugin);
    this.log('info', `Plugin registered: ${name}`, { plugin: name });
  }

  executeCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    const [command, ...args] = trimmed.split(' ');
    const cmd = this.commands.get(command.toLowerCase());

    if (cmd) {
      try {
        this.log('info', `> ${input}`, { type: 'command' });
        const result = cmd.handler(...args);
        if (result) {
          this.log('info', result, { type: 'command_result' });
        }
      } catch (error) {
        this.log('error', `Command failed: ${error.message}`, {
          command,
          error: error.message,
          type: 'command_error'
        });
      }
    } else {
      this.log('warn', `Unknown command: ${command}`, {
        type: 'command_error',
        suggestion: this.findSimilarCommand(command)
      });
    }
  }

  findSimilarCommand(command) {
    const commands = Array.from(this.commands.keys());
    return commands.find(cmd => cmd.startsWith(command.toLowerCase()));
  }

  log(level, message, context = {}) {
    const entry = {
      id: Date.now() + Math.random(),
      timestamp: Date.now(),
      level: level.toUpperCase(),
      message,
      context,
      source: context.source || 'application'
    };

    this.history.push(entry);

    // Keep history within limits
    if (this.history.length > this.maxHistory) {
      this.history = this.history.slice(-this.maxHistory + 100);
    }

    // Trigger update if console is visible
    if (this.onUpdate) {
      this.onUpdate(entry);
    }
  }

  clear() {
    this.history = [];
    this.log('info', 'Console cleared', { type: 'system' });
  }

  toggle() {
    this.isVisible = !this.isVisible;
    return this.isVisible;
  }

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  getFilteredHistory() {
    let filtered = this.history;

    // Filter by level
    if (this.filters.levels.length > 0 && this.filters.levels.length < 5) {
      filtered = filtered.filter(entry => this.filters.levels.includes(entry.level.toLowerCase()));
    }

    // Filter by source
    if (this.filters.sources.length > 0) {
      filtered = filtered.filter(entry => this.filters.sources.includes(entry.source));
    }

    // Filter by component
    if (this.filters.components.length > 0) {
      filtered = filtered.filter(entry =>
        this.filters.components.includes(entry.context.componentName)
      );
    }

    // Filter by search text
    if (this.filters.searchText) {
      const searchLower = this.filters.searchText.toLowerCase();
      filtered = filtered.filter(entry =>
        entry.message.toLowerCase().includes(searchLower) ||
        entry.source.toLowerCase().includes(searchLower)
      );
    }

    return filtered.reverse(); // Show newest first
  }

  // Built-in command implementations
  showHelp() {
    const commands = Array.from(this.commands.entries())
      .map(([name, { description }]) => `  ${name.padEnd(15)} - ${description}`)
      .join('\n');

    return `Available commands:\n${commands}`;
  }

  showErrors() {
    const errors = errorMonitor.getErrors();
    if (errors.length === 0) {
      return 'No errors recorded';
    }

    return `Total errors: ${errors.length}\nRecent errors:\n` +
      errors.slice(-5).map((error, index) =>
        `${index + 1}. ${error.severity} - ${error.message} (${error.location.component})`
      ).join('\n');
  }

  showMetrics() {
    const report = performanceLogger.generatePerformanceReport();

    return `Performance Report:\n` +
      `Total Components: ${report.summary.totalComponents}\n` +
      `Slow Components: ${report.summary.slowComponents}\n` +
      `Average Render Time: ${report.summary.averageRenderTime.toFixed(2)}ms`;
  }

  showComponents() {
    const metrics = performanceLogger.getAllComponentMetrics();
    const components = Object.entries(metrics)
      .map(([name, data]) => `${name}: ${data.averageRenderTime.toFixed(2)}ms (${data.renderCount} renders)`)
      .join('\n');

    return components || 'No component metrics available';
  }

  showMemory() {
    if (!performance.memory) {
      return 'Memory API not available';
    }

    const memory = performance.memory;
    return `Memory Usage:\n` +
      `Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB\n` +
      `Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB\n` +
      `Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`;
  }

  exportData() {
    const data = {
      console: this.history,
      errors: errorMonitor.getErrors(),
      metrics: performanceLogger.getAllComponentMetrics(),
      timestamp: Date.now()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cin7-debug-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    return 'Data exported successfully';
  }

  generateReport() {
    const report = performanceLogger.generatePerformanceReport();
    this.log('info', 'Performance report generated', {
      report,
      type: 'performance_report'
    });

    return 'Performance report generated - check console for details';
  }

  setDebugMode(mode) {
    const debugMode = mode === 'on' || mode === 'true' || mode === '1';
    errorMonitor.configure({ debugMode });
    return `Debug mode ${debugMode ? 'enabled' : 'disabled'}`;
  }

  setFilter(filter) {
    const [type, value] = filter.split('=');
    switch (type) {
      case 'level':
        this.filters.levels = value.split(',');
        break;
      case 'source':
        this.filters.sources = value.split(',');
        break;
      case 'search':
        this.filters.searchText = value;
        break;
      default:
        return `Unknown filter type: ${type}`;
    }
    return `Filter applied: ${type}=${value}`;
  }

  // Plugin system
  addPlugin(name, plugin) {
    if (plugin.init) {
      plugin.init();
    }
    this.plugins.set(name, plugin);
    return true;
  }

  removePlugin(name) {
    const plugin = this.plugins.get(name);
    if (plugin && plugin.destroy) {
      plugin.destroy();
    }
    return this.plugins.delete(name);
  }

  getPlugins() {
    return Array.from(this.plugins.keys());
  }
}

// Create singleton instance
const devConsole = new DevConsole();

// React component for the DevConsole UI
export const DevConsoleUI = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [filters, setFilters] = useState({
    level: 'all',
    source: 'all',
    search: ''
  });
  const historyEndRef = useRef(null);

  useEffect(() => {
    devConsole.initialize();

    // Set up update callback
    devConsole.onUpdate = (entry) => {
      setHistory(prev => [...prev.slice(-499), entry]); // Keep last 500 entries
    };

    // Load initial history
    setHistory(devConsole.getFilteredHistory());

    return () => {
      devConsole.onUpdate = null;
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new entries are added
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (command.trim()) {
      devConsole.executeCommand(command);
      setCommand('');
    }
  };

  const clearConsole = () => {
    devConsole.clear();
    setHistory([]);
  };

  const exportData = () => {
    devConsole.exportData();
  };

  const refreshHistory = () => {
    setHistory(devConsole.getFilteredHistory());
  };

  const tabs = [
    { id: 'console', content: 'Console', panel: 'console' },
    { id: 'errors', content: 'Errors', panel: 'errors' },
    { id: 'metrics', content: 'Metrics', panel: 'metrics' },
    { id: 'network', content: 'Network', panel: 'network' }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'critical';
      case 'WARN': return 'warning';
      case 'INFO': return 'info';
      default: return 'subdued';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const filteredHistory = history.filter(entry => {
    if (filters.level !== 'all' && entry.level.toLowerCase() !== filters.level) {
      return false;
    }
    if (filters.source !== 'all' && entry.source !== filters.source) {
      return false;
    }
    if (filters.search && !entry.message.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (!isVisible) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999
        }}
      >
        <Button
          icon={ViewIcon}
          onClick={() => setIsVisible(true)}
          size="large"
        >
          Dev Console
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '400px',
        backgroundColor: 'white',
        borderTop: '1px solid #e1e3e5',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e1e3e5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <InlineStack gap="200">
          <Text variant="headingSm">Developer Console</Text>
          <Badge>Development</Badge>
        </InlineStack>
        <InlineStack gap="200">
          <Button size="micro" onClick={refreshHistory}>Refresh</Button>
          <Button size="micro" onClick={clearConsole}>Clear</Button>
          <Button size="micro" onClick={exportData}>Export</Button>
          <Button size="micro" icon={HideIcon} onClick={() => setIsVisible(false)} />
        </InlineStack>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #e1e3e5' }}>
        <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Filters */}
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#f9fafb',
          borderBottom: '1px solid #e1e3e5'
        }}>
          <InlineStack gap="200">
            <Select
              options={[
                { label: 'All Levels', value: 'all' },
                { label: 'Error', value: 'error' },
                { label: 'Warning', value: 'warn' },
                { label: 'Info', value: 'info' },
                { label: 'Debug', value: 'debug' }
              ]}
              value={filters.level}
              onChange={(value) => setFilters(prev => ({ ...prev, level: value }))}
              size="small"
            />
            <TextField
              placeholder="Search..."
              value={filters.search}
              onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
              size="small"
              connectedLeft={<SearchIcon />}
            />
          </InlineStack>
        </div>

        {/* Console Output */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          fontFamily: 'monospace',
          fontSize: '12px',
          backgroundColor: '#ffffff'
        }}>
          {filteredHistory.length === 0 ? (
            <Text color="subdued">No entries to display</Text>
          ) : (
            filteredHistory.map(entry => (
              <div key={entry.id} style={{
                marginBottom: '4px',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: entry.level === 'ERROR' ? '#fef2f2' :
                                entry.level === 'WARN' ? '#fffbeb' :
                                entry.level === 'INFO' ? '#f0f9ff' : 'transparent'
              }}>
                <InlineStack gap="200" wrap={false}>
                  <Text color="subdued" as="span">
                    [{formatTimestamp(entry.timestamp)}]
                  </Text>
                  <Badge status={getLevelColor(entry.level)} size="small">
                    {entry.level}
                  </Badge>
                  <Text as="span" variant="bodySm">
                    {entry.message}
                  </Text>
                </InlineStack>
              </div>
            ))
          )}
          <div ref={historyEndRef} />
        </div>

        {/* Command Input */}
        <div style={{
          padding: '8px 16px',
          borderTop: '1px solid #e1e3e5',
          backgroundColor: '#f9fafb'
        }}>
          <form onSubmit={handleCommand}>
            <TextField
              placeholder="Type a command (type 'help' for available commands)..."
              value={command}
              onChange={setCommand}
              autoComplete="off"
              connectedLeft={<Text color="subdued">{'>'}</Text>}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default devConsole;