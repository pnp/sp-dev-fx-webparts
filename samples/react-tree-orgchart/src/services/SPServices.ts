import {WebPartContext} from "@microsoft/sp-webpart-base";
import {sp} from "@pnp/sp";

export default class SPServices {
  constructor(private context: WebPartContext) {
    sp.setup({
      spfxContext: this.context
    });
  }

  public async getUserProperties(user: string) {
    return await sp.profiles.getPropertiesFor(user);
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
