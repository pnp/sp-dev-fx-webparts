/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFx } from '@pnp/sp';
import { ISearchResultExtended } from "./ISearchResultExtended";

import { IFacepilePersona } from "@fluentui/react";
import { graphfi, graphGet, GraphQueryable, SPFx as graphSPFx } from "@pnp/graph";
import "@pnp/graph/batching";
import "@pnp/graph/onedrive";
import "@pnp/graph/search";
import "@pnp/graph/users";
import { Logger, LogLevel, PnPLogging } from "@pnp/logging";
import { Caching } from "@pnp/queryable";
import "@pnp/sp/presets/all";
import "@pnp/sp/search";
import "@pnp/sp/sharing";
import "@pnp/sp/webs";
import { ISharingResult } from "./ISharingResult";
import { convertToFacePilePersona, convertUserToFacePilePersona, processUsers, uniqForObject } from "./Utils";

export default interface IDataProvider {
  getSharingLinks(listItems: Record<string, any>): Promise<ISharingResult[]>;
  getSearchResults(): Promise<Record<string, any>>;
  loadAssociatedGroups(): Promise<void>;
}

export default class DataProvider implements IDataProvider {
  private webpartContext: WebPartContext;
  private isTeams: boolean;
  private siteUrl: string;
  private tenantId: string;
  private groupId: string;
  private isPrivateChannel:boolean = true;
  private sp: any;
  private graph: any;
  private standardGroups: string[] = [];

  constructor(context: WebPartContext) {
    this.webpartContext = context;

    this.sp = spfi().using(SPFx(this.webpartContext), Caching);
    this.graph = graphfi().using(graphSPFx(this.webpartContext), Caching).using(PnPLogging(LogLevel.Warning));

    if (this.webpartContext.sdks.microsoftTeams) {
      this.isTeams = true;
    }

    if (this.isTeams) {
      this.siteUrl = this.webpartContext.sdks.microsoftTeams.context.teamSiteUrl;
      this.tenantId = this.webpartContext.sdks.microsoftTeams.context.tid;
      this.groupId =  this.webpartContext.sdks.microsoftTeams.context.groupId;
      this.isPrivateChannel = (this.webpartContext.sdks.microsoftTeams.context.channelType == "Private");
    }
    else {
      this.siteUrl = this.webpartContext.pageContext.web.absoluteUrl;
      this.tenantId = this.webpartContext.pageContext.aadInfo.tenantId;
    }
  }

  public async loadAssociatedGroups(): Promise<void> {
    // Gets the associated visitors group of a web
    const visitorsGroup = await this.sp.web.associatedVisitorGroup.select("Title")();
    this.standardGroups.push(visitorsGroup.Title);

    // Gets the associated members group of a web
    const membersGroup = await this.sp.web.associatedMemberGroup.select("Title")();
    this.standardGroups.push(membersGroup.Title);

    // Gets the associated owners group of a web
    const ownersGroup = await this.sp.web.associatedOwnerGroup.select("Title")();
    this.standardGroups.push(ownersGroup.Title);
  }

  private async getDriveItemsBySearchResult(listItems: Record<string, any>): Promise<Record<string, any>> {
    const driveItems: Record<string, any> = {};

    const [batchedGraph, execute] = this.graph.batched();
    batchedGraph.using(Caching());

    // for each file, we need to get the permissions
    // eslint-disable-next-line guard-for-in
    for (const fileId in listItems) {
      const file = listItems[fileId];
      // the permissions endpoint on the driveItem is not (yet?) exposed in pnpjs, so we need to use the graphQueryable
      const driveItemQuery = batchedGraph.drives.getById(file.DriveId).getItemById(file.DriveItemId);
      // adding the permissions endpoint
      const graphQueryable = GraphQueryable(driveItemQuery, "permissions")
      // getting the permissions and adding the request to the batch
      graphGet(GraphQueryable(graphQueryable)).then(r => {
        driveItems[fileId] = r;
      });
    }

    // Executes the batched calls
    await execute();

    return driveItems;
  }

