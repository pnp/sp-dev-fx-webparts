import * as React from 'react';
import styles from './ConfigureTab.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITabLink } from '../model/ITabLink';

// import * as microsoftTeams from "@microsoft/teams-js";

export interface IConfigureTabProps {
  tabLinkChoices?: ITabLink[];
  message: string;
  tabLinkSelected?: (ITabLink) => void;
}

interface IConfigureTabState {
  selectedTabLink?: ITabLink;
}

export class ConfigureTab extends React.Component<IConfigureTabProps, IConfigureTabState> {

  constructor(props: IConfigureTabProps) {
    super(props);
    this.state = {
      selectedTabLink: null
    };
  }

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
                {this.props.tabLinkChoices.map((item) => {
                  if (this.state.selectedTabLink &&
                      item.entityId == this.state.selectedTabLink.entityId) {
                    return (
                      <div className={styles.description}>
                        SEL {item.tabName}
                        <br />
                        <a href={escape(item.contentPageUrl)}>{escape(item.contentPageUrl)}</a>
                      </div>
                    );
                  } else {
                    return (
                      <div className={styles.description}
                        onClick={() => {
                          this.setState({
                            selectedTabLink: item
                          });
                          this.props.tabLinkSelected(item);
                        }} >
                        {item.tabName}
                        <br />
                        <a href={escape(item.contentPageUrl)}>{escape(item.contentPageUrl)}</a>
                      </div>
                    );
                  }
                })}
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
