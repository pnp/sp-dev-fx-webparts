import * as React from 'react';

import styles from './DropdownWithRemoteDataWithoutCustomControls.module.scss';
import { IDropdownWithRemoteDataWithoutCustomControlsProps } from './IDropdownWithRemoteDataWithoutCustomControlsProps';

import { Config } from './Config';

export default class DropdownWithRemoteDataWithoutCustomControls extends React.Component<IDropdownWithRemoteDataWithoutCustomControlsProps, {}> {
  public render(): React.ReactElement<IDropdownWithRemoteDataWithoutCustomControlsProps> {

    const { needsConfiguration, configureWebPart} = this.props;

    return (
      <div className={styles.dropdownWithRemoteDataWithoutCustomControls}>
        { needsConfiguration &&
          <Config configure={configureWebPart} {...this.props} />
        }
        { needsConfiguration === false &&
          <div className={styles.container}>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
                <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
                <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>

                <p className='ms-font-l ms-fontColor-white'>
                  Selected list ID: {this.props.list || 'no list selected'}
                </p>
                <p className='ms-font-l ms-fontColor-white'>
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
