/**
 * Monitoring System Test Suite
 * Cin7 Core Platform - Test and Verify Error Monitoring System
 */

import errorMonitor from '../services/ErrorMonitor';
import performanceLogger from '../utils/PerformanceLogger';
import devConsole from '../services/DevConsole';

// Test suite for the monitoring system
export const runMonitoringTests = () => {
  console.group('🧪 Running Monitoring System Tests');

  const tests = [
    testErrorMonitor,
    testPerformanceLogger,
    testDevConsole,
    testErrorBoundary,
    testIntegration
  ];

  const results = tests.map(test => {
    try {
      const result = test();
      console.log(`✅ ${test.name}: ${result ? 'PASSED' : 'FAILED'}`);
      return { name: test.name, passed: result };
    } catch (error) {
      console.error(`❌ ${test.name}: FAILED - ${error.message}`);
      return { name: test.name, passed: false, error: error.message };
    }
  });

  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;

  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    console.log('🎉 All monitoring system tests passed!');
  } else {
    console.warn('⚠️ Some tests failed. Check the implementation.');
  }

  console.groupEnd();

  return results;
};

// Test Error Monitor functionality
const testErrorMonitor = () => {
  console.log('Testing Error Monitor...');

  // Test JavaScript error capture
  try {
    const testError = new Error('Test error for monitoring');
    errorMonitor.captureJavaScriptError({
      message: testError.message,
      name: testError.name,
      stack: testError.stack,
      filename: 'test.js',
      lineno: 1,
      colno: 1
    });

    const errors = errorMonitor.getErrors();
    if (errors.length === 0) throw new Error('Error not captured');
  } catch (error) {
    console.error('Error Monitor test failed:', error);
    return false;
  }

  // Test network error capture
  try {
    errorMonitor.captureNetworkError({
      url: 'https://api.test.com/error',
      method: 'GET',
      error: 'Network timeout',
      status: 500,
      duration: 5000
    });

    const errors = errorMonitor.getErrors();
    const networkError = errors.find(e => e.type === 'network');
    if (!networkError) throw new Error('Network error not captured');
  } catch (error) {
    console.error('Network error test failed:', error);
    return false;
  }

  // Test logging functionality
  try {
    errorMonitor.log('info', 'Test log message', { test: true });
    errorMonitor.logMetric('test_metric', 100, { unit: 'ms' });

    const logs = errorMonitor.getLogs();
    const testLog = logs.find(l => l.message === 'Test log message');
    if (!testLog) throw new Error('Log not captured');
  } catch (error) {
    console.error('Logging test failed:', error);
    return false;
  }

  // Test report generation
  try {
    const report = errorMonitor.generateReport();
    if (!report.sessionInfo || !report.environment) {
      throw new Error('Report generation failed');
    }
  } catch (error) {
    console.error('Report generation test failed:', error);
    return false;
  }

  console.log('✅ Error Monitor tests passed');
  return true;
};

// Test Performance Logger functionality
const testPerformanceLogger = () => {
  console.log('Testing Performance Logger...');

  // Test measurement functionality
  try {
    performanceLogger.startMeasure('test_operation');
    setTimeout(() => {
      const result = performanceLogger.endMeasure('test_operation');
      if (!result || result.duration <= 0) {
        throw new Error('Measurement failed');
      }
    }, 10);

    // Test immediate measurement
    performanceLogger.startMeasure('sync_test');
    const syncResult = performanceLogger.endMeasure('sync_test');
    if (!syncResult || syncResult.duration < 0) {
      throw new Error('Sync measurement failed');
    }
  } catch (error) {
    console.error('Performance measurement test failed:', error);
    return false;
  }

  // Test function measurement
  try {
    const testFunction = () => 'test result';
    const measuredResult = performanceLogger.measureFunction('test_function', testFunction);
    if (measuredResult !== 'test result') {
      throw new Error('Function measurement failed');
    }
  } catch (error) {
    console.error('Function measurement test failed:', error);
    return false;
  }

  // Test metric recording
  try {
    performanceLogger.recordMetric('test_custom_metric', 42, {
      component: 'TestComponent',
      type: 'custom'
    });

    const metrics = performanceLogger.getAllComponentMetrics();
    if (Object.keys(metrics).length === 0) {
      throw new Error('Metric recording failed');
    }
  } catch (error) {
    console.error('Metric recording test failed:', error);
    return false;
  }

  // Test performance report
  try {
    const report = performanceLogger.generatePerformanceReport();
    if (!report.summary || !report.timestamp) {
      throw new Error('Performance report generation failed');
    }
  } catch (error) {
    console.error('Performance report test failed:', error);
    return false;
  }

  console.log('✅ Performance Logger tests passed');
  return true;
};

// Test Dev Console functionality
const testDevConsole = () => {
  console.log('Testing Dev Console...');

  // Test console initialization
  try {
    devConsole.initialize();
    if (!devConsole.isInitialized) {
      throw new Error('Dev Console initialization failed');
    }
  } catch (error) {
    console.error('Dev Console initialization test failed:', error);
    return false;
  }

  // Test command registration and execution
  try {
    const testCommand = () => 'Test command executed';
    devConsole.registerCommand('testcmd', testCommand, 'Test command');

    const commandExists = devConsole.commands.has('testcmd');
    if (!commandExists) {
      throw new Error('Command registration failed');
    }
  } catch (error) {
    console.error('Command registration test failed:', error);
    return false;
  }

  // Test logging
  try {
    devConsole.log('info', 'Test console message', { test: true });

    const filteredHistory = devConsole.getFilteredHistory();
    const testMessage = filteredHistory.find(h => h.message.includes('Test console message'));
    if (!testMessage) {
      throw new Error('Console logging failed');
    }
  } catch (error) {
    console.error('Console logging test failed:', error);
    return false;
  }

  // Test filters
  try {
    devConsole.setFilter('level=error');
    const errorFiltered = devConsole.getFilteredHistory();

    devConsole.setFilter('level=all');
    const allFiltered = devConsole.getFilteredHistory();

    if (errorFiltered.length > allFiltered.length) {
      throw new Error('Filter functionality failed');
    }
  } catch (error) {
    console.error('Filter test failed:', error);
    return false;
  }

  console.log('✅ Dev Console tests passed');
  return true;
};

