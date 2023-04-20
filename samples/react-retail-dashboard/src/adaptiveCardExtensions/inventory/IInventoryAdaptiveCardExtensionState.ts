import { RetailProduct } from "../../models";

export interface IInventoryAdaptiveCardExtensionState {
    products: RetailProduct[];
    currentProduct: RetailProduct;
    currentIndex: number;
}