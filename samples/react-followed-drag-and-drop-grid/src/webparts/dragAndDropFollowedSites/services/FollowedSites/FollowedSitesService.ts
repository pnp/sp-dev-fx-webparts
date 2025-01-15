import { SPHttpClient } from '@microsoft/sp-http';

export default class FollowedSitesService {

    private client: SPHttpClient = null;
    private url: string = '';

    constructor(client: SPHttpClient, url: string) {
        this.client = client;
        this.url = url;
    }

    public async getMyFollowedSites(): Promise<any> {
        return new Promise<any>((resolve, reject) =>
            this.client
                .get(`${this.url}/_api/social.following/my/followed(types=4)`, SPHttpClient.configurations.v1)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            if (data && data.value) {
                                resolve(data.value);
                            }
                        });
                    }
                }));
    }
}