import { MSGraphClient, AadTokenProvider } from "@microsoft/sp-http";
import { Filters } from "../Entities/EnumFilters";
import { sp } from "@pnp/sp";
import "@pnp/sp/sites";
import { Web } from "@pnp/sp/webs";

import { Webs, IWebs } from "@pnp/sp/webs";
import { graph } from "@pnp/graph";
import { dateAdd, PnPClientStorage } from "@pnp/common";

import "@pnp/graph/groups";
import "@pnp/sp/search";
import {
  SearchResults,
  SearchQueryBuilder,
  SortDirection,
  ISearchResult
} from "@pnp/sp/search";
import { IWebInfo } from "@pnp/spfx-controls-react";
import {ITeam } from  "../Entities/ITeam";

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
    filter?: Filters,
    site?:string
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
     /*  case Filters.OneDrive:
        _filter = " WebTemplate:SPSPERS"; // OneDrive
     //   _filter = " SiteGroup:Onedrive";
        break; */
      case Filters.SharePoint:
        _filter =
          " SiteGroup:SharePoint AND NOT(GroupId:b* OR GroupId:c* OR GroupId:d* OR GroupId:e* OR GroupId:f* OR GroupId:g* OR GroupId:h* OR GroupId:i* OR GroupId:j* OR GroupId:k* OR GroupId:l* OR GroupId:m* OR GroupId:n* OR GroupId:o* OR GroupId:p* OR GroupId:q* OR GroupId:r* OR GroupId:s* OR GroupId:t* OR GroupId:u* OR GroupId:v* OR GroupId:w* OR GroupId:x* OR GroupId:y* OR GroupId:z* OR GroupId:1* OR GroupId:2* OR GroupId:3* OR GroupId:4* OR GroupId:5* OR GroupId:6* OR GroupId:7* OR GroupId:8* OR GroupId:9* OR GroupId:0*)";
        break;
        case Filters.Site:
          _filter = `Path:${site}`;

          break;
    }

    const q = SearchQueryBuilder(
      `(contentclass:STS_Site OR contentclass:STS_Web) AND -Webtemplate:SPSPERS* ${_filter} ${_searchString}`
    )
      .rowLimit(itemsPerPage ? itemsPerPage : 20)
      .enableSorting.sortList({
        Property: "LastModifiedTime",
        Direction: SortDirection.Descending,
      })
      .selectProperties(
        "ParentLink",
        "SPSiteURL",
        "SiteID",
        "SPWebUrl",
        "WebId",
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
        "Path",
        "Title",
        "Created",
        "WebTemplate"
      );
    const results = await sp.search(q);
    searchResults = results; // set the current results
  
    return searchResults;
  };

// Get User Sites
const getUserWebs = async (

): Promise<SearchResults> => {
  let searchResults: SearchResults = null;
  const q = SearchQueryBuilder(
    `(contentclass:STS_Web AND -Webtemplate:SPSPERS*)`
  )
    .rowLimit(100000)
    .selectProperties(
      "ParentLink",
      "SPSiteURL",
      "SiteID",
      "SPWebUrl",
      "WebId",
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
      "Path",
      "Title",
      "Created",
      "WebTemplate"
    );
  const results = await sp.search(q);
  searchResults = results; // set the current results
 
  return searchResults;
};


// Get User Sites
const getUserGroups = async (

  ): Promise<SearchResults> => {
    let searchResults: SearchResults = null;
    const _filter = ` AND GroupId:a* OR GroupId:b* OR GroupId:c* OR GroupId:d* OR GroupId:e* OR GroupId:f* OR GroupId:g* OR GroupId:h* OR GroupId:i* OR GroupId:j* OR GroupId:k* OR GroupId:l* OR GroupId:m* OR GroupId:n* OR GroupId:o* OR GroupId:p* OR GroupId:q* OR GroupId:r* OR GroupId:s* OR GroupId:t* OR GroupId:u* OR GroupId:v* OR GroupId:w* OR GroupId:x* OR GroupId:y* OR GroupId:z* OR GroupId:1* OR GroupId:2* OR GroupId:3* OR GroupId:4* OR GroupId:5* OR GroupId:6* OR GroupId:7* OR GroupId:8* OR GroupId:9* OR GroupId:0*`;
    const q = SearchQueryBuilder(
      `(contentclass:STS_Site AND -Webtemplate:SPSPERS*) ${_filter}`
    )
      .rowLimit(100000)
      .selectProperties(
        "ParentLink",
        "SPSiteURL",
        "SiteID",
        "SPWebUrl",
        "WebId",
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
        "Path",
        "Title",
        "Created",
        "WebTemplate"
      );
    const results = await sp.search(q);
    searchResults = results; // set the current results
    
    return searchResults;
  };
  

  // Get Properties for Web
  const getSiteProperties = async (webUrl:string) : Promise<any> => {

    const cachedWebIdValue:any = storage.local.get(webUrl);
    if (!cachedWebIdValue){
      const _openWeb = Web(webUrl);
      const _webProps = await _openWeb();
      
      storage.local.put(webUrl,  _webProps, dateAdd(new Date(), "day", 1));
      //we got all the data from the web as well
      return    _webProps.Title;
    }
   
    // we can chain
   
    return cachedWebIdValue.Title;
  };



  const getUserTeams = async (userId:string,msGraphClient:MSGraphClient):Promise<ITeam[]> =>  {

 
    const cachedListTeamsValue:ITeam[] = storage.local.get(userId);
    if (!cachedListTeamsValue) {
      try {
        const _listOfTeams:  any = await msGraphClient
          .api(`/me/joinedTeams`)
          .version("V1.0")
          .get();
          // put a value into storage with an expiration
        storage.local.put(userId, _listOfTeams.value , dateAdd(new Date(), "day", 1));
        return  _listOfTeams.value as any[];

      } catch (error) {
       
          // put a value into storage with an expiration
        storage.local.put(userId, [], dateAdd(new Date(), "day", 1));
        return [];
      }
    }else{
      // return cached value
      return cachedListTeamsValue ;
    }

};

  return { getUserSites, checkGroupHasTeam, getUserWebs, getUserGroups, getSiteProperties, getUserTeams };
};
