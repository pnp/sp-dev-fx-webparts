import * as React from "react";
import styles from './ProductsOnLaunch.module.scss';
import { IProductsOnLaunchProps } from "./IProductsOnLaunchProps";
import { IProductsOnLaunchState } from "./IProductsOnLaunchState";
import { RetailProduct } from "../../models";

export class ProductsOnLaunch extends React.Component<IProductsOnLaunchProps, IProductsOnLaunchState> {

    private timer: number;
    private currentIndex: number = 0;

    constructor(props: IProductsOnLaunchProps) {
        super(props);

        this.state = {
            products: undefined,
            currentProduct: undefined
        };
    }

    public async componentDidMount(): Promise<void> {

        // Get the top seller product
        const productsOnLaunch = await this.getProductsOnLaunch();

        // Set the state
        this.setState({
            products: productsOnLaunch,
            currentProduct: productsOnLaunch[0]
        });

        this.timer = setInterval(async () => {

            if (this.state.products) {
                // Set the current index
                this.currentIndex = this.currentIndex >= (this.state.products.length - 1) ? 0 : this.currentIndex + 1;

                // Update the state
                this.setState({
                    currentProduct: this.state.products[this.currentIndex]
                });
            }
        }, 5000);
    }

    componentWillUnmount(): void {
        clearInterval(this.timer);
    }

    private async getProductsOnLaunch(): Promise<RetailProduct[]> {
        // Get the top seller product via the service
        const result = await this.props.retailDataService.ListProductsOnLaunch();
        return result;
    }
    
    public render(): React.ReactElement<IProductsOnLaunchProps> {

        const {
            currentProduct
        } = this.state;

        return (
            <div>
            {currentProduct ? 
                <div className={styles.productsOnLaunch}>
                    <div className="row">
                        <div className="col-md-12">
                            <img src={currentProduct.picture} className={styles.productPicture} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.productLaunchDate}>Due {currentProduct.launchDate.getMonth() + 1}/{currentProduct.launchDate.getDate()}/{currentProduct.launchDate.getFullYear()}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.productDescription}>The &apos;{currentProduct.description}&apos; line is scheduled for launch on {currentProduct.launchDate.getMonth() + 1}/{currentProduct.launchDate.getFullYear()}</div>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            No Products on Launch found!
                        </div>
                    </div>
                </div>
            }
            </div>
        );
    }
}