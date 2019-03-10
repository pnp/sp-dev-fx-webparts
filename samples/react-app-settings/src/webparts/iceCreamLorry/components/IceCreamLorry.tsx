import * as React from 'react';
import styles from './IceCreamLorry.module.scss';
import { IIceCreamLorryProps } from './IIceCreamLorryProps';

/**
 * Import the AppSettings and use them to call apis.
 */
import { AppSettings } from '../../../AppSettings';

export default class IceCreamLorry extends React.Component<IIceCreamLorryProps, {}> {
  public render(): React.ReactElement<IIceCreamLorryProps> {
    return (
      <div className={ styles.iceCreamLorry }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to the PnP ice cream lorry!</span>
              <code>
                <pre>
                  appSettings.tenantUrl: {AppSettings.tenantUrl}
                </pre>
                <pre>
                  appSettings.assetsUrl: {AppSettings.assetsUrl}
                </pre>
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
