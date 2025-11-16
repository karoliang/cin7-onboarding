/**
 * Comprehensive Error Monitoring Service
 * Cin7 Core Platform - Global Error Capture and Reporting
 */


class ErrorMonitor {
  constructor() {
    this.config = {
      enabled: true,
      environment: process.env.NODE_ENV || 'development',
      debugMode: process.env.NODE_ENV === 'development',
      maxErrors: 100,
      maxMetrics: 1000,
      reportingInterval: 30000,
      thresholds: {
        errorRate: 0.05,
        responseTime: 2000,
        memoryUsage: 0.8,
        renderTime: 100
      },
      filters: {
        ignoreErrors: [
          'Script error.',
          'NetworkError: Failed to fetch',
          'ResizeObserver loop limit exceeded'
        ],
        ignoreUrls: [
          'chrome-extension://',
          'safari-extension://',
          'moz-extension://'
        ],
        ignoreComponents: ['DevConsole', 'ErrorBoundary'],
        logLevels: ['debug', 'info', 'warn', 'error']
      }
    };

    this.errors = [];
    this.metrics = [];
    this.logs = [];
    this.sessionId = this.generateId();
    this.startTime = Date.now();
    this.isInitialized = false;

    this.setupGlobalHandlers();
    this.startPerformanceMonitoring();
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  setupGlobalHandlers() {
    if (typeof window === 'undefined') return;

    // Global error handler
    window.addEventListener('error', (event) => {
      this.captureJavaScriptError({
        type: 'javascript',
        source: 'uncaught',
        message: event.message,
        name: event.error?.name || 'Error',
        stack: event.error?.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureJavaScriptError({
        type: 'javascript',
        source: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        name: event.reason?.name || 'PromiseRejection',
        stack: event.reason?.stack,
        reason: event.reason
      });
    });

    // Network error monitoring
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0];

      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Log successful requests
        this.logMetric('network_request', duration, {
          url: typeof url === 'string' ? url : url.url,
          method: args[1]?.method || 'GET',
          status: response.status,
          success: true
        });

        // Check for slow responses
        if (duration > this.config.thresholds.responseTime) {
          this.capturePerformanceIssue({
            name: 'slow_network_request',
            value: duration,
            threshold: this.config.thresholds.responseTime,
            context: {
              url: typeof url === 'string' ? url : url.url,
              method: args[1]?.method || 'GET',
              status: response.status
            }
          });
        }

        return response;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Capture network errors
        this.captureNetworkError({
          url: typeof url === 'string' ? url : url.url,
          method: args[1]?.method || 'GET',
          error: error.message,
          duration,
          options: args[1]
        });

        throw error;
      }
    };

    this.isInitialized = true;
  }

