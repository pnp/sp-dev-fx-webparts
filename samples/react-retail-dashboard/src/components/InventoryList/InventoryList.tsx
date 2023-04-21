import * as React from "react";
import styles from './InventoryList.module.scss';
import * as strings from 'RetailInventoryWebPartStrings';

import { IInventoryListProps } from "./IInventoryListProps";
import { IInventoryListState } from "./IInventoryListState";
import { RetailProduct } from "../../models";

import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";

export class InventoryList extends React.Component<IInventoryListProps, IInventoryListState> {

    private productsViewFields: IViewField[] = [
        {
            name: "picture",
            displayName: strings.Inventory.PictureLabel,
            render: (item?: any, index?: number, column?: any): JSX.Element => {
              const pictureValue: string = item.picture;
              return <div className={styles.productImageWrapper}><img className={styles.productImage} src={pictureValue} /></div>;
            },
            minWidth: 50,
            maxWidth: 50
        },
        {
            name: "code",
            displayName: strings.Inventory.CodeLabel,
            sorting: false,
            minWidth: 50,
            maxWidth: 50
        },
        {
            name: "description",
            displayName: strings.Inventory.DescriptionLabel,
            sorting: true
        },
        {
            name: "price",
            displayName: strings.Inventory.PriceLabel,
            sorting: true,
            minWidth: 50,
            maxWidth: 50,
            render: (item?: any, index?: number, column?: any): JSX.Element => {
                const priceValue: string = item.price;
                return <div>{`${priceValue}`}$</div>;
            },
        },
        {
            name: "sales",
            displayName: strings.Inventory.SalesLabel,
            render: (item?: any, index?: number, column?: any): JSX.Element => {
                const salesValue: number = item.sales;
                return <div className={styles.sales}>{`${salesValue?.toLocaleString('en-US')}`}</div>;
            },
            minWidth: 50,
            maxWidth: 50
        }
    ];

    constructor(props: IInventoryListProps) {
        super(props);

        this.state = {
            products: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the products
        const products = await this.getProducts();

        // Set the state
        this.setState({
          products: products
        });
    }

    private async getProducts(): Promise<RetailProduct[]> {
        // Get the products
        const result = await this.props.retailDataService.ListProductsInventory();
        return result;
    }
    
    public render(): React.ReactElement<IInventoryListProps> {

        const {
          products
        } = this.state;

        return (
            <div>
            {products ? 
                <div className={styles.inventoryList}>
                    <ListView
                        className={styles.inventoryListView}
                        iconFieldName="none"
                        items={products}
                        viewFields={this.productsViewFields}
                        compact={true}
                        selectionMode={this.props.productSelected ? SelectionMode.single : SelectionMode.none}
                        selection={this.getSelection}
                        showFilter={false}
                        stickyHeader={true}
                    />
                </div>
                :
                <div>No Inventory data found!</div>
            }
            </div>
        );
    }

    private getSelection = (items: any[]): void => {
        this.props.productSelected(items[0].code);
    }
}