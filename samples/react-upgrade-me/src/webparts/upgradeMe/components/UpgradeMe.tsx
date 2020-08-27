import * as React from 'react';
import styles from './UpgradeMe.module.scss';
import { IUpgradeMeProps } from './IUpgradeMeProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class UpgradeMe extends React.Component<IUpgradeMeProps, {}> {
  public render(): React.ReactElement<IUpgradeMeProps> {
    return (
      <div className={ styles.upgradeMe }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Upgrade Me!</span>
              <p className={ styles.subTitle }>This web part does nothing. It is intended to be used to demonstrate how to upgrade SPFx solutions and to demonstrate incompatibilities between versions of SPFx/Node.js</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
