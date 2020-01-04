import * as React from 'react';
import styles from './ConfigureTab.module.scss';
import { IConfigureTabProps } from './IConfigureTabProps';
import { escape } from '@microsoft/sp-lodash-subset';

import * as microsoftTeams from "@microsoft/teams-js";

export default class ConfigureTab extends React.Component<IConfigureTabProps, {}> {

  public render(): React.ReactElement<IConfigureTabProps> {

    var message = "Teams API not found";
    var settings = {
      websiteUrl: this.props.contentPageUrl,
      contentUrl: this.props.contentPageUrl,
      entityId: "grayIconTab",
      suggestedDisplayName: "MyNewTab"
    };
    if (microsoftTeams) {
      microsoftTeams.initialize();
      message = "Teams API initialized";

      microsoftTeams.settings.setValidityState(true);

      microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
        microsoftTeams.settings.setSettings(settings);
        saveEvent.notifySuccess();
      });
    }

    return (
      <div className={styles.configureTab}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Configure your SharePoint tab</span>
              <p className={styles.description}>The tab will display:&nbsp;
                <a href={escape(this.props.contentPageUrl)}>{escape(this.props.contentPageUrl)}</a>
              </p>
              <p className={styles.subTitle}>{escape(message)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>OK to save</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
