import * as React from 'react';
import styles from './HelloConfiguration.module.scss';
import type { IHelloConfigurationProps } from './IHelloConfigurationProps';

export default class HelloConfiguration extends React.Component<IHelloConfigurationProps, {}> {
  public render(): React.ReactElement<IHelloConfigurationProps> {
    return (
      <section className={styles.helloConfiguration}>
        <div className={styles.welcome}>
          <div>
            Open the configuration to see all the properties!
          </div>
        </div>
      </section>
    );
  }
}
