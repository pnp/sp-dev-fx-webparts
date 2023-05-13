import { MSGraphClientV3 } from "@microsoft/sp-http";
import { SitePage } from "./types";


export interface IGraphService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GetWebParts(client: MSGraphClientV3, siteId: string, pageId: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GetSitePages(client: MSGraphClientV3, siteId: string): Promise<any>;
}



class GraphService implements IGraphService {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async GetWebParts(client: MSGraphClientV3, siteId: string, pageId: string): Promise<any> {
    try{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawWebParts: any = await this.GET(client, "sites/" + siteId + "/pages/" + pageId + "/webparts","","");
      return rawWebParts;
    } catch (error){
      return null;
    }
    
    
  }

  public async GetSitePages(client: MSGraphClientV3, siteId: string): Promise<SitePage[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawPages: any = await this.GET(client, "sites/" + siteId + "/pages", "", "id,title");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rawPages.value.flatMap((rawPage: any) => (
      [
        {
          id: rawPage.id,
          title: rawPage.title
        }
      ]
    ));
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private GET(client: MSGraphClientV3, api: string, filter?: string, select?: string, top?: number, responseType?: any): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<any>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      client.api(api).version("beta").select(select).filter(filter).responseType(responseType)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .get((error: any, response: any) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(response);
        });
    });
  }
}
export const GraphServiceInstance = new GraphService();

