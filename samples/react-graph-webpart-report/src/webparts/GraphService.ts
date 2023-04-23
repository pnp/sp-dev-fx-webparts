import { MSGraphClientV3 } from "@microsoft/sp-http";
import { SitePage } from "./types";


export interface IGraphService {
  GetWebParts(client: MSGraphClientV3, siteId: string, pageId: string): Promise<any>;
  GetSitePages(client: MSGraphClientV3, siteId: string): Promise<any>;
}



class GraphService implements IGraphService {
  constructor() { }

  public async GetWebParts(client: MSGraphClientV3, siteId: string, pageId: string): Promise<any> {
    try{
      const rawWebParts: any = await this.GET(client, "sites/" + siteId + "/pages/" + pageId + "/webparts","","");
      return rawWebParts;
    } catch (error){
      return null;
    }
    
    
  }

  public async GetSitePages(client: MSGraphClientV3, siteId: string): Promise<SitePage[]> {
    const rawPages: any = await this.GET(client, "sites/" + siteId + "/pages", "", "id,title");
    return rawPages.value.flatMap((rawPage: any) => (
      [
        {
          id: rawPage.id,
          title: rawPage.title
        }
      ]
    ));
  }


  private GET(client: MSGraphClientV3, api: string, filter?: string, select?: string, top?: number, responseType?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      client.api(api).version("beta").select(select).filter(filter).responseType(responseType)
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

