/**
 * Monitoring Hook for React Components
 * Cin7 Core Platform - Easy Performance and Error Monitoring
 */

import { useEffect, useRef, useCallback } from 'react';
import { usePerformanceMonitor } from '../utils/PerformanceLogger';
import { useErrorHandler } from '../components/ErrorBoundary';
import errorMonitor from '../services/ErrorMonitor';

export const useMonitoring = (componentName, options = {}) => {
  const {
    trackErrors = true,
    trackPerformance = true,
    trackUserInteractions = true,
    autoLogProps = false,
    customMetrics = []
  } = options;

  // Performance monitoring
  const performance = usePerformanceMonitor(componentName, {
    trackRenderTime: trackPerformance
  });

  // Error handling
  const { handleError, captureError } = useErrorHandler();

  // Component state tracking
  const stateHistory = useRef([]);
  const interactionCount = useRef(0);

  // Log component mount
  useEffect(() => {
    errorMonitor.log('info', `Component ${componentName} mounted`, {
      componentName,
      timestamp: Date.now(),
      type: 'component_lifecycle'
    });

    return () => {
      errorMonitor.log('info', `Component ${componentName} unmounted`, {
        componentName,
        timestamp: Date.now(),
        type: 'component_lifecycle',
        interactionCount: interactionCount.current
      });
    };
  }, [componentName]);

  // Track props changes
  const prevProps = useRef();
  useEffect(() => {
    if (prevProps.current && autoLogProps) {
      const propsDiff = findPropsDifferences(prevProps.current, options.props);
      if (Object.keys(propsDiff).length > 0) {
        errorMonitor.log('debug', `Component ${componentName} props changed`, {
          componentName,
          propsDiff,
          type: 'props_change'
        });
      }
    }
    prevProps.current = options.props;
  });

  // Track state changes
  const trackStateChange = useCallback((newState, action = 'unknown') => {
    const stateEntry = {
      timestamp: Date.now(),
      state: newState,
      action
    };

    stateHistory.current.push(stateEntry);

    // Keep only last 10 state changes
    if (stateHistory.current.length > 10) {
      stateHistory.current = stateHistory.current.slice(-10);
    }

    if (trackErrors) {
      errorMonitor.log('debug', `Component ${componentName} state changed`, {
        componentName,
        action,
        type: 'state_change'
      });
    }
  }, [componentName, trackErrors]);

  // Track user interactions
  const trackInteraction = useCallback((interactionType, element, data = {}) => {
    interactionCount.current++;

    const interaction = {
      type: interactionType,
      element: element || 'unknown',
      timestamp: Date.now(),
      componentName,
      interactionCount: interactionCount.current,
      ...data
    };

    if (trackUserInteractions) {
      errorMonitor.captureUserInteraction(interaction);
    }

    return performance.measureInteraction(interactionType, () => Promise.resolve());
  }, [componentName, trackUserInteractions, performance]);

  // Custom metric tracking
  const trackCustomMetric = useCallback((metricName, value, metadata = {}) => {
    if (trackPerformance) {
      errorMonitor.logMetric(`custom_${componentName}_${metricName}`, value, {
        componentName,
        metricName,
        ...metadata
      });
    }
  }, [componentName, trackPerformance]);

  // Error handling wrapper
  const wrapAsyncOperation = useCallback(async (operation, operationName = 'async_operation') => {
    const startTime = performance.now();
    try {
      performance.startMeasure(`${componentName}_${operationName}`, {
        componentName,
        operation: operationName,
        type: 'async_operation'
      });

      const result = await operation();

      performance.endMeasure(`${componentName}_${operationName}`, {
        componentName,
        operation: operationName,
        success: true
      });

      return result;
    } catch (error) {
      performance.endMeasure(`${componentName}_${operationName}`, {
        componentName,
        operation: operationName,
        success: false,
        error: error.message
      });

      if (trackErrors) {
        handleError(error, {
          componentName,
          operationName,
          duration: performance.now() - startTime
        });
      }

      throw error;
    }
  }, [componentName, performance, handleError, trackErrors]);

  // Validation helper
  const validateInput = useCallback((value, rules, fieldName = 'field') => {
    const errors = [];

    if (rules.required && (!value || value.toString().trim() === '')) {
      errors.push(`${fieldName} is required`);
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors.push(`${fieldName} must be at least ${rules.minLength} characters`);
    }

    if (rules.maxLength && value && value.length > rules.maxLength) {
      errors.push(`${fieldName} must not exceed ${rules.maxLength} characters`);
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors.push(`${fieldName} format is invalid`);
    }

    if (errors.length > 0 && trackErrors) {
      captureError(`Validation failed for ${fieldName}`, {
        componentName,
        fieldName,
        value: value?.toString(),
        errors,
        type: 'validation_error'
      });
    }

    return errors;
  }, [componentName, captureError, trackErrors]);

  // Get monitoring report for this component
  const getMonitoringReport = useCallback(() => {
    const componentMetrics = performance.getMetrics();
    return {
      componentName,
      renderCount: performance.renderCount,
      averageRenderTime: componentMetrics?.averageRenderTime || 0,
      interactionCount: interactionCount.current,
      stateHistory: stateHistory.current,
      errorCount: errorMonitor.getErrors().filter(e =>
        e.location.component === componentName
      ).length,
      timestamp: Date.now()
    };
  }, [componentName, performance]);

  // API call wrapper
  const trackApiCall = useCallback(async (apiCall, apiName = 'api_call') => {
    return wrapAsyncOperation(apiCall, `api_${apiName}`);
  }, [wrapAsyncOperation]);

  // Event handler wrapper
  const createTrackedEventHandler = useCallback((handler, eventName = 'event') => {
    return async (...args) => {
      const startTime = performance.now();

      try {
        trackInteraction(eventName, 'event_handler', {
          args: args.length > 0 ? 'present' : 'none'
        });

        const result = await handler(...args);

        const duration = performance.now() - startTime;
        trackCustomMetric(`${eventName}_duration`, duration, {
          success: true,
          args: args.length
        });

        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        trackCustomMetric(`${eventName}_duration`, duration, {
          success: false,
          error: error.message,
          args: args.length
        });

        if (trackErrors) {
          handleError(error, {
            componentName,
            eventName,
            duration,
            args: args.length
          });
        }

        throw error;
      }
    };
  }, [trackInteraction, trackCustomMetric, handleError, trackErrors, componentName]);

  return {
    // Performance tracking
    ...performance,

    // Error handling
    handleError,
    captureError,
    wrapAsyncOperation,
    trackApiCall,

    // State and interaction tracking
    trackStateChange,
    trackInteraction,
    createTrackedEventHandler,

    // Custom metrics
    trackCustomMetric,

    // Validation
    validateInput,

    // Reporting
    getMonitoringReport,

    // Analytics
    interactionCount: interactionCount.current,
    stateHistory: stateHistory.current
  };
};

