/**
 * The inventory of the Retail in a specific date
 */
export interface RetailInventory {

    // The inventory date
    inventoryDate: Date; 
    
    // The number of womens products in the inventory
    womensItems: number;

    // The number of mens products in the inventory
    mensItems: number;

    // The number of accessories in the inventory
    accessoriesItems: number;

    // The number of handbags in the inventory
    handbagsItems: number;

    // The number of items on sale in the inventory
    salesItems: number;
}
