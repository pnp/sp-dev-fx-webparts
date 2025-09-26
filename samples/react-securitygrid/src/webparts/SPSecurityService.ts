import { User } from "@microsoft/microsoft-graph-types";
import { AadHttpClient, AadHttpClientConfiguration } from "@microsoft/sp-http";
import { SPPermission } from "@microsoft/sp-page-context";
import { SPFI } from '@pnp/sp';
import { getSP } from '../pnpjs-config';

import { filter, find, includes } from "lodash";


interface SPRoleAssignmentObject {
  PrincipalId: number;
  RoleDefinitionBindings: Array<SPRoleDefinitionBindingObject>;
}

interface SPRoleDefinitionBindingObject {
  Id: number;
}

interface SPListItemResponse {
  GUID: string;
  FileSystemObjectType: number;
  Title: string;
  ContentTypeId: string;
  RoleAssignments: Array<SPRoleAssignmentObject>;
  File?: {
    Name: string;
    ServerRelativeUrl: string;
  };
  Folder?: {
    Name: string;
    ServerRelativeUrl: string;
    ItemCount: number;
  };
}

interface SPUser {
  Id: number;
  LoginName: string;
  Title: string;
  PrincipalType: number;
  UserId?: {
    NameId: string;
    NameIdIssuer: string;
  };
}

interface ADGroupResponse {
  value: Array<User>;
}

export interface ISPSecurableObject {
  id: string | number;
  roleAssignments: SPRoleAssignment[];
}

export class SPBasePermissions {
  public low: number;
  public high: number;
  public constructor(high: string, low: string) {
    this.high = parseInt(high, 10);
    this.low = parseInt(low, 10);
  }
}

export enum securableType {
  List
}

export class ADGroupId {
  public ADId: string;
  public SPId: number;
}

export class ADGroup {
  public id: ADGroupId;
  public members: Array<User>;
}

export class SPSiteGroup {
  public id: number;
  public title: string;
  public isHiddenInUI: boolean;
  public isShareByEmailGuestUse: boolean;
  public isSiteAdmin: boolean;
  public userIds: number[] = [];
  public adGroupIds: ADGroupId[] = [];
  public constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

export class SPSiteUser {
  public name: string;
  public id?: number;
  public userId?: SPExternalUser;
  public upn: string;
  public isSelected: boolean = false;
  public principalType: number = 0;
  public adId?: string;
  public isAdGroup: boolean = false;
}

export class SPRoleDefinition {
  public id: number;
  public basePermissions: SPBasePermissions;
  public description: string;
  public hidden: boolean;
  public name: string;
  public constructor(id: number, basePermissions: SPBasePermissions, description: string, hidden: boolean, name: string) {
    this.id = id;
    this.basePermissions = basePermissions;
    this.description = description;
    this.hidden = hidden;
    this.name = name;
  }
}

export class SPSecurityInfo {
  public siteUsers: SPSiteUser[] = [];
  public siteGroups: SPSiteGroup[] = [];
  public roleDefinitions: SPRoleDefinition[] = [];
  public adGroups: ADGroup[] = [];
  public lists: (SPList | SPListItem)[] = [];
}

export class SPList implements ISPSecurableObject {
  public title: string = "";
  public id: string = "";
  public hidden: boolean = false;
  public serverRelativeUrl: string = "";
  public type: securableType = securableType.List;
  public itemCount: number = 0;
  public roleAssignments: SPRoleAssignment[] = [];
  public isExpanded: boolean = false;
  public isFetched: boolean = false;
  public isFetching: boolean = false;
  public hasBeenRetrieved: boolean = false;
  public isSelected: boolean = false;
}

export class SPListItem implements ISPSecurableObject {
  public id: string = "";
  public parentId: string = "";
  public listTitle: string = "";
  public type: string = "";
  public itemCount: number = 0;
  public title: string = "";
  public serverRelativeUrl: string = "";
  public roleAssignments: SPRoleAssignment[] = [];
  public isExpanded: boolean = false;
  public isFetched: boolean = false;
  public isFetching: boolean = false;
  public isSelected: boolean = false;
  public hasBeenRetrieved: boolean = false;
  public level: number = 0;
  public iconName: string = "";
}

export class SPExternalUser {
  public nameId: string = "";
  public nameIdIssuer: string = "";
}

export class SPRoleAssignment {
  public roleDefinitionIds: number[] = [];
  public principalId: number = 0;
}

export class Helpers {
  private static _roleAssignmentCache: Map<string, SPRoleAssignment[]> = new Map();

