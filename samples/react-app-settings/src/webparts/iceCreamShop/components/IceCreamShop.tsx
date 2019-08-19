import * as React from 'react';
import styles from './IceCreamShop.module.scss';
import { IIceCreamShopProps } from './IIceCreamShopProps';

/**
 * Import the AppSettings and use them to call apis.
 */
import { AppSettings } from '../../../AppSettings';

export default class IceCreamShop extends React.Component<IIceCreamShopProps, {}> {
  public render(): React.ReactElement<IIceCreamShopProps> {
    return (
      <div className={ styles.iceCreamShop }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to PnP ice cream shop!</span>
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
