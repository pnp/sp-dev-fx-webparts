import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graph } from "@pnp/graph";
import { sp, PeoplePickerEntity, ClientPeoplePickerQueryParameters, SearchQuery, SearchResults, SearchProperty, SortDirection } from '@pnp/sp';
import { PrincipalType } from "@pnp/sp/src/sitegroups";
import { isRelativeUrl } from "office-ui-fabric-react";
import { ISPServices } from "./ISPServices";


export class spservices implements ISPServices {



  constructor(private context: WebPartContext) {

    sp.setup({
      spfxContext: this.context

    });
  }


  public async searchUsers(searchString: string, searchFirstName: boolean): Promise<SearchResults> {
    const _search = !searchFirstName ? `LastName:${searchString}*` : `FirstName:${searchString}*`;
    const searchProperties: string[] = ["FirstName", "LastName", "PreferredName", "WorkEmail", "OfficeNumber", "PictureURL", "WorkPhone", "MobilePhone", "JobTitle", "Department", "Skills", "PastProjects", "BaseOfficeLocation", "SPS-UserType", "GroupId"];
    try {
      if (!searchString) return undefined;
      let users = await sp.searchWithCaching(<SearchQuery>{
        Querytext: _search,
        RowLimit: 500,
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
