import { MSGraphClient } from '@microsoft/sp-http';

export default class FollowedSitesService {

    private graphClient: MSGraphClient = null;

    constructor(graphClient: MSGraphClient) {
        this.graphClient = graphClient;
    }

    public async getMyFollowedSites(): Promise<any> {
        return new Promise<any>((resolve, reject) =>
            this.graphClient
                .api('/me/followedSites?$top=1000')
                .version('v1.0')
                .get((error, response: any, rawResponse?: any) => {
                    if (error) {
                        resolve(error);
                    }

                    resolve(response);
                }));
    }
}