import * as React from 'react';
import { MessageBar, MessageBarType, PrimaryButton } from '@fluentui/react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const FunctionalErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Error handler function
  const handleError = (error: Error) => {
    console.error('Caught error:', error);
    setHasError(true);
    setErrorMessage(error.message || 'An unexpected error occurred.');
  };

  // Effect to catch errors globally
  React.useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(event.error || new Error('Unknown error occurred.'));
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', (event) => {
      handleError(event.reason || new Error('Unhandled promise rejection.'));
    });

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  if (hasError) {
    return (
      <div style={{ padding: '20px' }}>
        <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
          <p>Something went wrong: {errorMessage}</p>
          <PrimaryButton onClick={handleReload} text="Reload Page" />
        </MessageBar>
      </div>
    );
  }

  return <>{children}</>;
};

export default FunctionalErrorBoundary;
