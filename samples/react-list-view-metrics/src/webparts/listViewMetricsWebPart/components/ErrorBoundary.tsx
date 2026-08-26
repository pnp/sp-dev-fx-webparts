// React
import { Component, ErrorInfo, ReactNode } from "react";

// Fluent UI
import { MessageBar, MessageBarType } from "@fluentui/react";

// Localization
import * as strings from "ListViewMetricsWebPartStrings";

const LOG_SOURCE = "ListViewMetricsWebPart_ErrorBoundary";

export interface IErrorBoundaryProps {
  // Render children under normal conditions
  children: ReactNode;
  // Optional custom fallback component
  fallback?: React.ComponentType<{ error?: Error }>;
}

export interface IErrorBoundaryState {
  // Whether an error has been captured
  hasError: boolean;
  // The thrown error instance (if any)
  error?: Error;
  //Additional error info from React
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state so the next render shows the fallback UI
  public static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
  }

  // Log error details and keep them in state for optional fallback UI
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
    // Prefer your own logger here if available
    // eslint-disable-next-line no-console
    console.error(LOG_SOURCE, error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback component if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} />;
      }

      // Default fallback UI (localized)
      return (
        <MessageBar messageBarType={MessageBarType.error} isMultiline>
          <strong>{strings.ErrBoundary_Header}</strong>
          <br />
          {this.state.error?.message && (
            <>
              {strings.ErrBoundary_ErrorPrefix} {this.state.error.message}
              <br />
            </>
          )}
          {strings.ErrBoundary_Action}
        </MessageBar>
      );
    }

    // Normal path
    return this.props.children;
  }
}
