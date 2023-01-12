import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";

export default class GraphService {
	private msGraphClientFactory: MSGraphClientFactory;

  public static readonly serviceKey: ServiceKey<GraphService> =
    ServiceKey.create<GraphService>('react-office-create-offer-config', GraphService);

  constructor(serviceScope: ServiceScope) {  
    serviceScope.whenFinished(async () => {
      this.msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);  
    });
  }

  public async getPersonalSiteUrl(): Promise<string> {
    const downloadUrl = await this.getDownloadUrl();
    const siteUrl = await this.getSiteUrl(downloadUrl);        
    return siteUrl;
  }

  public async storePersonalSiteUrl(siteUrl: string): Promise<void> {
    const settings = { siteUrl: siteUrl };
    return this.msGraphClientFactory.getClient('3').then((client: MSGraphClientV3) => {
      client
        .api('/me/drive/special/approot:/createOffer/settings.json:/content')
        .header('content-type', 'text/plain')
        .put(JSON.stringify(settings));
      return Promise.resolve();
    });
  }

  private async getDownloadUrl(): Promise<string> {
    const client: MSGraphClientV3 = await this.msGraphClientFactory.getClient('3');
    const response = await client
            .api('/me/drive/special/approot:/createOffer/settings.json:/?select=@microsoft.graph.downloadUrl')
            .get();
    console.log(response);
    const downloadUrl: string = response['@microsoft.graph.downloadUrl'];
    return Promise.resolve(downloadUrl);
  }

  private async getSiteUrl(downloadUrl: string): Promise<string> {    
    return fetch(downloadUrl)
      .then(async (response) => {
        const httpResp = await response.json();
        return httpResp.siteUrl;
      })
      .catch(error => {
        console.log(error);
        return "";
      });
  }
}