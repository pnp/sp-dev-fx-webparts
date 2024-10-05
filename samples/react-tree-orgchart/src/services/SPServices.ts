import {WebPartContext} from "@microsoft/sp-webpart-base";
import { ISPFXContext, spfi, SPFI, SPFx as spSPFx } from "@pnp/sp";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import { Caching } from "@pnp/queryable";
import { getSP } from "../webparts/treeOrgChart/components/pnpjsConfig";

export default class SPServices {
  private sp: SPFI;
  constructor(private context: WebPartContext) {
    this.sp = getSP();
  }

  public async getUserProperties(user: string) {
    const spCache = spfi(this.sp).using(Caching({ store: "session" }));

    return await spCache.profiles.getPropertiesFor(user);
  }

  /**
   * async GetUserProfileProperty
   * user:string
   */
  public async getUserProfileProperty(user: string, property: string) {
    let UserProperty: any = await sp.profiles.getUserProfilePropertyFor(
      user,
      property
    );

    return UserProperty;
  }
}
