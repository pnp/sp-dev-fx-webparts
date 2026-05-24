import * as React from 'react';
import { Icon } from '@iconify/react';
import { tokens } from '@fluentui/react-components';
import { StackV2, TypographyControl } from '@spteck/react-controls-v2';
import * as strings from 'EventsFeedWebPartStrings';

interface IErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  IErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[EventsFeed] Uncaught error:', error, info.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <StackV2
          direction="vertical"
          alignItems="center"
          justifyContent="center"
          gap="l"
          style={{ padding: tokens.spacingVerticalXXL }}
        >
          <Icon
            icon="fluent:error-circle-20-regular"
            width={48}
            height={48}
            color={tokens.colorPaletteRedForeground1}
          />
          <StackV2 direction="vertical" alignItems="center" gap="s">
            <TypographyControl fontSize="l" fontWeight="semibold">
              {strings.ErrorBoundaryTitleLabel}
            </TypographyControl>
            <TypographyControl
              fontSize="m"
              color={tokens.colorNeutralForeground2}
              style={{ textAlign: 'center', maxWidth: 320 }}
            >
              {this.state.errorMessage || strings.ErrorBoundaryDescriptionLabel}
            </TypographyControl>
          </StackV2>
        </StackV2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
