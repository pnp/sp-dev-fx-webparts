import * as React from 'react';
import { MessageBar, MessageBarType, PrimaryButton, DefaultButton, Stack } from '@fluentui/react';
import { ErrorHandler, IErrorInfo } from '../utils/ErrorHandler';

interface IErrorBoundaryState {
  hasError: boolean;
  error: IErrorInfo | null;
  errorInfo: React.ErrorInfo | null;
}

interface IErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: IErrorInfo; retry: () => void }>;
  onError?: (error: IErrorInfo, errorInfo: React.ErrorInfo) => void;
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<IErrorBoundaryState> {
    const errorInfo = ErrorHandler.handleError(error);
    return {
      hasError: true,
      error: errorInfo
    };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const handledError = ErrorHandler.handleError(error);
    ErrorHandler.logError(handledError, 'ErrorBoundary');

    this.setState({
      errorInfo
    });

    if (this.props.onError) {
      this.props.onError(handledError, errorInfo);
    }
  }

  private _retry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public render(): React.ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} retry={this._retry} />;
      }

      return <DefaultErrorFallback error={this.state.error} retry={this._retry} />;
    }

    return this.props.children;
  }
}

interface IDefaultErrorFallbackProps {
  error: IErrorInfo;
  retry: () => void;
}

const DefaultErrorFallback: React.FunctionComponent<IDefaultErrorFallbackProps> = ({ error, retry }) => {
  return (
    <div style={{ padding: '20px' }}>
      <MessageBar messageBarType={MessageBarType.error}>
        <Stack tokens={{ childrenGap: 12 }}>
          <div>
            <strong>Something went wrong</strong>
          </div>
          <div>{error.userFriendlyMessage}</div>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>
              <summary>Technical Details (Development Mode)</summary>
              <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
                <strong>Error:</strong> {error.message}
                {error.code && (
                  <>
                    <br />
                    <strong>Code:</strong> {error.code}
                  </>
                )}
                {error.details && (
                  <>
                    <br />
                    <strong>Details:</strong> {error.details}
                  </>
                )}
              </div>
            </details>
          )}
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <PrimaryButton text="Try Again" onClick={retry} />
            <DefaultButton text="Refresh Page" onClick={() => window.location.reload()} />
          </Stack>
        </Stack>
      </MessageBar>
    </div>
  );
};

export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  errorBoundaryProps?: Omit<IErrorBoundaryProps, 'children'>
): React.ComponentType<T> {
  const WrappedComponent: React.FunctionComponent<T> = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}