  startPerformanceMonitoring() {
    if (typeof window === 'undefined') return;

    // Monitor page load performance
    if (document.readyState === 'complete') {
      this.capturePageLoadMetrics();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.capturePageLoadMetrics(), 0);
      });
    }

    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

        this.logMetric('memory_usage', usageRatio, {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        });

        if (usageRatio > this.config.thresholds.memoryUsage) {
          this.capturePerformanceIssue({
            name: 'high_memory_usage',
            value: usageRatio,
            threshold: this.config.thresholds.memoryUsage,
            context: {
              used: memory.usedJSHeapSize,
              total: memory.totalJSHeapSize,
              limit: memory.jsHeapSizeLimit
            }
          });
        }
      }, 10000);
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            this.logMetric('long_task', entry.duration, {
              name: entry.name,
              startTime: entry.startTime,
              type: entry.entryType
            });
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task monitoring not supported
      }
    }
  }

  capturePageLoadMetrics() {
    if (!('performance' in window) || !('navigation' in performance)) return;

    const navigation = performance.getEntriesByType('navigation')[0];

    const metrics = {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: 0,
      firstContentfulPaint: 0
    };

    // Get paint metrics
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach(entry => {
      if (entry.name === 'first-paint') {
        metrics.firstPaint = entry.startTime;
      } else if (entry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = entry.startTime;
      }
    });

    Object.entries(metrics).forEach(([name, value]) => {
      if (value > 0) {
        this.logMetric(`page_load_${name}`, value, {
          metric: name,
          type: 'navigation'
        });
      }
    });
  }

  captureJavaScriptError(errorInfo) {
    if (!this.config.enabled) return;
    if (this.shouldIgnoreError(errorInfo.message)) return;

    const error = {
      id: this.generateId(),
      type: 'javascript',
      message: errorInfo.message,
      name: errorInfo.name,
      stack: errorInfo.stack,
      severity: this.getSeverity('javascript', errorInfo),
      category: 'JAVASCRIPT',
      location: {
        file: errorInfo.filename || 'unknown',
        line: errorInfo.lineno || 0,
        column: errorInfo.colno || 0,
        function: this.extractFunctionName(errorInfo.stack),
        component: this.getCurrentComponent(),
        route: window.location.pathname
      },
      context: this.getErrorContext(),
      occurrences: 1,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
      resolved: false,
      tags: ['javascript', 'uncaught'],
      metadata: {
        source: errorInfo.source,
        originalError: errorInfo.reason || errorInfo.originalError
      }
    };

    this.addError(error);
    this.processError(error);
  }

  captureNetworkError(networkInfo) {
    if (!this.config.enabled) return;
    if (this.shouldIgnoreUrl(networkInfo.url)) return;

    const error = {
      id: this.generateId(),
      type: 'network',
      message: `Network error: ${networkInfo.error}`,
      name: 'NetworkError',
      severity: networkInfo.status >= 500 ? 'HIGH' : 'MEDIUM',
      category: 'NETWORK',
      location: {
        file: window.location.pathname,
        line: 0,
        column: 0,
        function: 'fetch',
        component: this.getCurrentComponent(),
        route: window.location.pathname
      },
      context: this.getErrorContext(),
      occurrences: 1,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
      resolved: false,
      tags: ['network', 'api'],
      metadata: {
        url: networkInfo.url,
        method: networkInfo.method,
        statusCode: networkInfo.status,
        duration: networkInfo.duration,
        options: networkInfo.options
      }
    };

    this.addError(error);
    this.processError(error);
  }

  captureComponentError(errorInfo, componentInfo) {
    if (!this.config.enabled) return;
    if (this.shouldIgnoreComponent(componentInfo.name)) return;

    const error = {
      id: this.generateId(),
      type: 'component',
      message: errorInfo.message,
      name: errorInfo.name || 'ComponentError',
      stack: errorInfo.stack,
      severity: this.getSeverity('component', errorInfo),
      category: 'COMPONENT',
      location: {
        file: componentInfo.fileName || 'unknown',
        line: 0,
        column: 0,
        function: componentInfo.functionName || 'render',
        component: componentInfo.name,
        route: window.location.pathname
      },
      context: this.getErrorContext(),
      occurrences: 1,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
      resolved: false,
      tags: ['component', 'react'],
      metadata: {
        props: componentInfo.props,
        state: componentInfo.state,
        hookName: componentInfo.hookName,
        lifecyclePhase: componentInfo.lifecyclePhase
      }
    };

    this.addError(error);
    this.processError(error);
  }

  capturePerformanceIssue(issueInfo) {
    if (!this.config.enabled) return;

    const metric = {
      id: this.generateId(),
      name: issueInfo.name,
      value: issueInfo.value,
      unit: 'ms',
      timestamp: Date.now(),
      category: 'performance',
      context: {
        route: window.location.pathname,
        ...issueInfo.context
      },
      threshold: {
        warning: issueInfo.threshold * 0.8,
        critical: issueInfo.threshold
      },
      severity: issueInfo.value > issueInfo.threshold ? 'HIGH' : 'MEDIUM'
    };

    this.addMetric(metric);

    if (metric.severity === 'HIGH') {
      this.log('warn', `Performance issue detected: ${issueInfo.name}`, {
        value: issueInfo.value,
        threshold: issueInfo.threshold,
        context: issueInfo.context
      });
    }
  }

  captureUserInteraction(interactionInfo) {
    if (!this.config.enabled) return;

    const interaction = {
      id: this.generateId(),
      type: interactionInfo.type,
      element: interactionInfo.element,
      timestamp: Date.now(),
      duration: interactionInfo.duration,
      route: window.location.pathname,
      metadata: interactionInfo.metadata || {}
    };

    // Store in recent interactions (limited array)
    if (!this.recentInteractions) {
      this.recentInteractions = [];
    }
    this.recentInteractions.push(interaction);

    // Keep only last 50 interactions
    if (this.recentInteractions.length > 50) {
      this.recentInteractions.shift();
    }
  }

  log(level, message, context = {}) {
    if (!this.config.enabled) return;
    if (!this.config.filters.logLevels.includes(level)) return;

    const entry = {
      id: this.generateId(),
      level: level.toUpperCase(),
      message,
      timestamp: Date.now(),
      context,
      source: this.getCurrentComponent() || 'global',
      tags: []
    };

    this.logs.push(entry);

    // Keep logs limited
    if (this.logs.length > 500) {
      this.logs = this.logs.slice(-400);
    }

    // Output to console in development
    if (this.config.debugMode) {
      const consoleMethod = console[level] || console.log;
      consoleMethod(`[${level.toUpperCase()}] ${message}`, context);
    }
  }

  logMetric(name, value, context = {}) {
    if (!this.config.enabled) return;

    const metric = {
      id: this.generateId(),
      name,
      value,
      unit: typeof value === 'number' ? 'ms' : 'count',
      timestamp: Date.now(),
      category: this.getMetricCategory(name),
      context: {
        route: window.location.pathname,
        ...context
      }
    };

    this.addMetric(metric);
  }

  addError(error) {
    // Check if similar error already exists
    const existing = this.errors.find(e =>
      e.message === error.message &&
      e.location.component === error.location.component
    );

    if (existing) {
      existing.occurrences++;
      existing.lastSeen = Date.now();
      return existing;
    }

    this.errors.push(error);

    // Keep errors limited
    if (this.errors.length > this.config.maxErrors) {
      this.errors = this.errors.slice(-this.config.maxErrors + 10);
    }

    return error;
  }

  addMetric(metric) {
    this.metrics.push(metric);

    // Keep metrics limited
    if (this.metrics.length > this.config.maxMetrics) {
      this.metrics = this.metrics.slice(-this.config.maxMetrics + 100);
    }

    return metric;
  }

  processError(error) {
    // Log to console in development
    if (this.config.debugMode) {
      console.group(`🚨 ${error.severity} Error: ${error.message}`);
      console.error(error);
      console.groupEnd();
    }

    // In production, you would send this to your error reporting service
    if (this.config.environment === 'production') {
      this.reportError(error);
    }

    // Check error rate
    this.checkErrorRate();
  }

  reportError(error) {
    // Send to error reporting service (Sentry, Bugsnag, etc.)
    // This is a placeholder implementation
    if (this.config.endpoint && this.config.apiKey) {
      fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(error)
      }).catch(e => {
        console.error('Failed to report error:', e);
      });
    }
  }

  checkErrorRate() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentErrors = this.errors.filter(e => e.lastSeen > oneMinuteAgo);
    const errorRate = recentErrors.length / 60; // errors per second

    if (errorRate > this.config.thresholds.errorRate) {
      this.log('error', 'High error rate detected', {
        errorRate,
        threshold: this.config.thresholds.errorRate,
        recentErrors: recentErrors.length
      });
    }
  }

  generateReport() {
    const now = Date.now();
    const duration = now - this.startTime;

    return {
      errors: this.errors,
      metrics: this.metrics.slice(-100), // Last 100 metrics
      logs: this.logs.slice(-50), // Last 50 logs
      sessionInfo: {
        id: this.sessionId,
        startTime: this.startTime,
        duration,
        pageViews: this.metrics.filter(m => m.name === 'page_view').length,
        errors: this.errors.length
      },
      environment: this.getErrorContext(),
      generatedAt: now
    };
  }

  // Helper methods
  getErrorContext() {
    return {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      buildVersion: process.env.REACT_APP_VERSION || '1.0.0',
      environment: this.config.environment,
      deviceInfo: {
        screen: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        platform: navigator.platform
      },
      memoryInfo: performance.memory ? {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      } : undefined
    };
  }

  getCurrentComponent() {
    // This would need to be implemented with React DevTools integration
    // For now, return the last known component from our interaction tracking
    return this.recentInteractions?.[0]?.metadata?.componentName || 'unknown';
  }

  extractFunctionName(stack) {
    if (!stack) return 'unknown';
    const firstLine = stack.split('\n')[0];
    const match = firstLine.match(/at\s+([^(]+)\s*\(/);
    return match ? match[1] : 'unknown';
  }

  getSeverity(type, errorInfo) {
    if (type === 'javascript') {
      return errorInfo.name === 'TypeError' ? 'HIGH' : 'MEDIUM';
    }
    if (type === 'network' && errorInfo.status >= 500) {
      return 'HIGH';
    }
    if (type === 'component' && errorInfo.name === 'ChunkLoadError') {
      return 'CRITICAL';
    }
    return 'MEDIUM';
  }

  getMetricCategory(name) {
    if (name.includes('render') || name.includes('mount')) return 'render';
    if (name.includes('network') || name.includes('request')) return 'network';
    if (name.includes('memory')) return 'memory';
    if (name.includes('click') || name.includes('scroll')) return 'interaction';
    return 'navigation';
  }

  shouldIgnoreError(message) {
    return this.config.filters.ignoreErrors.some(pattern =>
      message.includes(pattern)
    );
  }

  shouldIgnoreUrl(url) {
    return this.config.filters.ignoreUrls.some(pattern =>
      url.includes(pattern)
    );
  }

  shouldIgnoreComponent(name) {
    return this.config.filters.ignoreComponents.includes(name);
  }

  // Public API methods
  configure(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  getErrors() {
    return this.errors;
  }

  getMetrics() {
    return this.metrics;
  }

  getLogs() {
    return this.logs;
  }

  clear() {
    this.errors = [];
    this.metrics = [];
    this.logs = [];
    this.startTime = Date.now();
  }

  destroy() {
    this.config.enabled = false;

    // Restore original fetch
    if (typeof window !== 'undefined' && window.originalFetch) {
      window.fetch = window.originalFetch;
    }
  }
}

// Create singleton instance
const errorMonitor = new ErrorMonitor();

export default errorMonitor;
export { ErrorMonitor };