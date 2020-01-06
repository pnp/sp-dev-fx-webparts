import * as React from 'react';
import styles from './ConfigureTab.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITabLink } from '../model/ITabLink';
//import * as strings from 'ConfigureTabWebPartStrings';

export interface IRedirectTabProps {
  tabLinkChoices?: ITabLink[];
  message: string;
}

export class RedirectTab extends React.Component<IRedirectTabProps, {}> {

  public render(): React.ReactElement<IRedirectTabProps> {

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
