import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { IAward } from "../models/IAward";
import { MSGraphClientFactory, HttpClientResponse } from "@microsoft/sp-http";
import { IListAwardsResponse } from "../models/IListAwardsResponse";

export interface IAwardsService {
    getMyAwards(): Promise<IAward[]>;
}

export default class AwardsService implements IAwardsService {
    private readonly GraphMyAwardsEndpoint: string = 'https://graph.microsoft.com/beta/me/profile/awards';
    private _msGraphClientFactory: MSGraphClientFactory;

    constructor(serviceScope:ServiceScope) { 
        serviceScope.whenFinished(async () => { 
            this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
        });
    }
    
    public async getMyAwards(): Promise<IAward[]> {
        const msGraphClient = await this._msGraphClientFactory.getClient("3");

        const listAwardsResponse: IListAwardsResponse = await msGraphClient.api(this.GraphMyAwardsEndpoint).get();

        return listAwardsResponse.value || [];
    }    
}

export const AwardsServiceKey = ServiceKey.create<IAwardsService>("atlas:featuresService", AwardsService);