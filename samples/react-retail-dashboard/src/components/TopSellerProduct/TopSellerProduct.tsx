import * as React from "react";
import styles from './TopSellerProduct.module.scss';
import { ITopSellerProductProps } from "./ITopSellerProductProps";
import { ITopSellerProductState } from "./ITopSellerProductState";
import { RetailProduct } from "../../models";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

export class TopSellerProduct extends React.Component<ITopSellerProductProps, ITopSellerProductState> {

    constructor(props: ITopSellerProductProps) {
        super(props);

        this.state = {
            product: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the top seller product
        const topSellerProduct = await this.getTopSellerProduct();

        // Set the state
        this.setState({
            product: topSellerProduct
        });
    }

    private async getTopSellerProduct(): Promise<RetailProduct> {
        // Get the top seller product via the service
        const result = await this.props.retailDataService.GetTopSellerProduct();
        return result;
    }
    
    public render(): React.ReactElement<ITopSellerProductProps> {

        const {
            product
        } = this.state;

        return (
            <div>
            {product ? 
                <div className={styles.topSellerProduct}>
                    <div className="row">
                        <div className="col-md-12">
                            <img src={product.picture} className={styles.productPicture} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.productSales}>{product.sales.toLocaleString('en-US')}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.productDescription}>{product.description}</div>
                        </div>
                    </div>
                    <div className="row">
                        <DefaultButton text="View Details" />
                    </div>
                </div>
                :
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            No Top Seller Product found!
                        </div>
                    </div>
                </div>
            }
            </div>
        );
    }
}