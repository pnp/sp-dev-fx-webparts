import { AadHttpClient } from '@microsoft/sp-http';

export class DataverseTableService{
    constructor(protected httpClient: AadHttpClient, protected dataverseEnvUri: string, protected tableName: string) {
    }
    public async getData(filter?:string,select?: string): Promise<{
        '@odata.context': string;
        value: any[];
        '@odata.count': number
    }>{
        let urlBase = `${this.dataverseEnvUri}/api/data/v9.2/${this.tableName}s`;
        const queryParams = [];
        if (filter) {
            queryParams.push(`$filter=${filter}`);
        }
        if (select) {
            queryParams.push(`$select=${select}`);
        }
        queryParams.push(`$count=true`)
        if (queryParams.length > 0) {
            urlBase += `?${queryParams.join('&')}`;
        }
        const response = await this.httpClient.get(urlBase, AadHttpClient.configurations.v1,{
            headers:{
                'Accept': 'application/json',
                'OData-MaxVersion': '4.0',
                'OData-Version': '4.0',
            }
        })
        if(response.ok){
            return await response.json();
        }
        const error = await response.json();
        throw new Error(error.error?.message);
    }
}