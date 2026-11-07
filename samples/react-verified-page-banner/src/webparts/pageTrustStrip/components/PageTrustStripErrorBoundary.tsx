import * as React from "react";
import { productName } from "../logic/productName";

interface IPageTrustStripErrorBoundaryProps {
  children?: React.ReactNode;
  /** Changes when the host wants a failed strip to mount again. */
  recovery: number;
  onRetry?: () => void;
}

interface IPageTrustStripErrorBoundaryState {
  errorMessage?: string;
  recovery: number;
}

const fallbackStyle: React.CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  padding: "12px 16px",
  fontFamily: "Segoe UI, sans-serif",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#323130",
  backgroundColor: "#fde7e9",
  border: "1px solid #d13438"
};

const retryStyle: React.CSSProperties = {
  marginTop: "8px",
  font: "inherit",
  color: "#a4262c",
  background: "transparent",
  border: "none",
  padding: 0,
  textDecoration: "underline",
  cursor: "pointer"
};

function boundaryMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "The strip couldn't be displayed.";
}

export class PageTrustStripErrorBoundary extends React.Component<
  IPageTrustStripErrorBoundaryProps,
  IPageTrustStripErrorBoundaryState
> {
  public constructor(props: IPageTrustStripErrorBoundaryProps) {
    super(props);
    this.state = { recovery: props.recovery };
  }

  public static getDerivedStateFromError(error: unknown): Partial<IPageTrustStripErrorBoundaryState> {
    return { errorMessage: boundaryMessage(error) };
  }

  public static getDerivedStateFromProps(
    props: IPageTrustStripErrorBoundaryProps,
    state: IPageTrustStripErrorBoundaryState
  ): Partial<IPageTrustStripErrorBoundaryState> {
    if (props.recovery !== state.recovery) {
      return {
        errorMessage: undefined,
        recovery: props.recovery
      };
    }
    return {};
  }

  public componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    console.error("[PageTrustStrip] The strip couldn't render.", error, info.componentStack);
  }

  private readonly _retry = (): void => {
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  public render(): React.ReactElement {
    if (this.state.errorMessage) {
      return (
        <section role="alert" aria-label={productName} style={fallbackStyle}>
          <p style={{ margin: 0 }}>
            {productName} hit a problem and could not show this banner. {this.state.errorMessage}
          </p>
          <button type="button" style={retryStyle} onClick={this._retry}>Try again</button>
        </section>
      );
    }
    return <>{this.props.children}</>;
  }
}
