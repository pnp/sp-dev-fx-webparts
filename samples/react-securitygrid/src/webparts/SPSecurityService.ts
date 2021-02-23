import { User } from "@microsoft/microsoft-graph-types";
import { AadHttpClient, AadHttpClientConfiguration, HttpClientResponse, IAadHttpClientConfiguration, IAadHttpClientConfigurations, IAadHttpClientOptions } from "@microsoft/sp-http";
import { IODataUser } from "@microsoft/sp-odata-types";
import { SPPermission } from "@microsoft/sp-page-context";
//import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import { sp } from "@pnp/sp";
import { SiteGroup } from "@pnp/sp/src/sitegroups";
import { filter, find, includes, indexOf, lowerCase } from "lodash";

export interface ISPSecurableObject {
  id: number;
  roleAssignments: SPRoleAssignment[];

}

export class SPBasePermissions {
  public low: number;
  public high: number;
  public constructor(high: any, low: any) {
    this.high = parseInt(high, 10);
    this.low = parseInt(low, 10);

  }
}
export enum securableType {
  List
}
export class ADGroupId {
  public ADId: string; // the goid id in azure
  public SPId: number; // the numeric id in the sharepoint users list

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
  public userIds: number[];// to switch to ad groups need to make this a string[] with the UPN
  public adGroupIds: ADGroupId[];
  public constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.userIds = [];
    this.adGroupIds = [];
  }
}
export class SPSiteUser {
  public name: string;
  public id?: number;
  public userId?: SPExternalUser;
  public upn: string;
  public isSelected: boolean; //should user be shown in UI
  public principalType: number; //4=Security group, 1 = user, 2=DL, 8=SP Group, IN HERE A -1 MEANS AD USER
  public adId: string;//id if the user in AD
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
  public siteUsers: SPSiteUser[];
  public siteGroups: SPSiteGroup[];
  public roleDefinitions: SPRoleDefinition[];
  public adGroups: ADGroup[];
  public lists: (SPList | SPListItem)[];
  public constructor() {

    this.siteUsers = new Array<SPSiteUser>();
    this.siteGroups = new Array<SPSiteGroup>();
    this.roleDefinitions = new Array<SPRoleDefinition>();
    this.siteUsers = new Array<SPSiteUser>();
    this.lists = new Array<SPList>();
    this.adGroups = new Array<ADGroup>();

  }
}

export class SPList {
  public title: string;
  public id: string;
  public hidden: boolean; // this specifies if the list is a sharepoint hidden list
  public serverRelativeUrl: string;
  public type: securableType;
  public itemCount: number;
  public roleAssignments: SPRoleAssignment[];
  public isExpanded: boolean;
  public hasBeenRetrieved: boolean;
  public isSelected: boolean; //Shoud list be shown in the UI

}
export class SPListItem {
  public id: string;
  public parentId: string;
  public listTitle: string;
  public type: string;
  public itemCount: number;
  public title: string;
  public serverRelativeUrl: string;
  public roleAssignments: SPRoleAssignment[];
  public isExpanded: boolean;
  public hasBeenRetrieved: boolean;
  public level: number;

}
// export class ADGroup {
//   public id: string;
//   public parentId: string;
//   public listTitle: string;
//   public type: string;
//   public itemCount: number;
//   public title: string;
//   public serverRelativeUrl: string;
//   public roleAssignments: SPRoleAssignment[];
//   public isExpanded: boolean;
//   public hasBeenRetrieved: boolean;
//   public level: number;

// }
export class SPExternalUser {
  public nameId: string;
  public nameIdIssuer: string;
}
export class SPRoleAssignment {
  public roleDefinitionIds: number[] = [];
  public principalId: number;


}
export class Helpers {
  public static doesUserHaveAnyPermission(securableObjects: any[], user, requestedpermissions: SPPermission[], roles, siteGroups, adGroups: ADGroup[]): boolean {
    for (var securableObject of securableObjects) {
      for (var requestedpermission of requestedpermissions) {
        if (Helpers.doesUserHavePermission(securableObject, user, requestedpermission, roles, siteGroups, adGroups)) {
          return true;
        }
      }
    }
    return false;
  }
  public static doesUserHavePermission(securableObject, user, requestedpermission: SPPermission, roles, siteGroups, adGroups: ADGroup[]) {


    const permissions: SPBasePermissions[] = Helpers.getUserPermissionsForObject(securableObject, user, roles, siteGroups, adGroups);
    for (const permission of permissions) {
      if (
        ((permission.low & requestedpermission.value.Low) === (requestedpermission.value.Low))
        &&
        ((permission.high & requestedpermission.value.High) === (requestedpermission.value.High))
      ) {
        return true;
      }
    }
    return false;
  }


