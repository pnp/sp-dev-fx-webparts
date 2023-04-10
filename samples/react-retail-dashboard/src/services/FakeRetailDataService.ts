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
import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";

/**
 * Defines the concrete implementation of the interface for the Retail Data Service
 */
export class FakeRetailDataService implements IRetailDataService {

    public static readonly serviceKey: ServiceKey<IRetailDataService> = ServiceKey.create<IRetailDataService>('PnP:Retail:RetailDataService', FakeRetailDataService);
    
    private _msGraphClient: MSGraphClientV3 = null;

    /**
     * Constructor for the service class
     * @param serviceScope Service Scope to initialize the service class
     */
    public constructor(serviceScope: ServiceScope) {

        // Initialize the MSGraphClientV3 client
        serviceScope.whenFinished(async () => {
            const msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
            this._msGraphClient = await msGraphClientFactory.getClient('3');
        });
    }

    /**
     * Loads the Retail Return Volumes
     */
    public async LoadReturnVolumes(): Promise<RetailReturnVolumes> {
        return null;
    }

    /**
     * Loads the Retail Return Reason stats
     */
    public async LoadReturnReasonStats(): Promise<RetailReturnReasonsStats> {
        return null;
    }

    /**
     * Loads the Retail Inventory
     */
    public async LoadInventory(): Promise<RetailInventory> {
        return null;
    }

    /**
     * Loads the Retail Customer Satisfaction stats
     */
    public async LoadCustomerSatisfactionStats(): Promise<RetailCustomerSatisfactionStats> {
        return null;
    }

    /**
     * Loads the Retail Quarterly Revenues stats (for the last 4 quarters)
     */
    public async LoadQuarterlyRevenues(): Promise<RetailQuarterlyRevenues[]> {
        return null;
    }

    /**
     * Loads the Retail Top Seller Product
     */
    public async GetTopSellerProduct(): Promise<RetailProduct> {
        return null;
    }

    /**
     * Loads the list of Retail Products on launch
     */
    public async ListProductOnLaunch(): Promise<RetailProduct> {
        return null;
    }

    /**
     * Loads the list of Retail Products in the inventory
     */
    public async ListProductsInventory(): Promise<RetailProduct[]> {
        return null;
    }
}
