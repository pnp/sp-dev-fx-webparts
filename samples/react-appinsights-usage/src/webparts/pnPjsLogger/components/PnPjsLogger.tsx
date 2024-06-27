import * as React from 'react';
import styles from './PnPjsLogger.module.scss';
import type { IPnPjsLoggerProps } from './IPnPjsLoggerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { LogLevel, Logger } from '@pnp/logging';
import { ActionButton } from '@fluentui/react';

export default class PnPjsLogger extends React.Component<IPnPjsLoggerProps, {}> {
  constructor(props: IPnPjsLoggerProps) {
    super(props);
    Logger.writeJSON(this.props, LogLevel.Info);
  }
  public render(): React.ReactElement<IPnPjsLoggerProps> {
    Logger.write("PnPjsLogger:Render", LogLevel.Info);

    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.pnPjsLogger} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
        <h3>Logging Actions</h3>
        <ul className={styles.links}>
            <li>
          <ActionButton onClick={() => Logger.write("PnPjsLogger:ActionButtonClick_Verbose", LogLevel.Verbose)}>Log Verbose</ActionButton>
          </li>
          <li>
          <ActionButton onClick={() => Logger.write("PnPjsLogger:ActionButtonClick_Info", LogLevel.Info)}>Log Info</ActionButton>
          </li>
          <li>
          <ActionButton onClick={() => Logger.write("PnPjsLogger:ActionButtonClick_Warning", LogLevel.Warning)}>Log Warning</ActionButton>
          </li>
          <li>
          <ActionButton onClick={() => Logger.write("PnPjsLogger:ActionButtonClick_Error", LogLevel.Error)}>Log Error</ActionButton>
          </li>
          </ul>
        </div>
        
      </section>
    );
  }
}
