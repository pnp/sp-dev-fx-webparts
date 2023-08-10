import { MSGraphClientV3 } from "@microsoft/sp-http";
import { GraphSitePage, GraphSitePageCollection, GraphWebPartCollection } from "./types";
import { BaseComponentContext } from "@microsoft/sp-component-base";

export interface IGraphService {
  GetWebParts(siteId: string, pageId: string): Promise<GraphWebPartCollection>;
  GetSitePages(siteId: string): Promise<GraphSitePage[]>;
}

export class GraphService implements IGraphService {
  private MSGraphClient: MSGraphClientV3;
  private Context: BaseComponentContext;

  constructor(Context: BaseComponentContext) {
    this.Context = Context;
  }

  private async Get_Client(): Promise<MSGraphClientV3> {
    if (this.MSGraphClient === undefined)
      this.MSGraphClient = await this.Context.msGraphClientFactory.getClient("3");
    return this.MSGraphClient;
  }

  public async GetWebParts(siteId: string, pageId: string): Promise<GraphWebPartCollection> {
    try {
      const client = await this.Get_Client();
      const retrievedWebParts: GraphWebPartCollection = await client.api("sites/" + siteId + "/pages/microsoft.graph.sitePage/" + pageId + "/webparts").version('beta').get();
      return retrievedWebParts;
    } catch (error) {
      return null;
    }
  }

  public async GetSitePages(siteId: string): Promise<GraphSitePage[]> {
    const pages: GraphSitePage[] = [];
    const client = await this.Get_Client();
    const retrievedPages: GraphSitePageCollection = await client.api("sites/" + siteId + "/pages/microsoft.graph.sitePage").select("id,title").version('beta').get();
    retrievedPages.value.forEach(page => {
      pages.push(
        {
          id: page.id,
          title: page.title
        }
      )
    });
    return pages;
  }
}

