import { Text } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export class GroupService {

    private spHttpClient: SPHttpClient;
    constructor(spHttpClient: SPHttpClient) {
        this.spHttpClient = spHttpClient;
    }

    public async getGroupFromWeb(webUrl: string, groupId: number) {
        const endpoint = `${webUrl}/_api/Web/SiteGroups/GetById(${groupId})`;
        let res = await this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
        let group = await res.json();

        return group;
    }
}
