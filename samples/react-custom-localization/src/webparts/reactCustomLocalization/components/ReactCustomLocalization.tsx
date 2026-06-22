import * as React from 'react';
import styles from './ReactCustomLocalization.module.scss';
import type { IReactCustomLocalizationProps } from './IReactCustomLocalizationProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactCustomLocalization extends React.Component<IReactCustomLocalizationProps, {}> {
  public render(): React.ReactElement<IReactCustomLocalizationProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      strings
    } = this.props;

    return (
      <section className={`${styles.reactCustomLocalization} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>{strings.Hello}, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value (this text is not localized and always english): <strong>{escape(description)}</strong></div>
          <div>{strings.SomeString}</div>
        </div>
      </section>
    );
  }
}
