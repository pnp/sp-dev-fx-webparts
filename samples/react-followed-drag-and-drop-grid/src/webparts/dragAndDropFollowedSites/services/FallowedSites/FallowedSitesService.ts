import { MSGraphClient } from '@microsoft/sp-http';

export default class FallowedSitesService {

    private graphClient: MSGraphClient = null;

    constructor(graphClient: MSGraphClient) {
        this.graphClient = graphClient;
    }

    public async getMyFallowedSites(): Promise<any> {
        return new Promise<any>((resolve, reject) =>
            this.graphClient
                .api('/me/followedSites')
                .version('v1.0')
                .get((error, response: any, rawResponse?: any) => {
                    if (error) {
                        resolve(error);
                    }

                    resolve(response);
                }));
    }
}