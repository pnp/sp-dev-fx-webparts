export interface ISPDataService {

  GetWebProperties(webUrl: string, selectFields: string[]): Promise<any>;
}
