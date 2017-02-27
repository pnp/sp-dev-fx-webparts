import * as React from 'react';
import styles from './ListProvisioning.module.scss';
import { IListProvisioningProps } from './IListProvisioningProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Placeholder } from '@microsoft/sp-webpart-base';

export default class ListProvisioning extends React.Component<IListProvisioningProps, void> {
  public render(): React.ReactElement<IListProvisioningProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <Placeholder
              icon={'ms-Icon--CustomList'}
              iconText={'SharePoint asset provisioning'}
              description={'No actual functionality - Sample shows how to provision SharePoint assets using feature xml elemenents. See package.json and sharepoint/asset folder. Assets are deployed when web part is installed to a site.'} />
        </div>
      </div>
    );
  }
}
