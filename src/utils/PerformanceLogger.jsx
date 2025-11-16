/**
 * Performance Logging and Monitoring Utility
 * Cin7 Core Platform - Performance Tracking and Analysis
 */

import { useEffect, useRef, useCallback } from 'react';
import errorMonitor from '../services/ErrorMonitor';

class PerformanceLogger {
  constructor() {
    this.measurements = new Map();
    this.observers = new Map();
    this.componentMetrics = new Map();
    this.interactionMetrics = [];
    this.thresholds = {
      renderTime: 16, // 60fps = 16.67ms per frame
      mountTime: 100,  // Component should mount within 100ms
      interactionTime: 100, // User interactions should complete within 100ms
      memoryGrowth: 50 * 1024 * 1024 // 50MB growth is concerning
    };
    this.isInitialized = false;

    this.initialize();
  }

  initialize() {
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Initialize performance observers
    this.setupPerformanceObservers();

    // Monitor memory usage
    this.setupMemoryMonitoring();

    // Monitor frame rate
    this.setupFrameRateMonitoring();

    this.isInitialized = true;
  }

  setupPerformanceObservers() {
    // Observer for navigation timing
    if ('PerformanceObserver' in window) {
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.processNavigationEntry(entry);
          }
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.set('navigation', navigationObserver);
      } catch (e) {
        console.warn('Navigation timing observer not supported');
      }