  public static doesUserHaveAnyPermission(
    securableObjects: ISPSecurableObject[],
    user: SPSiteUser,
    siteUsers: SPSiteUser[],
    requestedpermissions: SPPermission[],
    roles: SPRoleDefinition[],
    siteGroups: SPSiteGroup[],
    adGroups: ADGroup[]
  ): boolean {
    for (const securableObject of securableObjects) {
      for (const requestedpermission of requestedpermissions) {
        if (Helpers.doesUserHavePermission(securableObject, user, siteUsers, requestedpermission, roles, siteGroups, adGroups)) {
          return true;
        }
      }
    }
    return false;
  }

  public static doesUserHavePermission(
    securableObject: ISPSecurableObject,
    user: SPSiteUser,
    siteUsers: SPSiteUser[],
    requestedpermission: SPPermission,
    roles: SPRoleDefinition[],
    siteGroups: SPSiteGroup[],
    adGroups: ADGroup[]
  ): boolean {
    const permissions: SPBasePermissions[] = Helpers.getUserPermissionsForObject(securableObject, user, siteUsers, roles, siteGroups, adGroups);
    for (const permission of permissions) {
      if (
        ((permission.low & requestedpermission.value.Low) === (requestedpermission.value.Low)) &&
        ((permission.high & requestedpermission.value.High) === (requestedpermission.value.High))
      ) {
        return true;
      }
    }
    return false;
  }

  public static getBasePermissionsForRoleDefinitionIds(
    selectedRoleDefinitionIds: number[],
    roleDefinitions: SPRoleDefinition[]
  ): Array<SPBasePermissions> {
    const basePermissions: SPBasePermissions[] = [];
    for (const selectedRoleDefinitionId of selectedRoleDefinitionIds) {
      for (const roleDefinition of roleDefinitions) {
        if (roleDefinition.id === selectedRoleDefinitionId) {
          basePermissions.push(roleDefinition.basePermissions);
        }
      }
    }
    return basePermissions;
  }

  public static getUserPermissionsForObject(
    securableObject: ISPSecurableObject,
    user: SPSiteUser,
    siteUsers: SPSiteUser[],
    roles: SPRoleDefinition[],
    siteGroups: SPSiteGroup[],
    adGroups: ADGroup[]
  ): SPBasePermissions[] {
    const userRoleAssignments: SPRoleAssignment[] = Helpers.GetRoleAssignmentsForUser(securableObject, user, siteUsers, siteGroups, adGroups);
    const roleDefinitionIds: number[] = [];

    for (const roleAssignment of userRoleAssignments) {
      for (const roleDefinitionID of roleAssignment.roleDefinitionIds) {
        roleDefinitionIds.push(roleDefinitionID);
      }
    }
    return Helpers.getBasePermissionsForRoleDefinitionIds(roleDefinitionIds, roles);
  }

  public static GetRoleAssignmentsForUser(
    securableObject: ISPSecurableObject,
    user: SPSiteUser,
    siteUsers: SPSiteUser[],
    groups: SPSiteGroup[],
    adGroups: ADGroup[]
  ): SPRoleAssignment[] {
    // Create cache key from securable object ID and user ID// decrease reneder time bty 30%
    const cacheKey = `${securableObject.id}_${user.id || user.upn}`;
    
    // Check cache first
    if (this._roleAssignmentCache.has(cacheKey)) {
      return this._roleAssignmentCache.get(cacheKey)!;
    }

    const selectedRoleAssignments: SPRoleAssignment[] = [];
    
    // const AdUsersGroups = siteUsers.filter(
    //   u => u.isAdGroup &&
    //     filter(adGroups, adgroup => adgroup.id.ADId === u.upn && adgroup.members.filter(m => m.userPrincipalName?.toLowerCase() === user.upn).length > 0)
    // );


    const AdUsersGroups = siteUsers.filter(
      u => u.isAdGroup

    );
    const x2 = filter(AdUsersGroups, (groupUser) => {
      const adgroup = find(adGroups, (adg) => {
        return adg.id.ADId === groupUser.upn && find(adg.members, (m) => m.userPrincipalName?.toLowerCase() === user.upn);

      });
      if (adgroup) {
        return true;
      }
      return false;

    });
    const ids = x2.map(u => { return u.id; });
    
    // test if role assignment is for this specific user, or his SP groups
    for (const roleAssignment of securableObject.roleAssignments) {
      const group: SPSiteGroup | undefined = find(groups, (g) => g.id === roleAssignment.principalId);
      if (group) {
        if (this.userIsInGroup(user.id!, group.id, groups)) {
          selectedRoleAssignments.push(roleAssignment);
        }
        if (this.userIsInGroupsNestAdGroups(user.adId!, group.id, groups, adGroups)) {
          selectedRoleAssignments.push(roleAssignment);
        }
      } else if (user.id === roleAssignment.principalId) {
        selectedRoleAssignments.push(roleAssignment);
      }
    }
    // test if role assignment is for one of her AD Groups
    for (const roleAssignment of securableObject.roleAssignments) {
      if (ids.includes(roleAssignment.principalId)) {
        selectedRoleAssignments.push(roleAssignment);
      }
    }
    
    // Cache the result before returning
    this._roleAssignmentCache.set(cacheKey, selectedRoleAssignments);
    
    return selectedRoleAssignments;
  }

