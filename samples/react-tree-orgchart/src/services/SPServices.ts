/* eslint-disable @typescript-eslint/no-explicit-any */
import {WebPartContext} from "@microsoft/sp-webpart-base";
import {  spfi, SPFI,  } from "@pnp/sp";

import { Caching } from "@pnp/queryable";
import { getSP } from "../webparts/treeOrgChart/components/pnpjsConfig";

export default class SPServices {
  private sp: SPFI;
  constructor(private context: WebPartContext) {
    this.sp = getSP(this.context);
  }

  public async getUserProperties(user: string):Promise<any> {
    const spCache = spfi(this.sp).using(Caching({ store: "session" }));

    return await spCache.profiles.getPropertiesFor(user);
  }

  /**
   * async GetUserProfileProperty
   * user:string
   */
  public async getUserProfileProperty(user: string, property: string): Promise<string> {
    const spCache = spfi(this.sp).using(Caching({ store: "session" }));
    const UserProperty: string = await spCache.profiles.getUserProfilePropertyFor(
      user,
      property
    );

    return UserProperty;
  }
}
