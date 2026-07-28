export interface IM365SearchHubProps {
  /** Heading shown above the search box. Empty hides it. */
  title: string;
  /** How many results one page asks Microsoft Graph for. */
  pageSize: number;
  /** Whether the local diagnostics panel is shown. Off by default. */
  showPerformancePanel: boolean;
}
