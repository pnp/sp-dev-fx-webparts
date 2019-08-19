import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graph } from "@pnp/graph";
import { sp } from '@pnp/sp';
import { ITreeChildren } from "../webparts/treeOrgChart/components/ITreeChildren";



export default class spservices {



  constructor(private context:WebPartContext) {

    sp.setup({
      spfxContext: this.context

    });
  }

  public async getUserProperties(user:string){

    let currentUserProperties:any = await sp.profiles.getPropertiesFor(user);
    console.log(currentUserProperties);

    return currentUserProperties;
  }

  /**
   * async GetUserProfileProperty
user:string   */
  public async getUserProfileProperty(user:string,property:string) {
    let UserProperty:any = await sp.profiles.getUserProfilePropertyFor(user, property);
    console.log(UserProperty);

    return UserProperty;
  }

   
}
