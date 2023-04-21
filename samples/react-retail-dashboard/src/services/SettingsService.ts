// Import the service related types
import { ISettingsService } from './ISettingsService';
import { RetailSettings } from './RetailSettings';

// Import types for supporting SPFx with the service class
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
// import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";

/**
 * Defines the concrete implementation of the interface for the Settings Service
 */
export class SettingsService implements ISettingsService {

    public static readonly serviceKey: ServiceKey<ISettingsService> = ServiceKey.create<ISettingsService>('PnP:Retail:SettingsService', SettingsService);
    
    // private _msGraphClient: MSGraphClientV3 = null;

    /**
     * Constructor for the service class
     * @param serviceScope Service Scope to initialize the service class
     */
    public constructor(serviceScope: ServiceScope) {

        // Initialize the MSGraphClientV3 client
        serviceScope.whenFinished(async () => {
            // const msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
            // this._msGraphClient = await msGraphClientFactory.getClient('3');
            return;
        });
    }

    /**
     * Saves the settings
     */
    public async Save(settings: RetailSettings): Promise<void> {
        return;
    }

    /**
     * Loads the settings
     */
    public async Load(): Promise<RetailSettings> {
        return null;        
    }

    /**
     * Retrieves the Teams App Id for deep linking
    */
    public async GetTeamsAppId(): Promise<string> {

        const manifest: { id: string } = await require("../../teams/manifest.json");

        // const response: { value: { id: string }[] } = await this._msGraphClient
        //                             .api("appCatalogs/teamsApps")
        //                             .version("v1.0")
        //                             .filter(`externalId eq '${manifest.id}'`)
        //                             .select("id")
        //                             .get();

        // return response.value[0].id;
        
        return manifest.id;
    }

}