  public static userIsInGroup(userId: number, groupId: number, groups: SPSiteGroup[]): boolean {
    const group: SPSiteGroup = this.findGroup(groupId, groups);
    return includes(group.userIds, userId);
  }

  public static userIsInGroupsNestAdGroups(
    userAdId: string,
    groupId: number,
    groups: SPSiteGroup[],
    adGroups: ADGroup[]
  ): boolean {
    const group: SPSiteGroup = this.findGroup(groupId, groups);
    for (const adGrouId of group.adGroupIds) {
      const adGroup = find(adGroups, (adg) => adg.id.ADId === adGrouId.ADId);
      if (adGroup && find(adGroup.members, (aduser) => aduser.id === userAdId)) {
        return true;
      }
    }
    return false;
  }

  public static findGroup(groupId: number, groups: SPSiteGroup[]): SPSiteGroup {
    return find(groups, (g) => g.id === groupId)!;
  }
}

export default class SPSecurityService {
  public siteUrl: string;
  private sp: SPFI;

  public constructor(siteUrl: string) {
    this.siteUrl = siteUrl;
    this.sp = getSP();
  }

  // Adjust the loadFolderRoleAssignmentsDefinitionsMembers method with proper types
  public loadFolderRoleAssignmentsDefinitionsMembers(
    listTitle: string,
    folderServerRelativeUrl: string,
    parentId: string,
    level: number
  ): Promise<SPListItem[]> {
    const caml: { ViewXml: string } = {
      ViewXml: "<View Scope='RecursiveAll'><Query><Where><Eq><FieldRef Name='FileDirRef'/><Value Type='Lookup'>" + folderServerRelativeUrl + "</Value></Eq></Where></Query></View>"
    };

    return this.sp.web.lists
      .getByTitle(listTitle)
      .getItemsByCAMLQuery(caml, "ContentTypeId", "File", "Folder", "Folder/ParentFolder", "File/ParentFolder", "RoleAssignments", "RoleAssignments/RoleDefinitionBindings", "RoleAssignments/Member", "RoleAssignments/Member/Users", "RoleAssignments/Member/Groups")
      .then((response: SPListItemResponse[]) => { // Now typed correctly
        const itemsToAdd: SPListItem[] = response.map((listItem: SPListItemResponse) => {
          const itemToAdd: SPListItem = new SPListItem();
          itemToAdd.id = listItem.GUID;
          itemToAdd.parentId = parentId;
          itemToAdd.level = level;
          itemToAdd.listTitle = listTitle;

          // Use FileSystemObjectType to distinguish between folder and file/list item
          if (listItem.FileSystemObjectType === 1 && listItem.Folder) {
            itemToAdd.type = 'Folder';
            itemToAdd.title = listItem.Folder.Name;
            itemToAdd.serverRelativeUrl = listItem.Folder.ServerRelativeUrl;
            itemToAdd.itemCount = listItem.Folder.ItemCount;
          } else if (listItem.File) {
            itemToAdd.type = 'File';
            itemToAdd.title = listItem.File.Name;
            itemToAdd.serverRelativeUrl = listItem.File.ServerRelativeUrl;
          } else {
            itemToAdd.type = 'ListItem';
            itemToAdd.title = listItem.Title;
          }

          itemToAdd.isExpanded = false;
          itemToAdd.hasBeenRetrieved = false;
          itemToAdd.roleAssignments = listItem.RoleAssignments.map((roleAssignmentObject: SPRoleAssignmentObject) => ({
            roleDefinitionIds: roleAssignmentObject.RoleDefinitionBindings.map((rdb: SPRoleDefinitionBindingObject) => rdb.Id),
            principalId: roleAssignmentObject.PrincipalId,
          }));

          return itemToAdd;
        });
        return itemsToAdd;
      });
  }

