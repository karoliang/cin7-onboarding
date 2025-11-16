/**
 * Error Reporting Dashboard Component
 * Cin7 Core Platform - Error Analysis and Reporting Interface
 */

import React, { useState, useEffect } from 'react';
import {
  Card,
  PageLayout,
  Text,
  Button,
  Badge,
  DataTable,
  Grid,
  InlineStack,
  BlockStack,
  Tabs,
  Select,
  TextField,
  ButtonGroup,
  Icon,
  Banner
} from '@shopify/polaris';
import {
  RefreshMajor,
  DownloadMajor,
  FilterMajor,
  SortMajor,
  AlertMajor,
  CheckCircleMajor,
  WarningMajor,
  InfoMinor,
  DeleteMinor
} from '@shopify/polaris-icons';
import errorMonitor from '../services/ErrorMonitor';
import performanceLogger from '../utils/PerformanceLogger';
import devConsole from '../services/DevConsole';

const ErrorDashboard = () => {
  const [errors, setErrors] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [filters, setFilters] = useState({
    severity: 'all',
    category: 'all',
    dateRange: '24h',
    search: ''
  });
  const [sortField, setSortField] = useState('lastSeen');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [filters, sortField, sortDirection]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const allErrors = errorMonitor.getErrors();
      const allMetrics = performanceLogger.getAllComponentMetrics();
      const allLogs = errorMonitor.getLogs();

      setErrors(filterAndSortErrors(allErrors));
      setMetrics(Object.entries(allMetrics).map(([name, data]) => ({ name, ...data })));
      setLogs(allLogs.slice(-100)); // Last 100 logs
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortErrors = (errorList) => {
    let filtered = [...errorList];

    // Apply filters
    if (filters.severity !== 'all') {
      filtered = filtered.filter(error => error.severity === filters.severity.toUpperCase());
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(error => error.category === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(error =>
        error.message.toLowerCase().includes(searchLower) ||
        error.location.component.toLowerCase().includes(searchLower)
      );
    }

    // Date range filter
    const now = Date.now();
    const ranges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };

    if (filters.dateRange !== 'all') {
      const rangeMs = ranges[filters.dateRange];
      filtered = filtered.filter(error => now - error.lastSeen <= rangeMs);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'lastSeen' || sortField === 'firstSeen') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const getErrorStats = () => {
    const total = errors.length;
    const critical = errors.filter(e => e.severity === 'CRITICAL').length;
    const high = errors.filter(e => e.severity === 'HIGH').length;
    const medium = errors.filter(e => e.severity === 'MEDIUM').length;
    const low = errors.filter(e => e.severity === 'LOW').length;

    const today = errors.filter(e => {
      const today = new Date().toDateString();
      return new Date(e.lastSeen).toDateString() === today;
    }).length;

    return { total, critical, high, medium, low, today };
  };

  const getPerformanceStats = () => {
    if (metrics.length === 0) return { avgRenderTime: 0, slowComponents: 0, totalComponents: 0 };

    const avgRenderTime = metrics.reduce((sum, m) => sum + (m.averageRenderTime || 0), 0) / metrics.length;
    const slowComponents = metrics.filter(m => (m.averageRenderTime || 0) > 50).length;

    return {
      avgRenderTime: avgRenderTime.toFixed(2),
      slowComponents,
      totalComponents: metrics.length
    };
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      errors: errors,
      metrics: metrics,
      logs: logs,
      stats: {
        errors: getErrorStats(),
        performance: getPerformanceStats()
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all error and performance data?')) {
      errorMonitor.clear();
      setErrors([]);
      setMetrics([]);
      setLogs([]);
    }
  };

  const markErrorAsResolved = (errorId) => {
    // This would typically update your backend
    console.log('Mark error as resolved:', errorId);
  };

  const deleteError = (errorId) => {
    setErrors(prev => prev.filter(e => e.id !== errorId));
  };

  const errorStats = getErrorStats();
  const performanceStats = getPerformanceStats();

  const errorTableRows = errors.map(error => [
    <InlineStack gap="200">
      <Badge
        status={
          error.severity === 'CRITICAL' ? 'critical' :
          error.severity === 'HIGH' ? 'warning' :
          error.severity === 'MEDIUM' ? 'attention' :
          'info'
        }
      >
        {error.severity}
      </Badge>
      <Text variant="bodySm" as="span">{error.type}</Text>
    </InlineStack>,
    error.message.length > 100 ? `${error.message.substring(0, 100)}...` : error.message,
    error.location.component || 'Unknown',
    new Date(error.lastSeen).toLocaleString(),
    error.occurrences,
    <InlineStack gap="200">
      <Button size="micro" onClick={() => markErrorAsResolved(error.id)}>
        Resolve
      </Button>
      <Button size="micro" icon={DeleteMinor} onClick={() => deleteError(error.id)} />
    </InlineStack>
  ]);

  const metricTableRows = metrics.map(metric => [
    metric.name,
    `${metric.averageRenderTime?.toFixed(2) || 0}ms`,
    metric.renderCount || 0,
    `${((metric.memoryUsage || 0) / 1024 / 1024).toFixed(2)}MB`,
    <Badge
      status={metric.averageRenderTime > 50 ? 'warning' : 'success'}
      tone={metric.averageRenderTime > 50 ? 'warning' : 'success'}
    >
      {metric.averageRenderTime > 50 ? 'Slow' : 'Good'}
    </Badge>
  ]);

  const tabs = [
    { id: 'overview', content: 'Overview', panel: 'overview' },
    { id: 'errors', content: `Errors (${errorStats.total})`, panel: 'errors' },
    { id: 'performance', content: 'Performance', panel: 'performance' },
    { id: 'logs', content: 'Logs', panel: 'logs' }
  ];

  const renderOverview = () => (
    <Grid>
      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4 }}>
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">Error Summary</Text>
            <InlineStack gap="400">
              <BlockStack gap="100">
                <Text color="subdued">Total</Text>
                <Text variant="headingLg">{errorStats.total}</Text>
              </BlockStack>
              <BlockStack gap="100">
                <Text color="subdued">Today</Text>
                <Text variant="headingLg">{errorStats.today}</Text>
              </BlockStack>
              <BlockStack gap="100">
                <Text color="subdued">Critical</Text>
                <Badge status="critical">{errorStats.critical}</Badge>
              </BlockStack>
            </InlineStack>
            <InlineStack gap="200">
              <Badge status="warning">{errorStats.high} High</Badge>
              <Badge status="attention">{errorStats.medium} Medium</Badge>
              <Badge status="info">{errorStats.low} Low</Badge>
            </InlineStack>
          </BlockStack>
        </Card>
      </Grid.Cell>

      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4 }}>
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">Performance Summary</Text>
            <BlockStack gap="300">
              <InlineStack gap="400">
                <BlockStack gap="100">
                  <Text color="subdued">Avg Render Time</Text>
                  <Text variant="headingLg">{performanceStats.avgRenderTime}ms</Text>
                </BlockStack>
                <BlockStack gap="100">
                  <Text color="subdued">Total Components</Text>
                  <Text variant="headingLg">{performanceStats.totalComponents}</Text>
                </BlockStack>
              </InlineStack>
              <InlineStack gap="200">
                <Badge status={performanceStats.slowComponents > 0 ? 'warning' : 'success'}>
                  {performanceStats.slowComponents} Slow Components
                </Badge>
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid.Cell>

      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4 }}>
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">System Status</Text>
            <BlockStack gap="300">
              <InlineStack gap="200">
                <Icon source={CheckCircleMajor} color="success" />
                <Text>Error Monitor: Active</Text>
              </InlineStack>
              <InlineStack gap="200">
                <Icon source={CheckCircleMajor} color="success" />
                <Text>Performance Logger: Active</Text>
              </InlineStack>
              <InlineStack gap="200">
                <Icon source={CheckCircleMajor} color="success" />
                <Text>Dev Console: Available</Text>
              </InlineStack>
              <InlineStack gap="200">
                <Badge status="info">Environment: {process.env.NODE_ENV}</Badge>
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid.Cell>
    </Grid>
  );

  const renderErrors = () => (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="200" align="space-between">
          <Text as="h2" variant="headingMd">Error Log</Text>
          <InlineStack gap="200">
            <Button icon={RefreshMajor} onClick={loadData} loading={isLoading}>
              Refresh
            </Button>
            <Button icon={DownloadMajor} onClick={exportReport}>
              Export
            </Button>
          </InlineStack>
        </InlineStack>

        <InlineStack gap="200">
          <Select
            label="Severity"
            options={[
              { label: 'All', value: 'all' },
              { label: 'Critical', value: 'critical' },
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' }
            ]}
            value={filters.severity}
            onChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}
          />
          <Select
            label="Category"
            options={[
              { label: 'All', value: 'all' },
              { label: 'JavaScript', value: 'JAVASCRIPT' },
              { label: 'Network', value: 'NETWORK' },
              { label: 'Component', value: 'COMPONENT' },
              { label: 'Performance', value: 'PERFORMANCE' }
            ]}
            value={filters.category}
            onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
          />
          <Select
            label="Date Range"
            options={[
              { label: 'All', value: 'all' },
              { label: 'Last Hour', value: '1h' },
              { label: 'Last 24 Hours', value: '24h' },
              { label: 'Last 7 Days', value: '7d' },
              { label: 'Last 30 Days', value: '30d' }
            ]}
            value={filters.dateRange}
            onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
          />
          <TextField
            placeholder="Search errors..."
            value={filters.search}
            onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
            connectedLeft={<FilterMajor />}
          />
        </InlineStack>

        <DataTable
          columnContentTypes={['text', 'text', 'text', 'text', 'numeric', 'text']}
          headings={['Type', 'Message', 'Component', 'Last Seen', 'Occurrences', 'Actions']}
          rows={errorTableRows}
          sortable={[false, false, false, true, true, false]}
          onSort={(sort) => {
            setSortField(sort.sortKey);
            setSortDirection(sort.sortDirection);
          }}
        />
      </BlockStack>
    </Card>
  );

  const renderPerformance = () => (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="200" align="space-between">
          <Text as="h2" variant="headingMd">Component Performance</Text>
          <InlineStack gap="200">
            <Button icon={RefreshMajor} onClick={loadData} loading={isLoading}>
              Refresh
            </Button>
            <Button icon={DownloadMajor} onClick={exportReport}>
              Export Report
            </Button>
          </InlineStack>
        </InlineStack>

        <DataTable
          columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'text']}
          headings={['Component', 'Avg Render Time', 'Render Count', 'Memory Usage', 'Status']}
          rows={metricTableRows}
          sortable={[false, true, true, false, false]}
        />
      </BlockStack>
    </Card>
  );

  const renderLogs = () => (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Recent Logs</Text>
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          {logs.length === 0 ? (
            <Text color="subdued">No logs available</Text>
          ) : (
            logs.map(log => (
              <div key={log.id} style={{
                padding: '4px 8px',
                marginBottom: '2px',
                backgroundColor: log.level === 'ERROR' ? '#fef2f2' :
                                log.level === 'WARN' ? '#fffbeb' :
                                log.level === 'INFO' ? '#f0f9ff' : 'transparent',
                borderRadius: '2px'
              }}>
                <InlineStack gap="200" wrap={false}>
                  <Text color="subdued" as="span">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </Text>
                  <Badge
                    status={
                      log.level === 'ERROR' ? 'critical' :
                      log.level === 'WARN' ? 'warning' :
                      log.level === 'INFO' ? 'info' : 'subdued'
                    }
                    size="small"
                  >
                    {log.level}
                  </Badge>
                  <Text as="span">{log.message}</Text>
                </InlineStack>
              </div>
            ))
          )}
        </div>
      </BlockStack>
    </Card>
  );

  return (
    <PageLayout
      title="Error & Performance Dashboard"
      subtitle="Monitor and analyze application errors and performance metrics"
    >
      <BlockStack gap="400">
        {errorStats.critical > 0 && (
          <Banner
            title="Critical errors detected"
            status="critical"
            action={{
              content: 'View Errors',
              onAction: () => setSelectedTab(1)
            }}
          >
            You have {errorStats.critical} critical errors that need immediate attention.
          </Banner>
        )}

        <div style={{ marginBottom: '16px' }}>
          <InlineStack gap="200" align="end">
            <ButtonGroup>
              <Button icon={RefreshMajor} onClick={loadData} loading={isLoading}>
                Refresh Data
              </Button>
              <Button icon={DownloadMajor} onClick={exportReport}>
                Export Report
              </Button>
              <Button icon={DeleteMinor} onClick={clearAllData} tone="critical">
                Clear All Data
              </Button>
            </ButtonGroup>
          </InlineStack>
        </div>

        <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
          <div style={{ marginTop: '16px' }}>
            {selectedTab === 0 && renderOverview()}
            {selectedTab === 1 && renderErrors()}
            {selectedTab === 2 && renderPerformance()}
            {selectedTab === 3 && renderLogs()}
          </div>
        </Tabs>
      </BlockStack>
    </PageLayout>
  );
};

export default ErrorDashboard;