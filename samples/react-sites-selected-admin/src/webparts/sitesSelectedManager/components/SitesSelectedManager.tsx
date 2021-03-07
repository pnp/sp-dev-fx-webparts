import * as React from 'react';
import styles from './SitesSelectedManager.module.scss';
import { ISitesSelectedManagerProps } from './ISitesSelectedManagerProps';
import { SitesSelectedApp } from './SitesSelectedApp';

export default class SitesSelectedManager extends React.Component<ISitesSelectedManagerProps, {}> {
  public render(): React.ReactElement<ISitesSelectedManagerProps> {
    return (
      <div className={styles.sitesSelectedManager}>
        <SitesSelectedApp {...this.props} />
        <footer />
      </div>
    );
  }
}
