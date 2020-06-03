import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graph } from "@pnp/graph";
import { sp, PeoplePickerEntity, ClientPeoplePickerQueryParameters, SearchQuery, SearchResults, SearchProperty, SortDirection } from '@pnp/sp';
import { PrincipalType } from "@pnp/sp/src/sitegroups";
import { isRelativeUrl } from "office-ui-fabric-react";


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

  public async searchUsers(searchString: string, searchFirstName:boolean) {
    const _search =  !searchFirstName ? `LastName:${searchString}*` :  `FirstName:${searchString}*` ;
    const searchProperties: string[] = ["FirstName", "LastName", "PreferredName", "WorkEmail", "OfficeNumber","PictureURL", "WorkPhone", "MobilePhone", "JobTitle", "Department", "Skills", "PastProjects", "BaseOfficeLocation", "SPS-UserType","GroupId"];
    try {
      if (!searchString) return undefined;
      let users = await sp.searchWithCaching(<SearchQuery>{
        Querytext: _search,
        RowLimit:500,
        EnableInterleaving: true,
        SelectProperties: searchProperties,
        SourceId: 'b09a7990-05ea-4af9-81ef-edfab16c4e31',
        SortList: [{ "Property": "LastName", "Direction": SortDirection.Ascending }],
      });




      return users;
    } catch (error) {
      Promise.reject(error);
    }
  }
}
