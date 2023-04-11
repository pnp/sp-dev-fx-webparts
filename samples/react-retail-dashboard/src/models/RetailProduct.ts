/**
 * Defines a Retail Product
 */
export interface RetailProduct {

    // The product code
    code: string;

    // The product name/description
    description: string;

    // The product price
    price: number;

    // The product picture URL
    picture: string;

    // The product launch date
    launchDate: Date;

    // The sales of the product
    sales: number;
}
