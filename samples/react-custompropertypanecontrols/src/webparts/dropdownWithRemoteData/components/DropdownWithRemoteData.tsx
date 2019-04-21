import * as React from 'react';

import styles from './DropdownWithRemoteData.module.scss';
import { IDropdownWithRemoteDataProps } from './IDropdownWithRemoteDataProps';

import { Config } from './Config';

export default class DropdownWithRemoteData extends React.Component<IDropdownWithRemoteDataProps, {}> {
  public render(): React.ReactElement<IDropdownWithRemoteDataProps> {

    const { needsConfiguration, configureWebPart} = this.props;

    return (
      <div className={styles.dropdownWithRemoteData}>
        { needsConfiguration &&
          <Config configure={configureWebPart} {...this.props} />
        }
        { needsConfiguration === false &&
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <span className={styles.title}>Welcome to SharePoint!</span>
                <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>

                <p className={styles.subTitle}>
                  Selected list ID: {this.props.list || 'no list selected'}
                </p>
                <p className={styles.subTitle}>
                  Selected item ID: {this.props.item || 'no item selected'}
                </p>

                <a href="https://aka.ms/spfx" className={styles.button}>
                  <span className={styles.label}>Learn more</span>
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
