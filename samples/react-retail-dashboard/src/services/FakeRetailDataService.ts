// Import the service related types
import { IRetailDataService } from './IRetailDataService';
import { 
    RetailReturnVolumes, 
    RetailReturnReasonsStats, 
    RetailInventory, 
    RetailCustomerSatisfactionStats, 
    RetailQuarterlyRevenues, 
    RetailProduct 
} from "../models";

// Import types for supporting SPFx with the service class
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";

/**
 * Defines the concrete implementation of the interface for the Retail Data Service
 */
export class FakeRetailDataService implements IRetailDataService {

    public static readonly serviceKey: ServiceKey<IRetailDataService> = ServiceKey.create<IRetailDataService>('PnP:Retail:FakeRetailDataService', FakeRetailDataService);

    /**
     * Constructor for the service class
     * @param serviceScope Service Scope to initialize the service class
     */
    public constructor(serviceScope: ServiceScope) {

        // Initialize the MSGraphClientV3 client
        serviceScope.whenFinished(async () => {
            return;
        });
    }

    /**
     * Loads the Retail Return Volumes
     */
    public async LoadReturnVolumes(): Promise<RetailReturnVolumes> {
        const returnVolumesData: RetailReturnVolumes = await require('./data/returnVolumes.json');
        return returnVolumesData;
    }

    /**
     * Loads the Retail Return Reason stats
     */
    public async LoadReturnReasonStats(): Promise<RetailReturnReasonsStats> {
        const returnReasonsData: RetailReturnReasonsStats = await require('./data/returnReasons.json');
        return returnReasonsData;
    }

    /**
     * Loads the Retail Inventory
     */
    public async LoadInventory(): Promise<RetailInventory> {
        const inventoryData: {
            date: string; 
            womens: number;
            mens: number;
            accessories: number;
            handbags: number;
            sales: number;
        } = await require('./data/inventory.json');

        return {
            inventoryDate: new Date(inventoryData.date),
            womensItems: inventoryData.womens,
            mensItems: inventoryData.mens,
            accessoriesItems: inventoryData.accessories,
            handbagsItems: inventoryData.handbags,
            salesItems: inventoryData.sales
        };
    }

    /**
     * Loads the Retail Customer Satisfaction stats
     */
    public async LoadCustomerSatisfactionStats(): Promise<RetailCustomerSatisfactionStats> {
        const customerSatisfactionData: RetailCustomerSatisfactionStats = await require('./data/customerSatisfaction.json');
        return customerSatisfactionData;
    }

    /**
     * Loads the Retail Quarterly Revenues stats (for the last 4 quarters)
     */
    public async LoadQuarterlyRevenues(): Promise<RetailQuarterlyRevenues[]> {
        const quarterlyRevenues: RetailQuarterlyRevenues[] = await require('./data/quarterlyRevenues.json');
        return quarterlyRevenues;
    }

    /**
     * Loads the Retail Top Seller Product
     */
    public async GetTopSellerProduct(): Promise<RetailProduct> {
        const topSellerProduct: RetailProduct = await require('./data/topSeller.json');
        topSellerProduct.picture = await require('../assets/' + topSellerProduct.picture);
        return topSellerProduct;
    }

    /**
     * Loads the list of Retail Products on launch
     */
    public async ListProductsOnLaunch(): Promise<RetailProduct[]> {

        const result: RetailProduct[] = [];

        const productsOnLaunch: {
            code: string;
            description: string;
            price: number;
            picture: string;
            launchDate: string;
            sales: number;
        }[] = await require('./data/productsOnLaunch.json');

        // For each product, load the picture, fix the date and add it to the result
        for (const p of productsOnLaunch) {
            result.push(
                {
                    code: p.code,
                    description: p.description,
                    price: p.price,
                    sales: p.sales,
                    picture: await require('../assets/' + p.picture),
                    launchDate: new Date(p.launchDate)
                });
        }

        return result;
    }

    /**
     * Loads the list of Retail Products in the inventory
     */
    public async ListProductsInventory(): Promise<RetailProduct[]> {

        const result: RetailProduct[] = [];

        const products: {
            code: string;
            description: string;
            price: number;
            picture: string;
            launchDate: string;
            sales: number;
        }[] = await require('./data/products.json');

        // For each product, load the picture, fix the date and add it to the result
        for (const p of products) {
            result.push(
                {
                    code: p.code,
                    description: p.description,
                    price: p.price,
                    sales: p.sales,
                    picture: await require('../assets/' + p.picture),
                    launchDate: new Date(p.launchDate)
                });
        }

        return result;
    }
}
