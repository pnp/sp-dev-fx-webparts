import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { AadHttpClientFactory, AadHttpClient, HttpClientResponse } from "@microsoft/sp-http";

const config = require('./azFunct.json');

export default class FunctionService {
  private aadHttpClientFactory: AadHttpClientFactory;
  private client: AadHttpClient;

  public static readonly servicaeKey: ServiceKey<FunctionService> =
    ServiceKey.create<FunctionService>('react-site-secure-function-call-smpl', FunctionService);

  constructor(serviceScope: ServiceScope) {  
    serviceScope.whenFinished(async () => {
      this.aadHttpClientFactory = serviceScope.consume(AadHttpClientFactory.serviceKey);      
    });
  }

  public async setNewSiteDescreption(siteUrl: string, siteDescreption: string): Promise<boolean> {
    this.client = await this.aadHttpClientFactory.getClient(`${config.appIdUri}`);    
    const requestUrl = `${config.hostUrl}/api/SiteFunction?URL=${siteUrl}&Descreption=${siteDescreption}`;    
    return this.client
      .get(requestUrl, AadHttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        return response.ok;
      });

    // POST alternative
    /* const requestUrl = `http://localhost:7241/api/SiteFunction`;
    const requestBody = {      
      URL: siteUrl,
      Descreption: siteDescreption
    };
    return this.client
      .post(requestUrl, AadHttpClient.configurations.v1,
        { 
          body: JSON.stringify(requestBody) 
        }
      )   
      .then((response: HttpClientResponse) => {
        return response.json();
      }); */
  }

}