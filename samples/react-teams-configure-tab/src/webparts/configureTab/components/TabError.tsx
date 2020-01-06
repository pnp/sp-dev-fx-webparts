import * as React from 'react';
import styles from './ConfigureTab.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITabLink } from '../model/ITabLink';

export interface ITabErrorProps {
  message: string;
}

export class TabError extends React.Component<ITabErrorProps, {}> {

  public render(): React.ReactElement<ITabErrorProps> {

    return (
      <div className={styles.configureTab}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.subTitle}>{escape(this.props.message)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
