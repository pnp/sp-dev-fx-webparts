import * as React from 'react';
import styles from './HelloAzureRelayService.module.scss';
import { IHelloAzureRelayServiceProps } from './IHelloAzureRelayServiceProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloAzureRelayService extends React.Component<IHelloAzureRelayServiceProps, {}> {

  public render(): React.ReactElement<IHelloAzureRelayServiceProps> {
    return (
      <div className={styles.helloAzureRelayService}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <ul>
                  {this.props.documents.map((d, i) => {
                    debugger;
                    return <li>{d.Title}</li>;
                  })}
                </ul>

              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
