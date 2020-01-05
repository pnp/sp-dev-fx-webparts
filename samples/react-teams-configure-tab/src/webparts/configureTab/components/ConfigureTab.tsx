import * as React from 'react';
import styles from './ConfigureTab.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITabLink } from '../model/ITabLink';

// import * as microsoftTeams from "@microsoft/teams-js";

export interface IConfigureTabProps {
  tabLinkChoices: ITabLink[];
  message: string;
  tabLinkSelected: (tabLinkSelected: ITabLink) => void;
}

interface IConfigureTabState {
  selectedTabLink: ITabLink;
}

export class ConfigureTab extends React.Component<IConfigureTabProps, IConfigureTabState> {

  public render(): React.ReactElement<IConfigureTabProps> {

    // var message = "Teams API not found";
    // var settings = {
    //   websiteUrl: this.props.contentPageUrl,
    //   contentUrl: this.props.contentPageUrl,
    //   entityId: "grayIconTab",
    //   suggestedDisplayName: "MyNewTab"
    // };
    // if (microsoftTeams) {
    //   microsoftTeams.initialize();
    //   message = "Teams API initialized";

    //   microsoftTeams.settings.setValidityState(true);

    //   microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
    //     microsoftTeams.settings.setSettings(settings);
    //     saveEvent.notifySuccess();
    //   });
    // }

    if (this.props.tabLinkChoices) {
      // We have tab link choices; allow the user to pick one
      return (
        <div className={styles.configureTab}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <span className={styles.title}>Configure your SharePoint tab</span>
                <p className={styles.description}>The tab will display:&nbsp;
                  <a href={escape(this.props.tabLinkChoices[0].contentPageUrl)}>{escape(this.props.tabLinkChoices[0].contentPageUrl)}</a>
                </p>
                <p className={styles.subTitle}>{escape(this.props.message)}</p>
              </div>
            </div>
          </div>
        </div>
      );
  
    } else {
      // No tab link choices available; show message only
      return (
        <div className={styles.configureTab}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <span className={styles.title}>Error</span>
                <p className={styles.subTitle}>{escape(this.props.message)}</p>
              </div>
            </div>
          </div>
        </div>
      );
      }
  }
}
