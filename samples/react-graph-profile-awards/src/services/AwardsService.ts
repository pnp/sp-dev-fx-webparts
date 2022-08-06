import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { IAward } from "../models/IAward";
import { MSGraphClientFactory } from "@microsoft/sp-http";
import { IListAwardsResponse } from "../models/IListAwardsResponse";

export interface IAwardsService {
    getMyAwards(userId: string): Promise<IAward[]>;
}

export default class AwardsService implements IAwardsService {
    private readonly GraphMyAwardsEndpoint: string = 'https://graph.microsoft.com/beta/users/{userId}/profile/awards';
    private _msGraphClientFactory: MSGraphClientFactory;

    constructor(serviceScope:ServiceScope) { 
        serviceScope.whenFinished(async () => { 
            this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
        });
    }
    
    public async getMyAwards(userId: string): Promise<IAward[]> {
        const msGraphClient = await this._msGraphClientFactory.getClient("3");
        const endpoint = this.GraphMyAwardsEndpoint.replace('{userId}', userId); // It works with ObjectId and LoginName
        const listAwardsResponse: IListAwardsResponse = await msGraphClient
            .api(endpoint)
            .orderby('issuedDate desc')
            .get();

        return listAwardsResponse.value || [];
    }    
}

export const AwardsServiceKey = ServiceKey.create<IAwardsService>("pnp:awardsService", AwardsService);