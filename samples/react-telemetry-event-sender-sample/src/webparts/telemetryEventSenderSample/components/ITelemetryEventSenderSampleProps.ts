export interface ITelemetryEventSenderSampleProps {
  /** Description from property pane */
  description: string;

  /** Theme info injected by SPFx */
  isDarkTheme: boolean;

  /** Text describing the environment (Teams, SPO, etc.) */
  environmentMessage: string;

  /** Whether web part is running inside Teams */
  hasTeamsContext: boolean;

  /** Current user's display name */
  userDisplayName: string;

  /** Custom property: name of scenario being tested */
  scenarioName: string;

  /** Custom property: telemetry importance level */
  importance: string;

  /** Toggle: enable or disable telemetry emitting */
  enableTelemetry: boolean;

  /**
   * Callback passed from the web part,
   * allowing the React component to send telemetry upward.
   */
  onSendTelemetry: (eventName: string, extra?: Record<string, unknown>) => void;
}