  public static getBasePermissionsForRoleDefinitiuonIds(selectedRoleDefinitionIds: number[],
    roleDefinitions: SPRoleDefinition[]): Array<SPBasePermissions> {
    let basePermissions = [];
    for (const selectedRoleDefinitionId of selectedRoleDefinitionIds) {
      for (const roleDefinition of roleDefinitions) {
        if (roleDefinition.id === selectedRoleDefinitionId) {
          basePermissions.push(roleDefinition.basePermissions);
        }
      }
    }
    //  for (var rdx = 0; rdx < roleDefs.length; rdx++) {
    //    for (var rdi = 0; rdi < roleDefinitionIds.length; rdi++) {basePermission
    //      if (roleDefs[rdx].Id === roleDefinitionIds[rdi]) {
    //        basePermissions.push(roleDefs[rdx].BasePermissions);
    //      }
    //    }
    //  }
    return basePermissions;
  }
  public static getUserPermissionsForObject(securableObject, user, roles: SPRoleDefinition[], siteGroups: SPSiteGroup[], adGroups: ADGroup[]) {

    const userRoleAssignments: SPRoleAssignment[] = Helpers.GetRoleAssignmentsForUser(securableObject, user, siteGroups, adGroups);
    let roleDefinitionIds: number[] = [];

    for (const roleAssignment of userRoleAssignments) {
      for (const roleDefinitionID of roleAssignment.roleDefinitionIds) {
        roleDefinitionIds.push(roleDefinitionID);
      }
    }
    var userPermissions = Helpers.getBasePermissionsForRoleDefinitiuonIds(roleDefinitionIds, roles);

    return userPermissions;
  }
  public static findGroup(groupId: number, groups: SPSiteGroup[]): SPSiteGroup {
    return find(groups, (g) => { return g.id === groupId; });

  }
  public static userIsInGroup(userId: number, groupId: number, groups: SPSiteGroup[]): boolean {
    let group: SPSiteGroup = this.findGroup(groupId, groups);
    return includes(group.userIds, userId);
  }
  public static userIsInGroupsNestAdGroups(userAdId: String, groupId: number, groups: SPSiteGroup[], adGroups: ADGroup[]): boolean {
    let group: SPSiteGroup = this.findGroup(groupId, groups);
    debugger;
    for (var adGrouId of group.adGroupIds) {
      var adGroup = find(adGroups, (adg) => { return adg.id === adGrouId; });
      if (adGroup) {
        if (find(adGroup.members, (aduser) => { return aduser.id === userAdId; })) {
          return true;
        }
      } else {
        debugger;
        alert(`adGroup ${ADGroupId} was not in the collection of ad groups.`);
      }

    }

  }
  public static GetRoleAssignmentsForUser(securableObject: ISPSecurableObject, user: SPSiteUser,
    groups: SPSiteGroup[], adGroups: ADGroup[]): SPRoleAssignment[] {
    try {
      let selectedRoleAssignments: SPRoleAssignment[] = [];

      // for each role assignment, if the user is in the group, or its for this user, add it to his roleassignments
      for (const roleAssignment of securableObject.roleAssignments) {
        let group: SPSiteGroup = find(groups, (g) => { return g.id === roleAssignment.principalId; });
        if (group) {
          if (this.userIsInGroup(user.id, group.id, groups)) {  // this tests if a user is directly in the SP GROUP
            selectedRoleAssignments.push(roleAssignment);
          }
          if (this.userIsInGroupsNestAdGroups(user.adId, group.id, groups, adGroups)) {  // this tests if a user is in an ad group thats  in the SP GROUP
            selectedRoleAssignments.push(roleAssignment);
          }

        }
        else {
          // it must be a user
          if (user.id === roleAssignment.principalId) {
            selectedRoleAssignments.push(roleAssignment);
          }
        }
      }
      debugger;
      if (user.adId) { // if user is referenced in any groups, we stored his ad id in his user record
        for (var adgroup of adGroups) {// for all adGroups
          if (find(adgroup.members, (member) => {

            return member.id === user.adId;
          }) != -1) { // if user is in the adgroup
            // for each role assignment, if the adGroup is in the group, or its for this adgroup, add it to his roleassignments
            for (const roleAssignment of securableObject.roleAssignments) {
              if (adgroup.id.SPId === roleAssignment.principalId) {
                selectedRoleAssignments.push(roleAssignment);
              }
              // debugger;
              // let group: SPSiteGroup = find(groups, (g) => { return g.id === roleAssignment.principalId; });
              // if (group) {
              //   if (this.userIsInGroup(user.id, group.id, groups)) {
              //     selectedRoleAssignments.push(roleAssignment);
              //   }
              // }
              // else {
              //   // it must be a user
              //   if (user.id === roleAssignment.principalId) {
              //     selectedRoleAssignments.push(roleAssignment);
              //   }
              // }
            }
          }

        }

      }

      return selectedRoleAssignments;
    } catch (exception) {
      //debugger;
      console.error(exception);
    }

  }
}
export default class SPSecurityService {
  public siteUrl: string;

