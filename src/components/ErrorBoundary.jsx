/**
 * React Error Boundary Component
 * Cin7 Core Platform - Component Error Handling and Recovery
 */

import React, { Component } from 'react';
import { Card, PageLayout, Text, Button, Banner, InlineStack, BlockStack } from '@shopify/polaris';
import { ViewIcon, RefreshIcon, HomeIcon } from '@shopify/polaris-icons';
import errorMonitor from '../services/ErrorMonitor';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      retryLimit: props.retryLimit || 3
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    const errorId = errorMonitor.generateId();

    // Capture component-specific error
    errorMonitor.captureComponentError(error, {
      name: this.props.componentName || this.getComponentDisplayName(),
      props: this.props,
      state: this.state,
      functionName: 'componentDidCatch',
      lifecyclePhase: 'render',
      fileName: this.getFileName(),
      errorInfo
    });

    this.setState({
      errorInfo,
      errorId
    });

    // Log additional error details
    errorMonitor.log('error', `Component error in ${this.props.componentName || 'Unknown Component'}`, {
      errorId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo, errorId);
    }

    // In development, expose more details to the console
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔥 Error Boundary - ${this.props.componentName || 'Component'}`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Props:', this.props);
      console.groupEnd();
    }
  }

  getComponentDisplayName() {
    return this.props.displayName ||
           this.props.componentName ||
           this.constructor.name ||
           'Unknown Component';
  }

  getFileName() {
    // Try to extract filename from stack trace or component name
    if (this.state.errorInfo?.componentStack) {
      const stackLines = this.state.errorInfo.componentStack.split('\n');
      const componentLine = stackLines.find(line =>
        line.includes(this.getComponentDisplayName())
      );

      if (componentLine) {
        const match = componentLine.match(/\.jsx?:\d+:\d+/);
        return match ? match[0] : 'unknown';
      }
    }

    return 'unknown';
  }

  handleRetry = () => {
    const { retryCount, retryLimit } = this.state;

    if (retryCount < retryLimit) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
        retryCount: prevState.retryCount + 1
      }));

      errorMonitor.log('info', `Retrying component after error`, {
        component: this.getComponentDisplayName(),
        retryCount: retryCount + 1,
        retryLimit
      });
    } else {
      errorMonitor.log('error', `Retry limit exceeded for component`, {
        component: this.getComponentDisplayName(),
        retryCount,
        retryLimit
      });
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  handleViewDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  renderErrorUI() {
    const { error, errorInfo, errorId, retryCount, retryLimit, showDetails: showDetailsState } = this.state;
    const {
      fallback,
      showRetry = true,
      showReload = true,
      showGoHome = true,
      showDetails: showDetailsProp = true
    } = this.props;

    const showDetails = showDetailsState && showDetailsProp;

    // If custom fallback is provided, use it
    if (fallback) {
      return typeof fallback === 'function'
        ? fallback({ error, errorInfo, errorId, retry: this.handleRetry })
        : fallback;
    }

    const canRetry = retryCount < retryLimit;
    const retryAttempts = `${retryCount}/${retryLimit}`;

    return (
      <PageLayout>
        <div style={{ padding: '2rem' }}>
          <Card>
            <BlockStack gap="400">
              <Banner
                title="Something went wrong"
                tone="critical"
                action={{
                  content: 'Try again',
                  onAction: this.handleRetry,
                  disabled: !canRetry
                }}
                secondaryAction={{
                  content: 'Reload page',
                  onAction: this.handleReload
                }}
              >
                <Text as="p">
                  {this.props.errorMessage ||
                   `An error occurred in the ${this.getComponentDisplayName()} component. ${!canRetry ? 'Maximum retry attempts reached.' : 'You can try again or reload the page.'}`}
                </Text>
                {retryCount > 0 && (
                  <Text as="p" tone="subdued">
                    Retry attempts: {retryAttempts}
                  </Text>
                )}
              </Banner>

              {process.env.NODE_ENV === 'development' && showDetails && (
                <Card sectioned>
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Error Details (Development Mode)</Text>

                    {errorId && (
                      <Text as="p">
                        <strong>Error ID:</strong> {errorId}
                      </Text>
                    )}

                    {error && (
                      <BlockStack gap="100">
                        <Text as="p"><strong>Error:</strong> {error.message}</Text>
                        {error.stack && (
                          <details>
                            <summary>Stack Trace</summary>
                            <pre style={{
                              fontSize: '12px',
                              background: '#f6f6f7',
                              padding: '8px',
                              overflow: 'auto',
                              maxHeight: '200px'
                            }}>
                              {error.stack}
                            </pre>
                          </details>
                        )}
                      </BlockStack>
                    )}

                    {errorInfo && (
                      <details>
                        <summary>Component Stack</summary>
                        <pre style={{
                          fontSize: '12px',
                          background: '#f6f6f7',
                          padding: '8px',
                          overflow: 'auto',
                          maxHeight: '200px'
                        }}>
                          {errorInfo.componentStack}
                        </pre>
                      </details>
                    )}

                    <details>
                      <summary>Component Props</summary>
                      <pre style={{
                        fontSize: '12px',
                        background: '#f6f6f7',
                        padding: '8px',
                        overflow: 'auto',
                        maxHeight: '200px'
                      }}>
                        {JSON.stringify(this.props, null, 2)}
                      </pre>
                    </details>
                  </BlockStack>
                </Card>
              )}

              <InlineStack gap="200">
                {showRetry && canRetry && (
                  <Button
                    icon={RefreshIcon}
                    onClick={this.handleRetry}
                    variant="primary"
                  >
                    Try Again
                  </Button>
                )}

                {showReload && (
                  <Button
                    icon={RefreshIcon}
                    onClick={this.handleReload}
                  >
                    Reload Page
                  </Button>
                )}

                {showGoHome && (
                  <Button
                    icon={HomeIcon}
                    onClick={this.handleGoHome}
                    variant="plain"
                  >
                    Go Home
                  </Button>
                )}

                {process.env.NODE_ENV === 'development' && (
                  <Button
                    icon={ViewIcon}
                    onClick={this.handleViewDetails}
                    variant="plain"
                  >
                    {showDetails ? 'Hide' : 'Show'} Details
                  </Button>
                )}
              </InlineStack>
            </BlockStack>
          </Card>
        </div>
      </PageLayout>
    );
  }

  render() {
    const { hasError } = this.state;
    const { children, renderOnError } = this.props;

    if (hasError) {
      return renderOnError ? renderOnError(this.state, this) : this.renderErrorUI();
    }

    return children;
  }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = (WrappedComponent, options = {}) => {
  const WrappedWithErrorBoundary = (props) => (
    <ErrorBoundary
      componentName={WrappedComponent.displayName || WrappedComponent.name}
      {...options}
    >
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WrappedWithErrorBoundary.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WrappedWithErrorBoundary;
};

// Hook for programmatic error handling
export const useErrorHandler = () => {
  const handleError = React.useCallback((error, errorInfo = {}) => {
    errorMonitor.captureComponentError(error, {
      name: errorInfo.componentName || 'Hook Component',
      props: errorInfo.props || {},
      state: errorInfo.state || {},
      functionName: errorInfo.functionName || 'useErrorHandler',
      lifecyclePhase: 'custom',
      hookName: errorInfo.hookName
    });

    // Log the error
    errorMonitor.log('error', 'Error handled via useErrorHandler', {
      error: error.message,
      stack: error.stack,
      ...errorInfo
    });
  }, []);

  const captureError = React.useCallback((message, details = {}) => {
    const error = new Error(message);
    errorMonitor.captureComponentError(error, {
      name: details.componentName || 'Hook Component',
      props: details.props || {},
      functionName: details.functionName || 'useErrorHandler',
      lifecyclePhase: 'custom',
      metadata: details
    });
  }, []);

  return { handleError, captureError };
};

export default ErrorBoundary;