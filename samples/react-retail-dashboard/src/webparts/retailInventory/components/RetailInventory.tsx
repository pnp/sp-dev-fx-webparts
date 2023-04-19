import * as React from 'react';
import styles from './RetailInventory.module.scss';
import { IRetailInventoryProps } from './IRetailInventoryProps';
import { InventoryList } from '../../../components/InventoryList/InventoryList';

export default class RetailInventory extends React.Component<IRetailInventoryProps, {}> {
  public render(): React.ReactElement<IRetailInventoryProps> {
    const {
      hasTeamsContext,
    } = this.props;

    return (
      <section className={`${styles.retailInventory} ${hasTeamsContext ? styles.teams : ''}`}>
        <div>
          <InventoryList
            retailDataService={this.props.retailDataService}
            settingsService={this.props.settingsService}
          />          
        </div>
      </section>
    );
  }
}