// Test Error Boundary functionality
const testErrorBoundary = () => {
  console.log('Testing Error Boundary...');

  try {
    // Import and test ErrorBoundary
    const { ErrorBoundary, useErrorHandler } = require('../components/ErrorBoundary');

    // Test HOC
    const TestComponent = () => null;
    const WrappedComponent = require('../components/ErrorBoundary').withErrorBoundary(TestComponent);
    if (!WrappedComponent) {
      throw new Error('Error Boundary HOC failed');
    }

    // Test hook (this would need to be used in a React component)
    console.log('Error Boundary components imported successfully');

    console.log('✅ Error Boundary tests passed');
    return true;
  } catch (error) {
    console.error('Error Boundary test failed:', error);
    return false;
  }
};

// Test integration between components
const testIntegration = () => {
  console.log('Testing Integration...');

  try {
    // Test that components work together
    errorMonitor.log('info', 'Integration test started');

    performanceLogger.startMeasure('integration_test');
    errorMonitor.logMetric('integration_metric', 123, {
      component: 'IntegrationTest',
      source: 'integration'
    });

    const result = performanceLogger.endMeasure('integration_test');
    if (!result) {
      throw new Error('Integration measurement failed');
    }

    // Test that data flows between systems
    const errors = errorMonitor.getErrors();
    const logs = errorMonitor.getLogs();
    const metrics = performanceLogger.getAllComponentMetrics();

    if (errors === undefined || logs === undefined || metrics === undefined) {
      throw new Error('Data integration failed');
    }

    console.log('✅ Integration tests passed');
    return true;
  } catch (error) {
    console.error('Integration test failed:', error);
    return false;
  }
};

// Test performance impact
export const testPerformanceImpact = () => {
  console.group('🔍 Testing Performance Impact');

  const iterations = 1000;
  const startTime = performance.now();

  // Simulate typical usage
  for (let i = 0; i < iterations; i++) {
    errorMonitor.log('debug', `Test log ${i}`);
    performanceLogger.startMeasure(`test_${i}`);
    performanceLogger.endMeasure(`test_${i}`);
    performanceLogger.recordMetric(`metric_${i}`, Math.random() * 100);
  }

  const endTime = performance.now();
  const duration = endTime - startTime;
  const avgTime = duration / iterations;

  console.log(`📊 Performance Impact Results:`);
  console.log(`  Total Duration: ${duration.toFixed(2)}ms`);
  console.log(`  Average per operation: ${avgTime.toFixed(4)}ms`);
  console.log(`  Operations per second: ${(1000 / avgTime).toFixed(0)}`);

  if (avgTime < 1) {
    console.log('✅ Performance impact is acceptable (< 1ms per operation)');
  } else {
    console.warn('⚠️ Performance impact may be high (> 1ms per operation)');
  }

  console.groupEnd();

  return {
    totalDuration: duration,
    averageTime: avgTime,
    operationsPerSecond: 1000 / avgTime
  };
};

// Test memory usage
export const testMemoryUsage = () => {
  console.group('💾 Testing Memory Usage');

  if (!performance.memory) {
    console.warn('Memory API not available - skipping memory test');
    console.groupEnd();
    return null;
  }

  const initialMemory = performance.memory.usedJSHeapSize;

  // Generate some data
  for (let i = 0; i < 100; i++) {
    errorMonitor.log('info', `Memory test log ${i}`);
    errorMonitor.logMetric(`memory_test_${i}`, Math.random() * 1000);
    performanceLogger.recordMetric(`memory_metric_${i}`, Math.random() * 1000);
  }

  // Force garbage collection if available
  if (window.gc) {
    window.gc();
  }

  setTimeout(() => {
    const finalMemory = performance.memory.usedJSHeapSize;
    const memoryIncrease = finalMemory - initialMemory;

    console.log(`📊 Memory Usage Results:`);
    console.log(`  Initial Memory: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Final Memory: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Memory Increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`);

    if (memoryIncrease < 1024 * 1024) { // Less than 1MB
      console.log('✅ Memory usage is acceptable (< 1MB increase)');
    } else {
      console.warn('⚠️ Memory usage may be high (> 1MB increase)');
    }

    console.groupEnd();
  }, 1000);

  return {
    initialMemory,
    finalMemory: performance.memory.usedJSHeapSize
  };
};

// Export test runner function
export const runAllTests = () => {
  console.log('🚀 Starting Comprehensive Monitoring System Tests\n');

  const testResults = runMonitoringTests();
  const performanceResults = testPerformanceImpact();
  const memoryResults = testMemoryUsage();

  const summary = {
    tests: testResults,
    performance: performanceResults,
    memory: memoryResults,
    timestamp: new Date().toISOString()
  };

  console.log('\n📋 Test Summary:');
  console.log('Test completed! Check the browser console for detailed results.');

  return summary;
};

// Auto-run tests in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment to auto-run tests in development
  // setTimeout(() => runAllTests(), 2000);
}

export default runAllTests;