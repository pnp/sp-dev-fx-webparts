import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graph } from "@pnp/graph";
import { sp, PeoplePickerEntity, ClientPeoplePickerQueryParameters } from '@pnp/sp';
import { PrincipalType } from "@pnp/sp/src/sitegroups";


export class spservices {



  constructor(private context: WebPartContext) {

    sp.setup({
      spfxContext: this.context

    });
  }

  public async getUserProperties(user: string): Promise<any> {

    try {
      let currentUserProperties: any = await sp.profiles.getPropertiesFor(user);
      return currentUserProperties;
    } catch (error) {
      Promise.reject(error);
    }
  }

  /**
   * async GetUserProfileProperty
user:string   */
  public async getUserProfileProperty(user: string, property: string): Promise<string> {
    try {
      let UserProperty: string = await sp.profiles.getUserProfilePropertyFor(user, property);
      console.log(UserProperty);
      return UserProperty;
    } catch (error) {
      Promise.reject(error);
    }
  }

  /**
   *
   * @param {string} searchUser
   * @memberof spservices
   */
  public async getUsers(searchUser: string): Promise<PeoplePickerEntity[]> {
    try {
      let users: PeoplePickerEntity[] = await sp.profiles.clientPeoplePickerSearchUser({ QueryString: searchUser, MaximumEntitySuggestions: 100, PrincipalType: 1 });
      return users;
    } catch (error) {
      Promise.reject(error);
    }
  }
}