  public async loadData(showHiddenLists: boolean, showCatalogs: boolean, aadHttpClient: AadHttpClient): Promise<SPSecurityInfo> {
    const securityInfo: SPSecurityInfo = new SPSecurityInfo();
    const errors: string[] = [];

    // Get site users
    try {
      const siteUsersResponse = await this.sp.web.siteUsers();
      securityInfo.siteUsers = siteUsersResponse.map((u: SPUser) => {
        const upn: string = u.LoginName.split('|')[2];
        const user: SPSiteUser = new SPSiteUser();
        user.isSelected = true;
        user.id = u.Id;
        user.name = u.Title;
        user.principalType = u.PrincipalType;
        user.upn = upn ? upn.toLowerCase() : u.Title;
        if (u.UserId) {
          user.userId = { nameId: u.UserId.NameId, nameIdIssuer: u.UserId.NameIdIssuer };
        }
        const loginNameParts = u.LoginName.split('|');
        if (u.PrincipalType == 4 && loginNameParts[1] == 'tenant') { // its a group
          user.isAdGroup = true;
          const groupId = loginNameParts[2];
          this.fetchAdGroupById(aadHttpClient, groupId)
            .then((adGroup: ADGroup) => {
              if (adGroup) {
                securityInfo.adGroups.push(adGroup);
                for (const adUser of adGroup.members) {
                  const siteUser = find(securityInfo.siteUsers, (su) => su.upn === adUser.userPrincipalName?.toLowerCase());
                  if (siteUser) {
                    siteUser.adId = adUser.id;
                  } else {
                    const user: SPSiteUser = new SPSiteUser();
                    user.adId = adUser.id;
                    user.name = adUser.displayName + "*";
                    user.upn = adUser.userPrincipalName || adUser.displayName;
                    user.isSelected = true;
                    user.principalType = -1;
                    securityInfo.siteUsers.push(user);
                  }
                }
              }
            }).catch(() => {
              debugger;
            });
        }

        return user;
      });
    } catch (err) {
      errors.push(`There was an error fetching site users -- ${err.message}`);
    }

    // Get site groups with users, filtering out 'Limited Access System Group'
    try {
      const siteGroupsResponse = await this.sp.web.siteGroups
        //  .filter(`Title ne 'Limited Access System Group'`)  // Add the filter to exclude this group
        .expand("Users")  // Expand users for each group
        .select("Title", "Id", "IsHiddenInUI", "IsShareByEmailGuestUse", "IsSiteAdmin", "Users/Id", "Users/LoginName", "Users/PrincipalType")();  // Select required fields

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      securityInfo.siteGroups = siteGroupsResponse.map((grp: any) => {
        const siteGroup: SPSiteGroup = new SPSiteGroup(grp.Id, grp.Title);
        for (const user of grp.Users) {
          if (user.PrincipalType === 4) {  // 4 = Security group
            const adgroupid = new ADGroupId();
            adgroupid.ADId = user.LoginName.split('|')[2];  // Ensure ADId is a string
            adgroupid.SPId = user.Id.toString();  // Convert SPId to string
            siteGroup.adGroupIds.push(adgroupid);
          } else {
            siteGroup.userIds.push(user.Id);  // SPId is numeric, no conversion needed here
          }
        }
        return siteGroup;
      });
    } catch (err) {
      errors.push(`There was an error fetching site groups -- ${err.message}`);
    }

    // Get role definitions
    try {
      const roleDefinitionsResponse = await this.sp.web.roleDefinitions.expand("BasePermissions")();
      securityInfo.roleDefinitions = roleDefinitionsResponse.map((rd) => {
        const bp: SPBasePermissions = new SPBasePermissions(rd.BasePermissions.High.toString(), rd.BasePermissions.Low.toString());
        return new SPRoleDefinition(rd.Id, bp, rd.Description, rd.Hidden, rd.Name);
      });
    } catch (err) {
      errors.push(`There was an error fetching role definitions -- ${err.message}`);
    }

    // Get lists with RoleAssignments, RootFolder, etc.
    try {
      const filters: string[] = [];
      if (!showHiddenLists) {
        filters.push("Hidden eq false");
      }
      if (!showCatalogs) {
        filters.push("IsCatalog eq false");
      }
      const subFilter = filters.join(" and ");

      const listsResponse = await this.sp.web.lists
        .expand("RootFolder", "RoleAssignments", "RoleAssignments/RoleDefinitionBindings", "RoleAssignments/Member", "RoleAssignments/Member/Users", "RoleAssignments/Member/Groups", "RoleAssignments/Member/UserId")
        .filter(subFilter)();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      securityInfo.lists = listsResponse.map((listObject: any) => {
        const mylist: SPList = new SPList();
        mylist.isSelected = true;
        mylist.title = listObject.Title;
        mylist.id = listObject.Id;
        mylist.hidden = listObject.Hidden;
        mylist.serverRelativeUrl = listObject.RootFolder.ServerRelativeUrl;
        mylist.itemCount = listObject.ItemCount;
        mylist.roleAssignments = listObject.RoleAssignments.map((roleAssignmentObject: SPRoleAssignmentObject) => ({
          roleDefinitionIds: roleAssignmentObject.RoleDefinitionBindings.map((rdb: SPRoleDefinitionBindingObject) => rdb.Id),
          principalId: roleAssignmentObject.PrincipalId
        }));
        return mylist;
      });

    } catch (err) {
      errors.push(`There was an error fetching lists -- ${err.message}`);
    }

    // Fetch AD groups and add to securityInfo
    const adPromises: Array<Promise<void>> = [];
    for (const sitegroup of securityInfo.siteGroups) {
      for (const adGroupId of sitegroup.adGroupIds) {
        const adPromise = this.fetchAdGroup(aadHttpClient, adGroupId)
          .then((adGroup: ADGroup) => {
            securityInfo.adGroups.push(adGroup);
            for (const adUser of adGroup.members) {
              const siteUser = find(securityInfo.siteUsers, (su) => su.upn === adUser.userPrincipalName?.toLowerCase());
              if (siteUser) {
                siteUser.adId = adUser.id;
              } else {
                const user: SPSiteUser = new SPSiteUser();
                user.adId = adUser.id;
                user.name = adUser.displayName + "*";
                user.upn = adUser.userPrincipalName || adUser.displayName;
                user.isSelected = true;
                user.principalType = -1;
                securityInfo.siteUsers.push(user);
              }
            }
          }).catch((err: Error) => {
            errors.push(`There was an error fetching AD groups -- ${err.message}`);
          });
        adPromises.push(adPromise);
      }
    }

    await Promise.all(adPromises);

    // Final error check
    if (errors.length > 0) {
      console.log("Errors encountered:", errors);
    } else {
      console.log("No errors encountered, proceeding.");
    }

    //console.table(securityInfo.siteUsers);
    return securityInfo;
  }

