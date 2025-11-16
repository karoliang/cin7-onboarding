/**
 * TypeScript interfaces for error monitoring and performance tracking
 * Cin7 Core Platform Error Monitoring System
 */

export interface ErrorSeverity {
  LOW: 'low';
  MEDIUM: 'medium';
  HIGH: 'high';
  CRITICAL: 'critical';
}

export interface ErrorCategory {
  JAVASCRIPT: 'javascript';
  NETWORK: 'network';
  COMPONENT: 'component';
  PERFORMANCE: 'performance';
  USER_ACTION: 'user_action';
  SYSTEM: 'system';
}

export interface ErrorLocation {
  file: string;
  line: number;
  column: number;
  function: string;
  component: string;
  route: string;
}

export interface ErrorContext {
  userAgent: string;
  url: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  buildVersion: string;
  environment: 'development' | 'staging' | 'production';
  deviceInfo: {
    screen: string;
    viewport: string;
    platform: string;
  };
  memoryInfo?: {
    used: number;
    total: number;
    limit: number;
  };
}

export interface BaseError {
  id: string;
  message: string;
  name: string;
  stack?: string;
  severity: ErrorSeverity[keyof ErrorSeverity];
  category: ErrorCategory[keyof ErrorCategory];
  location: ErrorLocation;
  context: ErrorContext;
  occurrences: number;
  firstSeen: number;
  lastSeen: number;
  resolved: boolean;
  tags: string[];
  metadata: Record<string, any>;
}

export interface JavaScriptError extends BaseError {
  type: 'javascript';
  source: 'uncaught' | 'promise' | 'custom';
  originalError?: Error;
}

export interface NetworkError extends BaseError {
  type: 'network';
  url: string;
  method: string;
  statusCode?: number;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
  requestBody?: any;
  responseBody?: any;
  timeout?: boolean;
  retryCount?: number;
}

export interface ComponentError extends BaseError {
  type: 'component';
  componentName: string;
  props: Record<string, any>;
  state?: Record<string, any>;
  hookName?: string;
  lifecyclePhase?: 'mount' | 'update' | 'unmount' | 'render';
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count' | 'percentage';
  timestamp: number;
  category: 'navigation' | 'render' | 'interaction' | 'network' | 'memory';
  context: {
    route: string;
    component?: string;
    action?: string;
  };
  threshold?: {
    warning: number;
    critical: number;
  };
}

export interface UserInteraction {
  id: string;
  type: 'click' | 'scroll' | 'keypress' | 'form_submit' | 'navigation';
  element: string;
  timestamp: number;
  duration?: number;
  route: string;
  metadata: Record<string, any>;
}

export interface ErrorReport {
  errors: BaseError[];
  metrics: PerformanceMetric[];
  interactions: UserInteraction[];
  sessionInfo: {
    id: string;
    startTime: number;
    duration: number;
    pageViews: number;
    errors: number;
  };
  environment: ErrorContext;
  generatedAt: number;
}

export interface MonitoringConfig {
  enabled: boolean;
  environment: 'development' | 'staging' | 'production';
  debugMode: boolean;
  maxErrors: number;
  maxMetrics: number;
  reportingInterval: number;
  endpoint?: string;
  apiKey?: string;
  thresholds: {
    errorRate: number;
    responseTime: number;
    memoryUsage: number;
    renderTime: number;
  };
  filters: {
    ignoreErrors: string[];
    ignoreUrls: string[];
    ignoreComponents: string[];
    logLevels: ('debug' | 'info' | 'warn' | 'error')[];
  };
}

export interface LogLevel {
  DEBUG: 'debug';
  INFO: 'info';
  WARN: 'warn';
  ERROR: 'error';
}

export interface LogEntry {
  id: string;
  level: LogLevel[keyof LogLevel];
  message: string;
  timestamp: number;
  context: Record<string, any>;
  source: string;
  tags: string[];
}