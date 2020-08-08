import { MSGraphClient, AadTokenProvider } from "@microsoft/sp-http";
import { Filters } from "../Entities/EnumFilters";
import { sp } from "@pnp/sp";
import { graph } from "@pnp/graph";
import { dateAdd, PnPClientStorage } from "@pnp/common";

import "@pnp/graph/groups";
import "@pnp/sp/search";
import {
  SearchResults,
  SearchQueryBuilder,
  SortDirection,
} from "@pnp/sp/search";


const storage = new PnPClientStorage();

export const useUserSites = () => {
  // Check if group has team

  const checkGroupHasTeam = async (
    groupId: string,
    msGraphClient: MSGraphClient
  ): Promise<boolean> => {
    // Check if value alreqdy cached
    const cachedValue:string = storage.local.get(groupId);
    if (!cachedValue) {
      try {
        const _teamInfo: any = await msGraphClient
          .api(`/groups/${groupId}/team`)
          .version("V1.0")
          .get();
          // put a value into storage with an expiration
        storage.local.put(groupId, "true", dateAdd(new Date(), "day", 1));
        return true;

      } catch (error) {
        // Team don't exists or user don' have acess
          // put a value into storage with an expiration
        storage.local.put(groupId, "false", dateAdd(new Date(), "day", 1));
        return false;
      }
    }else{
      // return cached value
      return cachedValue == 'true' ? true : false;
    }
  };
  // Get User Sites
  const getUserSites = async (
    searchString?: string,
    itemsPerPage?: number,
    filter?: Filters
  ): Promise<SearchResults> => {
    let searchResults: SearchResults = null;
    let _filter: string = "";
    let _searchString: string = searchString ? `Title:${searchString}*` : "";
    switch (filter) {
      case Filters.All:
        _filter = "";
        break;
      case Filters.Group:
        _filter = ` GroupId:a* OR GroupId:b* OR GroupId:c* OR GroupId:d* OR GroupId:e* OR GroupId:f* OR GroupId:g* OR GroupId:h* OR GroupId:i* OR GroupId:j* OR GroupId:k* OR GroupId:l* OR GroupId:m* OR GroupId:n* OR GroupId:o* OR GroupId:p* OR GroupId:q* OR GroupId:r* OR GroupId:s* OR GroupId:t* OR GroupId:u* OR GroupId:v* OR GroupId:w* OR GroupId:x* OR GroupId:y* OR GroupId:z* OR GroupId:1* OR GroupId:2* OR GroupId:3* OR GroupId:4* OR GroupId:5* OR GroupId:6* OR GroupId:7* OR GroupId:8* OR GroupId:9* OR GroupId:0*`;
        break;
      case Filters.OneDrive:
        _filter = " SiteGroup:Onedrive";
        break;
      case Filters.SharePoint:
        _filter =
          " SiteGroup:SharePoint AND NOT(GroupId:b* OR GroupId:c* OR GroupId:d* OR GroupId:e* OR GroupId:f* OR GroupId:g* OR GroupId:h* OR GroupId:i* OR GroupId:j* OR GroupId:k* OR GroupId:l* OR GroupId:m* OR GroupId:n* OR GroupId:o* OR GroupId:p* OR GroupId:q* OR GroupId:r* OR GroupId:s* OR GroupId:t* OR GroupId:u* OR GroupId:v* OR GroupId:w* OR GroupId:x* OR GroupId:y* OR GroupId:z* OR GroupId:1* OR GroupId:2* OR GroupId:3* OR GroupId:4* OR GroupId:5* OR GroupId:6* OR GroupId:7* OR GroupId:8* OR GroupId:9* OR GroupId:0*)";
        break;
    }

    const q = SearchQueryBuilder(
      `(contentclass:STS_Site OR contentclass:STS_Web) ${_filter} ${_searchString}`
    )
      .rowLimit(itemsPerPage ? itemsPerPage : 20)
      .enableSorting.sortList({
        Property: "LastModifiedTime",
        Direction: SortDirection.Descending,
      })
      .selectProperties(
        "SiteLogo",
        "SiteClosed",
        "RelatedHubSites",
        "IsHubSite",
        "GroupId",
        "RelatedGroupId",
        "SiteGroup",
        "Author",
        "CreatedBy",
        "CreatedById",
        "AccountName",
        "ModifiedBy",
        "ModifiedById",
        "LastModifiedTime",
        "OriginalPath",
        "Title",
        "Created"
      );
    const results = await sp.search(q);
    searchResults = results; // set the current results
    console.log(searchResults);
    return searchResults;
  };

  return { getUserSites, checkGroupHasTeam };
};
