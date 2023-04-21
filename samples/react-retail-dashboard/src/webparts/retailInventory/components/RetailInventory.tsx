import * as React from 'react';
import styles from './RetailInventory.module.scss';
import * as strings from 'RetailInventoryWebPartStrings';

import { IRetailInventoryProps } from './IRetailInventoryProps';
import { IRetailInventoryState } from './IRetailInventoryState';
import { InventoryList } from '../../../components/InventoryList/InventoryList';
import { SingleProduct } from '../../../components/SingleProduct/SingleProduct';

import { WidgetSize, Dashboard, IWidget } from '@pnp/spfx-controls-react/lib/Dashboard';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

export default class RetailInventory extends React.Component<IRetailInventoryProps, IRetailInventoryState> {

  constructor(props: IRetailInventoryProps) {
    super(props);
    
    this.state = {
      productCode: props.productCode,
      isLoading: true
    }
  }

  public render(): React.ReactElement<IRetailInventoryProps> {

    const content: JSX.Element = <Dashboard widgets={this.getRetailInventoryWidgets()} />;

    return (
      <div className={styles.retailInventory}>
        {this.state.isLoading && <Spinner size={SpinnerSize.large} title={strings.Generic.Loading} className={styles.loader} />}
        {!this.state.isLoading && content}
      </div>
    );
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 500);
  }

  /*
  * Get the home Retail Inventory widgets
  * @returns An array of the widgets to be added to the Retail Inventory element
  */
  private getRetailInventoryWidgets() : IWidget[] {
    return [
     {
      title: strings.Inventory.ListProductsWidgetTitle,
      size: WidgetSize.Box,
      body: [
        {
          id: "listProducts",
          title: strings.Inventory.ListProductsWidgetTitle,
          content: (
            this.getListProducts()
          )
        }
      ]
     },
     {
      title: strings.Inventory.SingleProductWidgetTitle,
      size: WidgetSize.Box,
      body: [
        {
          id: "singleProduct",
          title: strings.Inventory.SingleProductWidgetTitle,
          content: (
            this.getSingleProduct()
          )
        }
      ]
     }
    ];
  }
 
  /**
  * Get the content for the List Products widget
  * @returns Element representing the List Products widget
  */
  private getListProducts(): JSX.Element {
    return <InventoryList
      retailDataService={this.props.retailDataService}
      settingsService={this.props.settingsService}
      productSelected={(productCode) => {
        this.setState({
          productCode: productCode
        })
      }}
      productCode={this.state.productCode}
    />;
  }

  /**
  * Get the content for the List Products widget
  * @returns Element representing the List Products widget
  */
  private getSingleProduct(): JSX.Element {

    const {
      productCode
    } = this.state;

    return <SingleProduct
      retailDataService={this.props.retailDataService}
      settingsService={this.props.settingsService}
      productCode={productCode}
    />;
  }
}
