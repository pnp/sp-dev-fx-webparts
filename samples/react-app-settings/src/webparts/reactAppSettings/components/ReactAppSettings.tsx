import * as React from 'react';
import styles from './ReactAppSettings.module.scss';
import { IReactAppSettingsProps } from './IReactAppSettingsProps';
import { escape } from '@microsoft/sp-lodash-subset';

/**
 * Import the appSettings and use them to call apis.
 */
import * as appSettings from 'appSettings';

export default class ReactAppSettings extends React.Component<IReactAppSettingsProps, void> {
  public render(): React.ReactElement<IReactAppSettingsProps> {
    return (
      <div className={styles.reactAppSettings}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <pre>
                appSettings.tenantUrl: {appSettings.tenantUrl}
              </pre>
              <pre>
                appSettings.assetsUrl: {appSettings.assetsUrl}
              </pre>
              <pre>
                appSettings.webSearchUrl: {appSettings.webSearchUrl}
              </pre>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
