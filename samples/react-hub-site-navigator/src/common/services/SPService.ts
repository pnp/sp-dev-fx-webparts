import "@pnp/sp/webs";
import "@pnp/sp/hubsites";
import "@pnp/sp/hubsites/web";
import "@pnp/sp/search";
import "@pnp/sp/sites";
import "@pnp/sp/batching";
import "@pnp/sp/security";
import { PermissionKind } from "@pnp/sp/security";
import { IWebInfo, Web } from "@pnp/sp/webs";
import { IAssociatedHubSiteInfo } from "../models/IAssociatedHubSiteInfo";
import { webInfoSelectFields } from "../constants/constant";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx as spSPFx } from "@pnp/sp";
import { IHubSiteInfo } from "@pnp/sp/hubsites";

export class SPService {
  private readonly context: WebPartContext;
  private readonly sp: SPFI;
  constructor(context: WebPartContext) {
    this.context = context;
    this.sp = spfi().using(spSPFx(context));
  }

  public async getHubSites(): Promise<IHubSiteInfo[]> {
    return await this.sp.hubSites();
  }

  public readonly getAssociatedHubSites = async (): Promise<IAssociatedHubSiteInfo[]> => {
    const results = await this.sp.search({
      Querytext: `DepartmentId:* AND contentclass:STS_Site`,
      SelectProperties: ["Title", "Path", "SiteId", "DepartmentId", "Description"],
    });
    return results.PrimarySearchResults as IAssociatedHubSiteInfo[];
  };

  public readonly getWebDetails = async (webUrl: string): Promise<IWebInfo> => {
    const details = Web(webUrl)
      .using(spSPFx(this.context))
      .select(...webInfoSelectFields)();
    return details;
  };

  public readonly userHasFullControl = async (url: string): Promise<boolean> => {
    return Web(url).using(spSPFx(this.context)).currentUserHasPermissions(PermissionKind.FullMask);
  };
}
