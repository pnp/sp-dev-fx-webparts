import { 
    RetailReturnVolumes, 
    RetailReturnReasonsStats, 
    RetailInventory, 
    RetailCustomerSatisfactionStats, 
    RetailQuarterlyRevenues, 
    RetailProduct 
} from "../models";

/**
 * Defines the abstract interface for the Retail Data Service
 */
export interface IRetailDataService {

    /**
     * Loads the Retail Return Volumes
     */
    LoadReturnVolumes: () => Promise<RetailReturnVolumes>;

    /**
     * Loads the Retail Return Reason stats
     */
    LoadReturnReasonStats: () => Promise<RetailReturnReasonsStats>;

    /**
     * Loads the Retail Inventory
     */
    LoadInventory: () => Promise<RetailInventory>;

    /**
     * Loads the Retail Customer Satisfaction stats
     */
    LoadCustomerSatisfactionStats: () => Promise<RetailCustomerSatisfactionStats>;

    /**
     * Loads the Retail Quarterly Revenues stats (for the last 4 quarters)
     */
    LoadQuarterlyRevenues: () => Promise<RetailQuarterlyRevenues[]>;

    /**
     * Loads the Retail Top Seller Product
     */
    GetTopSellerProduct: () => Promise<RetailProduct>;

    /**
     * Loads the list of Retail Products on launch
     */
    ListProductsOnLaunch: () => Promise<RetailProduct[]>;

    /**
     * Loads the list of Retail Products in the inventory
     */
    ListProductsInventory: () => Promise<RetailProduct[]>;
}