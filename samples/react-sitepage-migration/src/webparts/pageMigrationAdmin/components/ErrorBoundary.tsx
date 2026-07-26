import * as React from 'react';
import { Body1, Button, MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle } from '@fluentui/react-components';
import * as strings from 'PageMigrationAdminWebPartStrings';

interface ErrorBoundaryProps {
  readonly children: React.ReactNode;
  readonly onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error);
    // eslint-disable-next-line no-console
    console.error('PageMigrationAdmin error boundary caught an error.', error, errorInfo.componentStack);
  }

  private readonly handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  public override render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <MessageBar intent="error" politeness="assertive">
        <MessageBarBody>
          <MessageBarTitle>{strings.ErrorBoundaryTitle}</MessageBarTitle>
          <Body1>{strings.ErrorBoundaryDescription}</Body1>
          {this.state.error?.message ? <Body1 block>{this.state.error.message}</Body1> : null}
        </MessageBarBody>
        <MessageBarActions>
          <Button appearance="primary" onClick={this.handleRetry}>{strings.ErrorBoundaryRetry}</Button>
        </MessageBarActions>
      </MessageBar>
    );
  }
}
