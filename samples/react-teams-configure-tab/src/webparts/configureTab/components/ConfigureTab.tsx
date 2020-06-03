import * as React from 'react';
import styles from './ConfigureTab.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITabLink } from '../model/ITabLink';
import * as strings from 'ConfigureTabWebPartStrings';

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

    if (this.props.tabLinkChoices && this.props.tabLinkChoices.length > 1) {

      // We have multiple tab link choices; allow the user to pick one
      return (
        <div className={styles.configureTab}>
          <div className={styles.container}>
            <div className={styles.row}>
              <span className={styles.title}>{strings.PleaseSelectHeading}</span>
              <ul className={styles.column}>

                {this.props.tabLinkChoices.map((item) => {
                  if (this.state.selectedTabLink &&
                      item.entityId == this.state.selectedTabLink.entityId) {
                    // Display selected tab
                    return (
                      <li className={styles.selected + ' ' + styles.tabChoice}>
                        <span className = {styles.tabName}>{item.tabName}</span>
                        <br />
                        <span className={styles.tabLink}>
                          <a href={escape(item.contentPageUrl)}>{escape(item.contentPageUrl)}</a>
                        </span>
                      </li>
                    );
                  } else {
                    // Display unselected tab
                    return (
                      <li className={styles.tabChoice}
                        onClick={() => {
                          this.setState({
                            selectedTabLink: item
                          });
                          this.props.tabLinkSelected(item);
                        }} >
                        <span className = {styles.tabName}>{item.tabName}</span>
                        <br />
                        <span className={styles.tabLink}>
                          <a href={escape(item.contentPageUrl)}>{escape(item.contentPageUrl)}</a>
                          </span>
                      </li>
                    );
                  }
                })}

                <p className={styles.subTitle}>{escape(this.props.message)}</p>
              </ul>
            </div>
          </div>
        </div>
      );

    } else if (this.props.tabLinkChoices && this.props.tabLinkChoices.length == 1) { 

      // We have only one tab link choice, select it immediately
      this.props.tabLinkSelected(this.props.tabLinkChoices[0]);
      return (
        <div className={styles.configureTab}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <span className={styles.title}>{strings.OneSelectHeading}</span>
                <div className={styles.selected + ' ' + styles.tabChoice}>
                  <span className = {styles.tabName}>{this.props.tabLinkChoices[0].tabName}</span>
                  <br />
                  <span className={styles.tabLink}>
                    <a href={escape(this.props.tabLinkChoices[0].contentPageUrl)}>{escape(this.props.tabLinkChoices[0].contentPageUrl)}</a>
                  </span>
                </div>
              </div>
              <p className={styles.subTitle}>{escape(this.props.message)}</p>
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
                <p className={styles.subTitle}>{escape(this.props.message)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