      // Observer for resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.processResourceEntry(entry);
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.set('resource', resourceObserver);
      } catch (e) {
        console.warn('Resource timing observer not supported');
      }

      // Observer for paint timing
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.processPaintEntry(entry);
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.set('paint', paintObserver);
      } catch (e) {
        console.warn('Paint timing observer not supported');
      }

      // Observer for long tasks
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.processLongTaskEntry(entry);
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.set('longtask', longTaskObserver);
      } catch (e) {
        console.warn('Long task observer not supported');
      }

      // Observer for largest contentful paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('largest_contentful_paint', lastEntry.startTime, {
            element: lastEntry.element?.tagName,
            url: lastEntry.url
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.set('lcp', lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }
    }
  }

  setupMemoryMonitoring() {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = performance.memory;
        const usedMemory = memory.usedJSHeapSize;
        const totalMemory = memory.totalJSHeapSize;
        const limit = memory.jsHeapSizeLimit;

        this.recordMetric('memory_used', usedMemory, {
          total: totalMemory,
          limit,
          utilization: usedMemory / limit
        });

        // Check for memory leaks
        if (this.componentMetrics.size > 0) {
          const totalComponentMemory = Array.from(this.componentMetrics.values())
            .reduce((sum, metrics) => sum + (metrics.memoryUsage || 0), 0);

          if (totalComponentMemory > this.thresholds.memoryGrowth) {
            errorMonitor.log('warn', 'Potential memory leak detected', {
              componentMemory: totalComponentMemory,
              threshold: this.thresholds.memoryGrowth,
              componentCount: this.componentMetrics.size
            });
          }
        }
      };

      // Check memory every 10 seconds
      setInterval(checkMemory, 10000);
      checkMemory(); // Initial check
    }
  }

  setupFrameRateMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();

    const countFrames = (currentTime) => {
      frameCount++;
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / deltaTime);

        this.recordMetric('frame_rate', fps, {
          frameCount,
          duration: deltaTime
        });

        if (fps < 30) {
          errorMonitor.log('warn', 'Low frame rate detected', {
            fps,
            threshold: 30
          });
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(countFrames);
    };

    requestAnimationFrame(countFrames);
  }

  processNavigationEntry(entry) {
    const metrics = {
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart,
      domInteractive: entry.domInteractive - entry.navigationStart,
      firstByte: entry.responseStart - entry.requestStart
    };

    Object.entries(metrics).forEach(([name, value]) => {
      if (value > 0) {
        this.recordMetric(`navigation_${name}`, value, {
          type: 'navigation',
          url: entry.name
        });
      }
    });
  }

  processResourceEntry(entry) {
    if (entry.duration > 1000) {
      errorMonitor.log('warn', 'Slow resource loading', {
        url: entry.name,
        duration: entry.duration,
        type: entry.initiatorType,
        size: entry.transferSize
      });
    }

    this.recordMetric('resource_load_time', entry.duration, {
      url: entry.name,
      type: entry.initiatorType,
      size: entry.transferSize,
      cached: entry.transferSize === 0 && entry.decodedBodySize > 0
    });
  }

  processPaintEntry(entry) {
    this.recordMetric(`paint_${entry.name.replace('-', '_')}`, entry.startTime, {
      type: 'paint'
    });
  }

  processLongTaskEntry(entry) {
    this.recordMetric('long_task_duration', entry.duration, {
      type: 'long_task',
      startTime: entry.startTime
    });

    errorMonitor.log('warn', 'Long task detected', {
      duration: entry.duration,
      startTime: entry.startTime,
      threshold: 50
    });
  }

  startMeasure(name, metadata = {}) {
    const startTime = performance.now();
    this.measurements.set(name, {
      startTime,
      metadata
    });

    if (this.isDebugMode()) {
      console.log(`🔍 Started measuring: ${name}`, metadata);
    }
  }

  endMeasure(name, metadata = {}) {
    const measurement = this.measurements.get(name);
    if (!measurement) {
      console.warn(`No measurement found for: ${name}`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - measurement.startTime;

    const result = {
      name,
      duration,
      startTime: measurement.startTime,
      endTime,
      metadata: { ...measurement.metadata, ...metadata }
    };

    this.measurements.delete(name);
    this.recordMetric(`measure_${name}`, duration, result.metadata);

    // Check if measurement exceeds threshold
    this.checkThreshold(name, duration, result.metadata);

    if (this.isDebugMode()) {
      console.log(`⏱️ Completed measuring: ${name} (${duration.toFixed(2)}ms)`, result);
    }

    return result;
  }

  measureFunction(name, fn, metadata = {}) {
    const startTime = performance.now();

    try {
      const result = fn();

      if (result && typeof result.then === 'function') {
        // Async function
        return result.finally(() => {
          const duration = performance.now() - startTime;
          this.recordMetric(`function_${name}`, duration, metadata);
        });
      } else {
        // Sync function
        const duration = performance.now() - startTime;
        this.recordMetric(`function_${name}`, duration, metadata);
        return result;
      }
    } catch (error) {
      const duration = performance.now() - startTime;
      this.recordMetric(`function_${name}_error`, duration, { ...metadata, error: error.message });
      throw error;
    }
  }

  checkThreshold(name, duration, metadata) {
    let threshold = null;
    let category = 'custom';

    if (name.includes('render')) {
      threshold = this.thresholds.renderTime;
      category = 'render';
    } else if (name.includes('mount')) {
      threshold = this.thresholds.mountTime;
      category = 'mount';
    } else if (name.includes('interaction') || name.includes('click')) {
      threshold = this.thresholds.interactionTime;
      category = 'interaction';
    }

    if (threshold && duration > threshold) {
      errorMonitor.capturePerformanceIssue({
        name: `slow_${name}`,
        value: duration,
        threshold,
        context: {
          category,
          ...metadata
        }
      });
    }
  }

  recordMetric(name, value, metadata = {}) {
    errorMonitor.logMetric(name, value, metadata);

    // Store component-specific metrics
    if (metadata.componentName) {
      if (!this.componentMetrics.has(metadata.componentName)) {
        this.componentMetrics.set(metadata.componentName, {
          renderCount: 0,
          totalRenderTime: 0,
          averageRenderTime: 0,
          lastRenderTime: 0,
          memoryUsage: 0
        });
      }

      const metrics = this.componentMetrics.get(metadata.componentName);

      if (name.includes('render')) {
        metrics.renderCount++;
        metrics.totalRenderTime += value;
        metrics.averageRenderTime = metrics.totalRenderTime / metrics.renderCount;
        metrics.lastRenderTime = value;
      } else if (name.includes('memory')) {
        metrics.memoryUsage = value;
      }
    }
  }

  getComponentMetrics(componentName) {
    return this.componentMetrics.get(componentName) || null;
  }

  getAllComponentMetrics() {
    return Object.fromEntries(this.componentMetrics);
  }

  getInteractionMetrics() {
    return this.interactionMetrics;
  }

  generatePerformanceReport() {
    const componentMetrics = this.getAllComponentMetrics();
    const slowComponents = Object.entries(componentMetrics)
      .filter(([_, metrics]) => metrics.averageRenderTime > this.thresholds.renderTime)
      .sort(([, a], [, b]) => b.averageRenderTime - a.averageRenderTime);

    const memoryIntensiveComponents = Object.entries(componentMetrics)
      .filter(([_, metrics]) => metrics.memoryUsage > 10 * 1024 * 1024) // 10MB
      .sort(([, a], [, b]) => b.memoryUsage - a.memoryUsage);

    return {
      summary: {
        totalComponents: Object.keys(componentMetrics).length,
        slowComponents: slowComponents.length,
        memoryIntensiveComponents: memoryIntensiveComponents.length,
        averageRenderTime: this.calculateAverageRenderTime(componentMetrics)
      },
      slowComponents: slowComponents.map(([name, metrics]) => ({
        name,
        averageRenderTime: metrics.averageRenderTime,
        renderCount: metrics.renderCount,
        lastRenderTime: metrics.lastRenderTime
      })),
      memoryIntensiveComponents: memoryIntensiveComponents.map(([name, metrics]) => ({
        name,
        memoryUsage: metrics.memoryUsage,
        renderCount: metrics.renderCount
      })),
      allMetrics: componentMetrics,
      timestamp: Date.now()
    };
  }

  calculateAverageRenderTime(componentMetrics) {
    const values = Object.values(componentMetrics);
    if (values.length === 0) return 0;

    const totalTime = values.reduce((sum, metrics) => sum + metrics.totalRenderTime, 0);
    const totalRenders = values.reduce((sum, metrics) => sum + metrics.renderCount, 0);

    return totalRenders > 0 ? totalTime / totalRenders : 0;
  }

  isDebugMode() {
    return process.env.NODE_ENV === 'development';
  }

  destroy() {
    // Clean up observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();

    // Clear measurements
    this.measurements.clear();
    this.componentMetrics.clear();
    this.interactionMetrics = [];
    this.isInitialized = false;
  }
}

// Create singleton instance
const performanceLogger = new PerformanceLogger();

// React Hooks for performance monitoring
export const usePerformanceMonitor = (componentName, options = {}) => {
  const renderCountRef = useRef(0);
  const mountTimeRef = useRef(null);
  const lastRenderTimeRef = useRef(null);

  useEffect(() => {
    // Component mount
    mountTimeRef.current = performance.now();
    renderCountRef.current = 0;

    performanceLogger.startMeasure(`${componentName}_lifecycle`, {
      componentName,
      phase: 'mount'
    });

    return () => {
      // Component unmount
      const mountDuration = performance.now() - mountTimeRef.current;

      performanceLogger.recordMetric('component_lifecycle', mountDuration, {
        componentName,
        phase: 'mount',
        renderCount: renderCountRef.current
      });

      performanceLogger.endMeasure(`${componentName}_lifecycle`, {
        componentName,
        phase: 'unmount',
        renderCount: renderCountRef.current
      });
    };
  }, [componentName]);

  useEffect(() => {
    // Component render/update
    const now = performance.now();
    renderCountRef.current++;

    if (lastRenderTimeRef.current) {
      const renderTime = now - lastRenderTimeRef.current;

      performanceLogger.recordMetric('component_render', renderTime, {
        componentName,
        renderCount: renderCountRef.current,
        isUpdate: true
      });

      performanceLogger.endMeasure(`${componentName}_render`, {
        componentName,
        renderCount: renderCountRef.current
      });
    }

    lastRenderTimeRef.current = now;

    if (options.trackRenderTime !== false) {
      performanceLogger.startMeasure(`${componentName}_render`, {
        componentName,
        renderCount: renderCountRef.current
      });
    }
  });

  const measureInteraction = useCallback((interactionName, fn) => {
    return performanceLogger.measureFunction(`${componentName}_${interactionName}`, fn, {
      componentName,
      interactionType: interactionName
    });
  }, [componentName]);

  const getMetrics = useCallback(() => {
    return performanceLogger.getComponentMetrics(componentName);
  }, [componentName]);

  return {
    renderCount: renderCountRef.current,
    measureInteraction,
    getMetrics,
    startMeasure: performanceLogger.startMeasure.bind(performanceLogger),
    endMeasure: performanceLogger.endMeasure.bind(performanceLogger)
  };
};

export const usePageLoadMonitor = (pageName) => {
  useEffect(() => {
    const startTime = performance.now();

    performanceLogger.startMeasure(`page_${pageName}`, {
      pageName,
      type: 'page_load'
    });

    return () => {
      const duration = performance.now() - startTime;
      performanceLogger.endMeasure(`page_${pageName}`, {
        pageName,
        type: 'page_load_complete'
      });
    };
  }, [pageName]);
};

export default performanceLogger;