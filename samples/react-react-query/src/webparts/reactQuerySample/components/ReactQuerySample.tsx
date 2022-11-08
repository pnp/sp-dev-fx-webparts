import * as React from 'react';
import styles from './ReactQuerySample.module.scss';
import { IReactQuerySampleProps } from './IReactQuerySampleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { User } from '../../../components/User';
import { ComponentWithNestedUser } from '../../../components/ComponentWithNestedUser';
import { AnotherUser } from '../../../components/AnotherUser';

export default function ReactQuerySample(props: IReactQuerySampleProps): React.ReactElement {
  return (
    <section className={`${styles.reactQuerySample} ${props.hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <img alt="" src={props.isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Well done, {escape(props.userDisplayName)}!</h2>
        <div>{props.environmentMessage}</div>
        <div>Web part property value: <strong>{escape(props.description)}</strong></div>
      </div>
      <div>
        <h3>Welcome to SharePoint Framework!</h3>
        <p>
          The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
        </p>
        <User />
        <User />
        <AnotherUser />
        <ComponentWithNestedUser />
      </div>
    </section>
  );
}