  public constructor(siteUrl: string) {
    this.siteUrl = siteUrl;
  }
  public loadFolderRoleAssigmentsDefinitionsMembers(listTitle, folderServerRelativeUrl,
    parentId: string, level: number, forceReload: boolean): Promise<SPListItem[]> {

    // pnp.sp.web.lists.getByTitle("Config3").getItemsByCAMLQuery(caml, "RoleAssignments").then(show);
    let caml: any = {
      ViewXml: "<View Scope='RecursiveAll'>" +
        " <Query>" +
        "<Where>" +
        "   <Eq>" +
        "      <FieldRef Name='FileDirRef'/>" +
        "     <Value Type='Lookup'>" +
        folderServerRelativeUrl +
        "    </Value>" +
        " </Eq>" +
        " </Where>" +
        "  </Query>" +
        //               "     <QueryOptions>"+
        //    "<ViewAttributes Scope='RecursiveAll' />" +
        //    "<OptimizeFor>FolderUrls</OptimizeFor>"+

        //  "</QueryOptions>"+
        " </View>"
    };

    return sp.web.lists.getByTitle(listTitle).getItemsByCAMLQuery(caml, "ContentType", "Folder", "Folder/ParentFolder", "File",
      "File/ParentFolder", "RoleAssignments", "RoleAssignments/RoleDefinitionBindings", "RoleAssignments/Member",
      "RoleAssignments/Member/Users", "RoleAssignments/Member/Groups")
      .then((response) => {


        let itemsToAdd: SPListItem[] = [];
        for (let listItem of response) {
          let itemToAdd: SPListItem = new SPListItem();

          itemToAdd.id = listItem.GUID;
          itemToAdd.parentId = parentId;
          itemToAdd.level = level;
          itemToAdd.listTitle = listTitle;
          itemToAdd.type = listItem.ContentType.Name;
          itemToAdd.isExpanded = false;
          itemToAdd.hasBeenRetrieved = false;
          itemToAdd.roleAssignments = [];
          if (listItem.ContentType.Name === "Folder") { // its a folder
            itemToAdd.title = listItem.Folder.Name;
            itemToAdd.serverRelativeUrl = listItem.Folder.ServerRelativeUrl;
            itemToAdd.itemCount = listItem.Folder.ItemCount;
          } else {
            if (listItem.File) {// its a file
              itemToAdd.title = listItem.File.Name;
              itemToAdd.serverRelativeUrl = listItem.File.ServerRelativeUrl;
            } else { //  its a listitem
              itemToAdd.title = listItem.Title;
            }
          }
          for (let roleAssignmentObject of listItem.RoleAssignments) {

            let roleAssignment: SPRoleAssignment = {
              roleDefinitionIds: roleAssignmentObject.RoleDefinitionBindings.map((rdb) => { return rdb.Id; }),
              principalId: roleAssignmentObject.PrincipalId
            };
            // if (roleAssignmentObject.Member.UserId) {
            //   roleAssignment.userId = new SPExternalUser();
            //   roleAssignment.userId.nameId = roleAssignmentObject.Member.UserId.NameId;
            //   roleAssignment.userId.nameIdIssuer = roleAssignmentObject.Member.UserId.NameIdIssuer;
            //   // roleAssignment.userId = roleAssignmentObject.Member.UserId;
            // }
            // if (roleAssignmentObject.Member.Users) {
            //   for (let roleAssignmentMemberUser of roleAssignmentObject.Member.Users) {
            //     roleAssignment.users.push(roleAssignmentMemberUser.Id);
            //   }
            // }
            // if (roleAssignmentObject.Member.Groups) {
            //   for (let roleAssignmentMemberGroup of roleAssignmentObject.Member.Groups) {
            //     roleAssignment.groups.push(roleAssignmentMemberGroup.Id);
            //   }
            // }
            // for (let roleDefinitionBinding of roleAssignmentObject.RoleDefinitionBindings) {
            //   roleAssignment.roleDefinitionIds.push(roleDefinitionBinding.Id);
            // }
            itemToAdd.roleAssignments.push(roleAssignment);
          }
          itemsToAdd.push(itemToAdd);
        }
        return itemsToAdd;
      });
  }
  // public async getMembersOfAdGroup(aadHttpClient: AadHttpClient, groupName: string): Promise<any> {