// Helper function to find props differences
function findPropsDifferences(prevProps, nextProps) {
  const diff = {};
  const allKeys = new Set([...Object.keys(prevProps || {}), ...Object.keys(nextProps || {})]);

  allKeys.forEach(key => {
    const prevValue = prevProps?.[key];
    const nextValue = nextProps?.[key];

    if (JSON.stringify(prevValue) !== JSON.stringify(nextValue)) {
      diff[key] = {
        prev: prevValue,
        next: nextValue
      };
    }
  });

  return diff;
}

// HOC for automatic monitoring
export const withMonitoring = (WrappedComponent, options = {}) => {
  const MonitoredComponent = (props) => {
    const componentName = options.componentName || WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const monitoring = useMonitoring(componentName, {
      ...options,
      props
    });

    return <WrappedComponent {...props} monitoring={monitoring} />;
  };

  MonitoredComponent.displayName = `withMonitoring(${WrappedComponent.displayName || WrappedComponent.name})`;

  return MonitoredComponent;
};

// Hook for API monitoring
export const useApiMonitoring = (componentName) => {
  const { trackApiCall, trackCustomMetric, handleError } = useMonitoring(componentName);

  const makeApiCall = useCallback(async (url, options = {}) => {
    const apiName = options.apiName || new URL(url, window.location.origin).pathname;
    const startTime = performance.now();

    try {
      trackCustomMetric('api_call_start', 1, { url: apiName });

      const response = await trackApiCall(() => fetch(url, options), apiName);

      const duration = performance.now() - startTime;

      trackCustomMetric('api_call_success', 1, {
        url: apiName,
        status: response.status,
        duration
      });

      trackCustomMetric('api_response_time', duration, { url: apiName });

      // Check for slow responses
      if (duration > 2000) {
        handleError(new Error(`Slow API response: ${apiName} took ${duration.toFixed(2)}ms`), {
          componentName,
          url: apiName,
          duration,
          type: 'performance_warning'
        });
      }

      return response;
    } catch (error) {
      const duration = performance.now() - startTime;

      trackCustomMetric('api_call_error', 1, {
        url: apiName,
        error: error.message,
        duration
      });

      handleError(error, {
        componentName,
        url: apiName,
        duration,
        type: 'api_error'
      });

      throw error;
    }
  }, [componentName, trackApiCall, trackCustomMetric, handleError]);

  return { makeApiCall };
};

export default useMonitoring;