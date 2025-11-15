import * as React from 'react';
import { Component, ErrorInfo, ReactNode } from 'react';
import { 
  MessageBar, 
  MessageBarType, 
  DefaultButton, 
  PrimaryButton, 
  Stack, 
  Text,
  Icon
} from '@fluentui/react';
import styles from './GroupMembers.module.scss';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'component' | 'page' | 'critical';
  context?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | undefined;
  errorInfo: ErrorInfo | undefined;
  retryCount: number;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private readonly maxRetries = 3;
  private retryTimeout: number | undefined = undefined;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: 0
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { onError, context } = this.props;
    
    // Enhanced error logging
    console.group(`🚨 Error Boundary Caught Error${context ? ` in ${context}` : ''}`);
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error Stack:', error.stack);
    console.groupEnd();

    // Store error info in state
    this.setState({
      errorInfo
    });

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // Report to monitoring service (if available)
    this.reportError(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: ErrorInfo): void => {
    const { level = 'component', context } = this.props;
    
    // Create structured error report
    const errorReport = {
      timestamp: new Date().toISOString(),
      level,
      context: context || 'Unknown',
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      retryCount: this.state.retryCount
    };

    // Store in session storage for debugging
    try {
      const existingErrors = sessionStorage.getItem('spfx-error-reports');
      const errors = existingErrors ? JSON.parse(existingErrors) : [];
      errors.push(errorReport);
      
      // Keep only last 10 errors to prevent storage bloat
      if (errors.length > 10) {
        errors.splice(0, errors.length - 10);
      }
      
      sessionStorage.setItem('spfx-error-reports', JSON.stringify(errors));
    } catch (storageError) {
      console.warn('Failed to store error report:', storageError);
    }
  };

  private handleRetry = (): void => {
    const { retryCount } = this.state;
    
    if (retryCount < this.maxRetries) {
      // Clear error state and increment retry count
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: retryCount + 1
      });

      // Delay retry to allow for transient issues to resolve
      this.retryTimeout = window.setTimeout(() => {
        // Force re-render by updating a dummy state
        this.forceUpdate();
      }, Math.pow(2, retryCount) * 1000); // Exponential backoff: 1s, 2s, 4s
    }
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleReport = (): void => {
    const { error, errorInfo } = this.state;
    const { context } = this.props;
    
    if (error) {
      // Create a detailed error report for support
      const report = {
        timestamp: new Date().toISOString(),
        context: context || 'GroupMembers WebPart',
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name
        },
        componentStack: errorInfo?.componentStack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        retryAttempts: this.state.retryCount
      };

      // Copy to clipboard for easy reporting
      navigator.clipboard.writeText(JSON.stringify(report, undefined, 2))
        .then(() => {
          alert('Error report copied to clipboard. Please provide this to your administrator.');
        })
        .catch(() => {
          // Fallback: show in a prompt for manual copy
          prompt('Copy this error report:', JSON.stringify(report, undefined, 2));
        });
    }
  };

  public componentWillUnmount(): void {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  public render(): ReactNode {
    const { hasError, error, retryCount } = this.state;
    const { children, fallback, level = 'component' } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Different error UIs based on severity level
      const canRetry = retryCount < this.maxRetries;
      const isMinorError = level === 'component';
      const isCriticalError = level === 'critical';

      return (
        <div className={styles.errorBoundary}>
          <MessageBar
            messageBarType={isCriticalError ? MessageBarType.blocked : MessageBarType.error}
            isMultiline={true}
            className={styles.errorMessage}
          >
            <Stack tokens={{ childrenGap: 12 }}>
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Icon iconName={isCriticalError ? 'BlockedSite' : 'Error'} />
                <Text variant="mediumPlus" style={{ fontWeight: 600 }}>
                  {isMinorError ? 'Component Error' : 
                   isCriticalError ? 'Critical System Error' : 'Application Error'}
                </Text>
              </Stack>
              
              <Text variant="medium">
                {isMinorError
                  ? 'A component has encountered an error and cannot be displayed.'
                  : isCriticalError
                  ? 'A critical error has occurred that affects the entire application.'
                  : 'An unexpected error has occurred in this section.'
                }
              </Text>

              {error.message && (
                <Text variant="small" style={{ fontFamily: 'monospace', color: '#666' }}>
                  Error: {error.message}
                </Text>
              )}

              {retryCount > 0 && (
                <Text variant="small">
                  Retry attempts: {retryCount}/{this.maxRetries}
                </Text>
              )}

              <Stack horizontal tokens={{ childrenGap: 8 }}>
                {canRetry && (
                  <PrimaryButton
                    text="Try Again"
                    iconProps={{ iconName: 'Refresh' }}
                    onClick={this.handleRetry}
                  />
                )}
                
                {isCriticalError && (
                  <DefaultButton
                    text="Reload Page"
                    iconProps={{ iconName: 'NavigateBack' }}
                    onClick={this.handleReload}
                  />
                )}
                
                <DefaultButton
                  text="Report Issue"
                  iconProps={{ iconName: 'Mail' }}
                  onClick={this.handleReport}
                />
              </Stack>
            </Stack>
          </MessageBar>
        </div>
      );
    }

    return children;
  }
}

// Higher-order component for easy wrapping
export const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.ComponentType<P> => {
  const WithErrorBoundaryComponent = (props: P): React.ReactElement => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = 
    `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
};

export default ErrorBoundary;