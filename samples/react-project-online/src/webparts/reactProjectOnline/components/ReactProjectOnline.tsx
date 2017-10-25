import * as React from 'react';
import styles from './ReactProjectOnline.module.scss';
import { IReactProjectOnlineProps } from './IReactProjectOnlineProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactProjectOnline extends React.Component<IReactProjectOnlineProps, {}> {
  public render(): React.ReactElement<IReactProjectOnlineProps> {
    return (
      <div className={styles.reactProjectOnline}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
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
