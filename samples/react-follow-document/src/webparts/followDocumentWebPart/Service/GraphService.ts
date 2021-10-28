import { AadHttpClient, MSGraphClientFactory, MSGraphClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class Graph {
  private client: MSGraphClient;

  public async initialize(serviceScope): Promise<boolean> {
    const graphFactory: MSGraphClientFactory = serviceScope.consume(
      MSGraphClientFactory.serviceKey
    );

    return graphFactory.getClient().then((client) => {
      this.client = client;
      return true;
    });
  }
  public async getGraphContent(graphQuery: string, context: WebPartContext) {
    // Using Graph here, but any 1st or 3rd party REST API that requires Azure AD auth can be used here.
    return new Promise<any>((resolve, reject) => {
      context.aadHttpClientFactory
        .getClient("https://graph.microsoft.com")
        .then((client: AadHttpClient) => {
          // Querys to Graph base on url
          return client.get(`${graphQuery}`, AadHttpClient.configurations.v1);
        })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
  public async postGraphContent(graphQuery: string,Header) {
    // Using Graph here, but any 1st or 3rd party REST API that requires Azure AD auth can be used here.
          const saveResult = await this.client
          .api(graphQuery)
          .post(JSON.stringify(Header));
        return saveResult;
  }
}