  private _adGroupCache: Map<string, ADGroup> = new Map();
  private _adGroupInFlight: Map<string, Promise<ADGroup>> = new Map();

  private async fetchAdGroupById(aadHttpClient: AadHttpClient, adGrouId: string): Promise<ADGroup> {
    // Check cache first
    if (this._adGroupCache.has(adGrouId)) {
      return this._adGroupCache.get(adGrouId)!;
    }
    // Check if a request is already in flight
    if (this._adGroupInFlight.has(adGrouId)) {
      return this._adGroupInFlight.get(adGrouId)!;
    }
    console.log(`Fetching AD group: ${adGrouId}`);
    const fetchPromise = (async () => {
      const aadHttpClientConfiguration: AadHttpClientConfiguration = new AadHttpClientConfiguration({}, {});
      let uri = "";
      if (adGrouId.endsWith('_o')) {
        uri = `https://graph.microsoft.com/v1.0/groups/${adGrouId.replace('_o', '')}/owners?$top=999&$select=id,userPrincipalName`;
      } else {
        uri = `https://graph.microsoft.com/v1.0/groups/${adGrouId}/transitiveMembers?$top=999&$select=id,userPrincipalName`;
      }

      let allMembers: User[] = [];
      let nextLink: string | undefined = uri;

      try {
        while (nextLink) {
          const adResponse = await aadHttpClient.get(nextLink, aadHttpClientConfiguration);
          const data = await adResponse.json();
          if (data.value && Array.isArray(data.value)) {
            allMembers = allMembers.concat(data.value);
          }
          nextLink = data['@odata.nextLink'];
        }
        const adGroup: ADGroup = new ADGroup();
        adGroup.id = { ADId: adGrouId, SPId: 0 };
        adGroup.members = allMembers;
        // Cache the result
        this._adGroupCache.set(adGrouId, adGroup);
        return adGroup;
      } catch (err) {
        alert(`Error fetching AD group: ${err.message || err}`);
        return null;
      } finally {
        // Remove from in-flight map
        this._adGroupInFlight.delete(adGrouId);
      }
    })();

    this._adGroupInFlight.set(adGrouId, fetchPromise);
    return fetchPromise;
  }


  private fetchAdGroup(aadHttpClient: AadHttpClient, adGrouId: ADGroupId): Promise<ADGroup> {
    return this.fetchAdGroupById(aadHttpClient, adGrouId.ADId);
  }



}
