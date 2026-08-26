import { IListItem } from '../models/IListItem';

export interface IDataFetcherService {
    getMySelectedWidgets(): Promise<string>;
    setMySelectedWidgets(ids: string[]): Promise<void>;
    getOrgWidgets(baseUrl: string): Promise<IListItem[]>
    executeMSGraphAPIRequest(api: string): Promise<JSON>;
    executeADSecureAPIRequest(api: string, clientId: string): Promise<JSON>;
    executePublicAPIRequest(api: string): Promise<JSON>;
}