import * as React from 'react';
import styles from './ConfigureTab.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITabLink } from '../model/ITabLink';
import * as strings from 'ConfigureTabWebPartStrings';

export interface IRedirectTabProps {
  tabLinkChoices?: ITabLink[];
  entityId: string;
}

export class RedirectTab extends React.Component<IRedirectTabProps, {}> {

  public render(): React.ReactElement<IRedirectTabProps> {

    this.props.tabLinkChoices.forEach((item => {
      if (item.entityId.toLowerCase() === this.props.entityId.toLowerCase()) {
        window.location.replace(item.contentPageUrl);
      }
    }));

    return (
      <div className={styles.configureTab}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.subTitle}>{strings.TabNotDefinedMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