  public async getSharingLinks(listItems: Record<string, any>): Promise<ISharingResult[]> {
    const sharedResults: ISharingResult[] = [];
    const driveItems = await this.getDriveItemsBySearchResult(listItems);

    // now we have all the data we need, we can start building up the result
    // eslint-disable-next-line guard-for-in
    for (const fileId in driveItems) {
      const driveItem = driveItems[fileId];
      const file = listItems[fileId];

      let sharedWithUser: IFacepilePersona[] = [];
      let sharingUserType = "Member";

      // Getting all the details of the file and in which folder is lives
      let folderUrl = file.Path.replace(`/${file.FileName}`, '');
      let folderName = folderUrl.lastIndexOf("/") > 0 ? folderUrl.substring(folderUrl.lastIndexOf("/") + 1) : folderUrl;

      // for certain filetypes we get the dispform.aspx link back instead of the full path, so we need to fix that
      if (folderName.indexOf("DispForm.aspx") > -1) {
        folderUrl = folderUrl.substring(0, folderUrl.lastIndexOf("/Forms/DispForm.aspx"));
        folderName = folderUrl.lastIndexOf("/") > 0 ? folderUrl.substring(folderUrl.lastIndexOf("/") + 1) : folderUrl;
        file.FileExtension = file.FileName.substring(file.FileName.lastIndexOf(".") + 1);
      }

      file.FileUrl = file.Path;
      file.FolderUrl = folderUrl;
      file.FolderName = folderName;
      file.FileId = fileId;

      

      // if a file has inherited permissions, the propery is returned as "inheritedFrom": {}
      // if a file has unique permissions, the propery is not returned at all
      driveItem.forEach(permission => {
        if (permission.link) {
          switch (permission.link.scope) {
            case "anonymous":
              break;
            case "organization": {
              const _user: IFacepilePersona = {};
              _user.personaName = permission.link.scope + " " + permission.link.type;
              _user.data = "Organization";
              if (sharedWithUser.indexOf(_user) === -1) {
                sharedWithUser.push(_user);
              }
              break;
            }
            case "users": {
              const _users = convertToFacePilePersona(permission.grantedToIdentitiesV2);
              sharedWithUser.push(..._users);
              break;
            }
            default:
              break;
          }
        }
        else // checking the normal permissions as well, other than the sharing links
        {
          // if the permission is not the same as the default associated spo groups, we need to add it to the sharedWithUser array
          if (this.standardGroups.indexOf(permission.grantedTo.user.displayName) === -1) {
            const _users = convertUserToFacePilePersona(permission.grantedToV2);
            sharedWithUser.push(_users);
          }
          else // otherwise, we're gonna add these groups and mark it as inherited permissions
          {
            const _user: IFacepilePersona = {};
            _user.personaName = permission.grantedTo.user.displayName;
            _user.data = "Inherited";
            if (sharedWithUser.indexOf(_user) === -1) {
              sharedWithUser.push(_user);
            }
          }
        }
      });

      if (file.SharedWithUsersOWSUSER !== null) {
        const _users = processUsers(file.SharedWithUsersOWSUSER);
        sharedWithUser.push(..._users);
      }

      // if there are any duplicates, this will remove them (e.g. multiple organization links)
      sharedWithUser = uniqForObject(sharedWithUser);
      if (sharedWithUser.length === 0)
        continue;

    
      let isGuest = false;
      let isLink = false;
      let isInherited = false;

      for (const user of sharedWithUser) {
        switch(user.data)
        {
          case "Guest":isGuest = true;break;
          case "Organization":isLink = true;break;
          case "Inherited":isInherited = true;break;
        }
      }

      // if we found a guest user, we need to set the sharingUserType to Guest
      if (isGuest) {
        sharingUserType = "Guest";
      }
      else if (isLink) { 
        sharingUserType = "Link";
      }
      else if (isInherited) {
        sharingUserType = "Inherited";
      }

      // building up the result to be returned
      const sharedResult: ISharingResult =
      {
        FileExtension: (file.FileExtension == null) ? "folder" : file.FileExtension,
        FileName: file.FileName,
        Channel: file.FolderName,
        LastModified: file.LastModifiedTime,
        SharedWith: sharedWithUser,
        ListId: file.ListId,
        ListItemId: file.ListItemId,
        Url: file.FileUrl,
        FolderUrl: file.FolderUrl,
        SharingUserType: sharingUserType,
        FileId: file.FileId,
        SiteUrl: file.SiteUrl
      };
      sharedResults.push(sharedResult);
      Logger.writeJSON(sharedResult, LogLevel.Verbose);
    }
    return sharedResults;
  }

