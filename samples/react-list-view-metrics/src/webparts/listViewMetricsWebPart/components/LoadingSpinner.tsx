// React
import type { ReactNode } from "react";

// Fluent UI
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from "@fluentui/react";

// Styles
import styles from "./ListViewMetricsWebPart.module.scss";

// Localization
import * as strings from "ListViewMetricsWebPartStrings";

export interface ILoadingSpinnerProps {
  /** Whether to show the spinner instead of children */
  isLoading: boolean;
  /** Optional loading message; defaults to a localized string */
  message?: string;
  /** Optional error text; when present, renders an error bar instead of children */
  error?: string;
  /** Content to render when not loading and no error */
  children: ReactNode;
}

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  isLoading,
  message = strings.Loading_Default,
  error,
  children,
}) => {
  if (error) {
    return (
      <MessageBar messageBarType={MessageBarType.error} role="alert">
        <strong>{strings.Error_LoadingDataPrefix}</strong> {error}
      </MessageBar>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer} aria-live="polite" aria-busy="true">
        <Spinner size={SpinnerSize.medium} label={message} />
      </div>
    );
  }

  return <>{children}</>;
};
