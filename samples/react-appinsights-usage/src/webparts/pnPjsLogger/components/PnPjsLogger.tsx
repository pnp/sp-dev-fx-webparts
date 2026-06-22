import * as React from 'react';
import styles from './PnPjsLogger.module.scss';
import type { IPnPjsLoggerProps } from './IPnPjsLoggerProps';
import { LogLevel, Logger } from '@pnp/logging';
import { MessageBar, MessageBarType, Link, PrimaryButton, DefaultButton, Stack } from '@fluentui/react';

export interface ILogEntry {
  message: string;
  level: string;
  timestamp: Date;
}

export interface IPnPjsLoggerState {
  loggedEntries: ILogEntry[];
}

export default class PnPjsLogger extends React.Component<IPnPjsLoggerProps, IPnPjsLoggerState> {
  constructor(props: IPnPjsLoggerProps) {
    super(props);
    this.state = {
      loggedEntries: []
    };
    Logger.writeJSON(this.props, LogLevel.Info);
  }

  private logWithTracking = (message: string, level: LogLevel): void => {
    // Write to PnPJS Logger (which sends to App Insights via listener)
    Logger.write(message, level);

    // Track locally for display
    const levelName = this.getLogLevelName(level);
    const newEntry: ILogEntry = {
      message,
      level: levelName,
      timestamp: new Date()
    };

    this.setState({
      loggedEntries: [newEntry, ...this.state.loggedEntries].slice(0, 10) // Keep last 10
    });
  }

  private getLogLevelName(level: LogLevel): string {
    switch (level) {
      case LogLevel.Verbose: return 'Verbose';
      case LogLevel.Info: return 'Info';
      case LogLevel.Warning: return 'Warning';
      case LogLevel.Error: return 'Error';
      default: return 'Unknown';
    }
  }

  private getLogLevelColor(level: string): string {
    switch (level) {
      case 'Verbose': return '#666';
      case 'Info': return '#0078d4';
      case 'Warning': return '#ffb900';
      case 'Error': return '#d13438';
      default: return '#000';
    }
  }
  public render(): React.ReactElement<IPnPjsLoggerProps> {
    Logger.write("PnPjsLogger:Render", LogLevel.Info);

    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      isAppInsightsConfigured
    } = this.props;

    return (
      <section className={`${styles.pnPjsLogger} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {userDisplayName}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{description}</strong></div>
          {isAppInsightsConfigured && (
            <MessageBar messageBarType={MessageBarType.success}>
              PnPJS Logger is configured to send logs to Application Insights. Click the buttons below to test logging at different levels.
            </MessageBar>
          )}
        </div>
        {!isAppInsightsConfigured && (
          <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>
            <strong>Application Insights Not Configured</strong>
            <br />
            This web part demonstrates PnPJS Logger integration with Application Insights. To start sending logs to Azure:
            <br />
            1. Edit this web part and find the &quot;Application Insights Configuration&quot; section
            <br />
            2. Paste your Azure Application Insights connection string
            <br />
            <Link href="https://portal.azure.com" target="_blank">Open Azure Portal</Link> to get your connection string.
          </MessageBar>
        )}
        <div style={{ marginTop: '20px' }}>
          <h3>Logging Actions</h3>
          <p>Click the buttons below to send log entries at different severity levels to Application Insights:</p>
          <Stack horizontal tokens={{ childrenGap: 10 }} wrap>
            <DefaultButton
              text="Log Verbose"
              iconProps={{ iconName: 'Info' }}
              onClick={() => this.logWithTracking("PnPjsLogger:ActionButtonClick_Verbose", LogLevel.Verbose)}
            />
            <PrimaryButton
              text="Log Info"
              iconProps={{ iconName: 'InfoSolid' }}
              onClick={() => this.logWithTracking("PnPjsLogger:ActionButtonClick_Info", LogLevel.Info)}
            />
            <DefaultButton
              text="Log Warning"
              iconProps={{ iconName: 'Warning' }}
              onClick={() => this.logWithTracking("PnPjsLogger:ActionButtonClick_Warning", LogLevel.Warning)}
              styles={{ root: { backgroundColor: '#ffb900', borderColor: '#ffb900', color: 'white' }, rootHovered: { backgroundColor: '#d39300', borderColor: '#d39300' } }}
            />
            <DefaultButton
              text="Log Error"
              iconProps={{ iconName: 'ErrorBadge' }}
              onClick={() => this.logWithTracking("PnPjsLogger:ActionButtonClick_Error", LogLevel.Error)}
              styles={{ root: { backgroundColor: '#d13438', borderColor: '#d13438', color: 'white' }, rootHovered: { backgroundColor: '#a4262c', borderColor: '#a4262c' } }}
            />
          </Stack>
        </div>

        {isAppInsightsConfigured && this.state.loggedEntries.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Recent Logs Sent to Application Insights</h3>
            <MessageBar messageBarType={MessageBarType.info}>
              The following log entries have been sent to Application Insights via PnPJS Logger. View them in the Azure Portal under Traces.
            </MessageBar>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {this.state.loggedEntries.map((entry, idx) => (
                <li key={idx} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  <span style={{
                    fontWeight: 'bold',
                    color: this.getLogLevelColor(entry.level),
                    marginRight: '10px'
                  }}>
                    [{entry.level}]
                  </span>
                  <span>{entry.message}</span>
                  <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>
                    - {entry.timestamp.toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </section>
    );
  }
}
