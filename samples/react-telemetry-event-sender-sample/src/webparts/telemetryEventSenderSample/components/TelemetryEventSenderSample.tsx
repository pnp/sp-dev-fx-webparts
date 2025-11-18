import * as React from 'react';
import styles from './TelemetryEventSenderSample.module.scss';
import type { ITelemetryEventSenderSampleProps } from './ITelemetryEventSenderSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

interface ITelemetryEventSenderSampleState {
  lastEventName?: string;
  lastEventTime?: string;
}

export default class TelemetryEventSenderSample
  extends React.Component<ITelemetryEventSenderSampleProps, ITelemetryEventSenderSampleState> {

  public constructor(props: ITelemetryEventSenderSampleProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount(): void {
    if (this.props.enableTelemetry) {
      this.props.onSendTelemetry('TelemetrySample_ComponentLoaded', {
        scenarioName: this.props.scenarioName,
        importance: this.props.importance
      });
    }
  }

  private _onSendSampleEvent = (): void => {
    if (!this.props.enableTelemetry) {
      return;
    }

    const eventName = "TelemetrySample_PrimaryAction_Click";
    const timestampIso = new Date().toISOString();
    const timestampDisplay = new Date().toLocaleString();

    // Send telemetry with ALL relevant properties
    this.props.onSendTelemetry(eventName, {
      scenarioName: this.props.scenarioName,
      importance: this.props.importance,
      clickedAt: timestampIso
    });

    // Update "last sent event" component UI state
    this.setState({
      lastEventName: eventName,
      lastEventTime: timestampDisplay
    });
  };


  public render(): React.ReactElement<ITelemetryEventSenderSampleProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.telemetryEventSenderSample} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img
            alt=""
            src={
              isDarkTheme
                ? require('../assets/welcome-dark.png')
                : require('../assets/welcome-light.png')
            }
            className={styles.welcomeImage}
          />

          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>

          <div>
            Web part description:&nbsp;
            <strong>{escape(description)}</strong>
          </div>

          <div>
            Scenario name:&nbsp;
            <strong>{escape(this.props.scenarioName || '(not set)')}</strong>
          </div>

          <div>
            Importance:&nbsp;
            <strong>{escape(this.props.importance || 'Normal')}</strong>
          </div>

          <div className={styles.telemetryStatus}>
            Telemetry:&nbsp;
            {this.props.enableTelemetry ? (
              <span className={styles.telemetryOn}>Enabled</span>
            ) : (
              <span className={styles.telemetryOff}>Disabled</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={this._onSendSampleEvent}
              disabled={!this.props.enableTelemetry}
            >
              Send sample telemetry event
            </button>

            {!this.props.enableTelemetry && (
              <div className={styles.helperText}>
                Enable telemetry in the web part properties to send events.
              </div>
            )}
          </div>
          {this.props.enableTelemetry && this.state.lastEventName && (
            <div className={styles.helperText}>
              <strong>Last telemetry event:</strong>&nbsp;
              {this.state.lastEventName}
              <br />
              <strong>Sent at:</strong>&nbsp;
              {this.state.lastEventTime}
            </div>
          )}
        </div>
      </section>

    );
  }
}
