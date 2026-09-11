import * as React from 'react';

interface IErrorBoundaryState {
  message?: string;
}

// Catches any render error in the tree and shows the real message + stack,
// instead of SharePoint's opaque "Something went wrong / [object Object]".
export class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, IErrorBoundaryState> {
  constructor(props: { children?: React.ReactNode }) {
    super(props);
    this.state = {};
  }

  public static getDerivedStateFromError(error: unknown): IErrorBoundaryState {
    const e = error as { stack?: string; message?: string };
    return { message: (e && (e.stack || e.message)) || String(error) };
  }

  public render(): React.ReactNode {
    if (this.state.message) {
      return React.createElement(
        'pre',
        { style: { whiteSpace: 'pre-wrap', color: '#a4262c', fontSize: '12px', padding: '12px', margin: 0 } },
        'List Dashboard error:\n' + this.state.message
      );
    }
    return this.props.children as React.ReactElement;
  }
}
