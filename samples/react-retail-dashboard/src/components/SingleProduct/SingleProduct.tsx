import * as React from "react";
import styles from './SingleProduct.module.scss';
import * as strings from 'RetailInventoryWebPartStrings';

import { ISingleProductProps } from "./ISingleProductProps";
import { ISingleProductState } from "./ISingleProductState";
import { RetailProduct } from "../../models";

import { css } from 'office-ui-fabric-react/lib/Utilities';

export class SingleProduct extends React.Component<ISingleProductProps, ISingleProductState> {

    constructor(props: ISingleProductProps) {
        super(props);

        this.state = {
            product: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the selected product
        await this.setSelectedProduct();
    }

    async componentDidUpdate(prevProps: Readonly<ISingleProductProps>, prevState: Readonly<ISingleProductState>, snapshot?: any): Promise<void> {
        if (this.props.productCode !== prevProps.productCode) {
            // Get the selected product
            await this.setSelectedProduct();
        }
    }

    private async getProducts(): Promise<RetailProduct[]> {
        // Get the products
        const result = await this.props.retailDataService.ListProductsInventory();
        return result;
    }

    private async setSelectedProduct(): Promise<void> {
        const products = await this.getProducts();

        // Get the product with the provided code, if any
        const product: RetailProduct = products.filter(p => p.code === this.props.productCode)[0];

        // Set the state
        this.setState({
            product: product
        });
    }
    
    public render(): React.ReactElement<ISingleProductProps> {

        const {
          product
        } = this.state;

        return (
            <div>
            {product ? 
                <div className={styles.singleProduct}>
                    <div className={styles.grid}>
                        <div className={styles.row}>
                            <div className={css(styles.column, styles.smallColumn)}>
                                <div className={styles.productImageWrapper}>
                                    <img className={styles.productImage} src={product.picture} alt={product.description} />
                                </div>
                            </div>
                            <div className={css(styles.column, styles.largeColumn)}>
                                <div className={styles.grid}>
                                    <div className={styles.row}>
                                        <div className={css(styles.smallColumn, styles.label)}>Code</div>
                                        <div className={css(styles.largeColumn, styles.code)}>{product.code}</div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={css(styles.smallColumn, styles.label)}>Description</div>
                                        <div className={css(styles.largeColumn, styles.description)}>{product.description}</div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={css(styles.smallColumn, styles.label)}>Price</div>
                                        <div className={css(styles.largeColumn, styles.price)}>${product.price}</div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={css(styles.smallColumn, styles.label)}>Sales</div>
                                        <div className={css(styles.largeColumn, styles.sales)}>{product.sales.toLocaleString('en-US')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={css(styles.singleProduct, styles.selectProduct)}>{strings.Inventory.SelectProduct}</div>
            }
            </div>
        );
    }
}