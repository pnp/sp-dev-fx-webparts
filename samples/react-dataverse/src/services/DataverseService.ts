import { AadHttpClient } from '@microsoft/sp-http';
export class DataverseService {
    constructor(protected httpClient: AadHttpClient, protected dataverseEnvUri: string) {

    }
    public async getAvailableTables(): Promise<{id: string, entityName: string, displayName: string}[]>{
        const entitiesResponse = await this.httpClient.get(`${this.dataverseEnvUri}/api/data/v9.1/EntityDefinitions?$select=LogicalName,DisplayName&$filter=IsValidForAdvancedFind eq true`, AadHttpClient.configurations.v1)
        if(entitiesResponse.ok){
            const entities = await entitiesResponse.json();
            return entities.value.map((entity: {LogicalName: string, DisplayName: {
                UserLocalizedLabel: {
                    Label: string
                }
            }}) => {
                return {
                    id: entity.LogicalName,
                    entityName: entity.LogicalName,
                    displayName: entity.DisplayName.UserLocalizedLabel.Label
                }
            });
        }
        const error = await entitiesResponse.json();
        throw new Error(error.error?.message);
    }
}