  public async getSearchResults(): Promise<Record<string, any>> {
    const listItems: Record<string, any> = {};
    let searchResults: any[] = [];
    searchResults = await this.fetchSearchResultsAll(0, searchResults);

    searchResults.forEach(results => {
      results.forEach(result => {
        result.hitsContainers.forEach(hits => {
          hits.hits.forEach(hit => {
            const SharedWithUsersOWSUser = (hit.resource.listItem.fields.sharedWithUsersOWSUSER != undefined) ? hit.resource.listItem.fields.sharedWithUsersOWSUSER : null;
            
            // if we don't get a driveId back (e.g. documentlibrary), then skip the returned item
            if (hit.resource.listItem.fields.driveId == undefined)
                return;

            const result: ISearchResultExtended = {
              DriveItemId: hit.resource.id,
              FileName: hit.resource.listItem.fields.fileName,
              FileExtension: hit.resource.listItem.fields.fileExtension,
              ListId: hit.resource.listItem.fields.listId,
              FileId: hit.resource.listItem.id,
              DriveId: hit.resource.listItem.fields.driveId,
              ListItemId: hit.resource.listItem.fields.listItemId,
              Path: hit.resource.webUrl,
              LastModifiedTime: hit.resource.lastModifiedDateTime,
              SharedWithUsersOWSUSER: SharedWithUsersOWSUser,
              SiteUrl:hit.resource.listItem.fields.spSiteUrl
            }
            listItems[result.FileId] = result;
            Logger.writeJSON(result, LogLevel.Verbose);
          });
        });
      });
    });

    return listItems;
  }

  private async fetchSearchResultsAll(page: number, searchResults?: any[]): Promise<any> {
    if (page === 0) {
      searchResults = [];
    }

    const everyoneExceptExternalsUserName = `spo-grid-all-users/${this.tenantId}`;

    // the query consists of checking for the following things:
    // - IsDocument:TRUE OR IsContainer:TRUE -> we only want to return documents and folders
    // - NOT FileExtension:aspx -> we don't want to return aspx pages
    // - (SharedWithUsersOWSUSER:*) OR (SharedWithUsersOWSUSER:${everyoneExceptExternalsUserName} OR SharedWithUsersOWSUser:Everyone) -> we only want to return items that are shared with someone
    // - (GroupId:${this.groupId} OR RelatedGroupId:${this.groupId}) -> we only want to return items that are in the current group
    // - SPSiteUrl:${this.siteUrl} -> we only want to return items that are in the current site
    // - size: 500 -> we want to return 500 items per page
    // - from: ${page} -> we want to return the next page of results
    
    const query = (this.isTeams && !this.isPrivateChannel) ? 
    `(IsDocument:TRUE OR IsContainer:TRUE) AND (NOT FileExtension:aspx) AND ((SharedWithUsersOWSUSER:*) OR (SharedWithUsersOWSUSER:${everyoneExceptExternalsUserName} OR SharedWithUsersOWSUser:Everyone)) AND (GroupId:${this.groupId} OR RelatedGroupId:${this.groupId})`
    : `(IsDocument:TRUE OR IsContainer:TRUE) AND (NOT FileExtension:aspx) AND ((SharedWithUsersOWSUSER:*) OR (SharedWithUsersOWSUSER:${everyoneExceptExternalsUserName} OR SharedWithUsersOWSUser:Everyone)) AND (SPSiteUrl:${this.siteUrl})`

    Logger.write(`Issuing search query: ${query}`, LogLevel.Verbose);
    const results = await this.graph.query({
      entityTypes: ["driveItem", "listItem"],
      query: {
        queryString: `${query}`
      },
      fields: ["path", "id", "driveId", "driveItemId", "listId", "listItemId", "fileName", "fileExtension", "webUrl", "lastModifiedDateTime", "lastModified", "SharedWithUsersOWSUSER","SPSiteUrl"],
      from: `${page}`,
      size: 500
    });

    searchResults.push(results);

    if (results[0].hitsContainers[0].moreResultsAvailable) {
      searchResults = await this.fetchSearchResultsAll(page + 500, searchResults)
    }

    
    return searchResults;
  }
}