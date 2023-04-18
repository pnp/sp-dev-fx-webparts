import { RetailProduct } from "../../models";

export interface IProductsOnLaunchState {
    products: RetailProduct[];
    currentProduct: RetailProduct;
}