  //   return aadHttpClient.get("v1.0/groups?$filter=displayName eq '" + groupName + "'&$expand=members",
  //     AadHttpClient.configurations.v1).then((response) => {
  //       response.json().then((data) => {
  //         debugger;
  //       });
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  // }
  /// Loads data for intial display
  public loadData(showHiddenLists: boolean, showCatalogs: boolean, aadHttpClient: AadHttpClient, forceReload: boolean): Promise<SPSecurityInfo> {
    let securityInfo: SPSecurityInfo = new SPSecurityInfo();
    let batch: any = sp.createBatch();
    let errors: Array<string> = [];
    debugger;
    sp.web.siteUsers.inBatch(batch).get()
      .then((response) => {
        securityInfo.siteUsers = response.map((u) => {
          var upn: string = u.LoginName.split('|')[2];
          let user: SPSiteUser = new SPSiteUser();
          user.isSelected = true;
          user.id = u.Id;
          user.name = u.Title;
          user.principalType = u.PrincipalType;
          user.upn = upn ? upn.toLocaleLowerCase() : u.Title;// switching key in react from id to upn. ensure upn is not undefined
          if (u.UserId) {
            user.userId = new SPExternalUser();
            user.userId.nameId = u.UserId.NameId;
            user.userId.nameIdIssuer = u.UserId.NameIdIssuer;
          }
          return user;
        });

        // securityInfo.siteUsers = securityInfo.siteUsers.filter((su) => { su.upn });
        return securityInfo.siteUsers;// dont really need to return this// already set it on securityinfo
      }).catch((error) => {
        debugger;
        errors.push(`There was an error feting site users -- ${error.message}`);
        throw error;
      });
    sp.web.siteGroups.filter(`Title ne 'Limited Access System Group'`).expand("Users").select("Title", "Id", "IsHiddenInUI", "IsShareByEmailGuestUse", "IsSiteAdmin", "IsSiteAdmin")
      .inBatch(batch).get()
      .then(async (response) => {


        // if group contains an ad group(PrincipalType=4) expand it

        securityInfo.siteGroups = response.map((grp) => {
          //
          //IMPORTANT:
          //For groups created with 'Anyone in the organization with the link'
          //LoginName: "SharingLinks.cf28991a-7f40-49c8-a68e-f4fa143a094f.OrganizationEdit.2671b36d-1681-4e39-82dc-a9f11166517d",
          //
          //For groups create with SPecific People
          //LoginName: "SharingLinks.3d634d86-7136-4d59-8acf-c87d9a2c7d98.Flexible.9368eb69-6ca4-4b55-85e5-148c3e48e520",
          //
          //need to check for other options. Seems funny that the one labeled 'Flexible' is for specific people.
          //
          //So we wil need to add code one day to decipher all thes sharing groups!

          let siteGroup: SPSiteGroup = new SPSiteGroup(grp.Id, grp.Title);
          for (let user of grp.Users) {
            if (user.PrincipalType === 4) {  //4=Security group, 1 = user, 2=DL, 8=SP Group
              var adgroupid = new ADGroupId();
              adgroupid.ADId = user.LoginName.split('|')[2];//Loginname s c:0t,c|tenant|grpid for ad groups
              adgroupid.SPId = user.Id;
              siteGroup.adGroupIds.push(adgroupid);
            } else {
              siteGroup.userIds.push(user.Id);
            }
          }
          return siteGroup;
        });

        return securityInfo.siteGroups;// don't really need to return this// already set it on securityinfo
      }).catch((error) => {
        //error fetching groups
        errors.push(`There was an error feting site Groups -- ${error.message}`);
        //debugger;
        throw error;
      });


    sp.web.roleDefinitions.expand("BasePermissions").inBatch(batch).get()
      .then((response) => {
        securityInfo.roleDefinitions = response.map((rd) => {

          const bp: SPBasePermissions = new SPBasePermissions(rd.BasePermissions.High, rd.BasePermissions.Low);
          const roleDefinition: SPRoleDefinition = new SPRoleDefinition(
            parseInt(rd.Id, 10),
            bp,
            rd.Description,
            rd.Hidden,
            rd.Name);

          return roleDefinition;
        });
        return securityInfo.roleDefinitions;
      }).catch((error) => {
        //debugger;
        //error fetching role definitions
        errors.push(`There was an error fetching role Definitions -- ${error.message}`);
        throw error;
      });
    let filters: string[] = [];
    if (!showHiddenLists) {
      filters.push("Hidden eq false");
    }
    if (!showCatalogs) {
      filters.push("IsCatalog eq false");
    }
    let subFilter: string = filters.join(" and ");
    sp.web.lists
      .expand("RootFolder", "RoleAssignments", "RoleAssignments/RoleDefinitionBindings", "RoleAssignments/Member",
        "RoleAssignments/Member/Users", "RoleAssignments/Member/Groups", "RoleAssignments/Member/UserId")
      .filter(subFilter).inBatch(batch).get()
      .then((response) => {
        securityInfo.lists = response.map((listObject) => {
          let mylist: SPList = new SPList();
          mylist.isSelected = true;// Should be shown in the UI, user can de-select it in the ui
          mylist.title = listObject.Title;
          mylist.id = listObject.Id;
          mylist.hidden = listObject.Hidden;
          mylist.serverRelativeUrl = listObject.RootFolder.ServerRelativeUrl;
          mylist.type = securableType.List;// to differentiate folders from lists
          mylist.itemCount = listObject.ItemCount;
          mylist.isExpanded = false;
          mylist.hasBeenRetrieved = false;
          mylist.roleAssignments = listObject.RoleAssignments.map((roleAssignmentObject) => {
            let roleAssignment: SPRoleAssignment = {
              roleDefinitionIds: roleAssignmentObject.RoleDefinitionBindings.map((rdb) => { return rdb.Id; }),
              principalId: roleAssignmentObject.PrincipalId
            };
            return roleAssignment;
          });
          return mylist;
        });

      }).catch((error) => {
        //debugger;
        errors.push(`There was an error fetching lists -- ${error.message} `);
        //error fetching lists
        throw error;

      });

    // execute the batch to get sp stuff
    return batch.execute().then(async () => {
      // then get the ad stuff

      var requests = [];
      var adPromises: Array<Promise<void>> = [];
      for (let sitegroup of securityInfo.siteGroups) {
        for (let adGroupId of sitegroup.adGroupIds) {
          // need to do this in batch
          var adPromise = this.fetchAdGroup(aadHttpClient, adGroupId)
            .then((adGroup) => {
              securityInfo.adGroups.push(adGroup);
              for (var adUser of adGroup.members) {
                var siteUser = find(securityInfo.siteUsers, (su, key) => {
                  return su.upn === adUser.userPrincipalName.toLowerCase();
                });
                if (siteUser) {
                  siteUser.adId = adUser.id;
                } else {
                  let user: SPSiteUser = new SPSiteUser();
                  user.adId = adUser.id; user.name = adUser.displayName + "*";
                  user.upn = adUser.userPrincipalName ? adUser.userPrincipalName : adUser.displayName;
                  user.isSelected = true;
                  user.principalType = -1;
                  securityInfo.siteUsers.push(user);
                }
              }
            }
            )
            .catch((err) => {
              debugger;
            });
          adPromises.push(adPromise);

        }
      }
      await Promise.all(adPromises);
      console.table(securityInfo.siteUsers);
      debugger;
      return securityInfo;
    }).catch((error) => {
      debugger;
      // error in batch
      throw errors;

    });
  }

  private fetchAdGroup(aadHttpClient: AadHttpClient, adGrouId: ADGroupId): Promise<ADGroup> {
    var aadHttpClientConfiguration: AadHttpClientConfiguration = new AadHttpClientConfiguration({}, {});
    // note im not loading nested groups here. Will need to load them on the fly? or maybe here?nvrmind

    return aadHttpClient.get(`https://graph.microsoft.com/v1.0/groups/${adGrouId.ADId}/transitiveMembers`, aadHttpClientConfiguration)
      .then((adResponse) => {
        return adResponse.json()
          .then((data) => {
            let adGroup: ADGroup = new ADGroup();
            adGroup.id = adGrouId;
            adGroup.members = data.value;
            return adGroup;
          }).catch((err) => {
            debugger;
            alert(`error converting to json`);
            return null;
          });

      }).catch((err) => {
        debugger;
        //if 403 show message to grant security
        alert(`grant app SharePoint Online Client Extensibility Web Application Principal graph permissions Group.Read.All & GroupMembers.Read.All`);
        return null;
      });
  }
}

