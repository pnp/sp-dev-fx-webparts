import { sp } from "@pnp/sp";
import { find, indexOf, includes } from "lodash";
import { SPPermission } from "@microsoft/sp-page-context";
import { AadHttpClient, HttpClientResponse, IAadHttpClientOptions } from "@microsoft/sp-http";

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


export class SPSiteGroup {
  public id: number;
  public title: string;
  public isHiddenInUI: boolean;
  public isShareByEmailGuestUse: boolean;
  public isSiteAdmin: boolean;
  public userIds: number[];
}
export class SPSiteUser {
  public name: string;
  public id: number;
  public userId: SPExternalUser;
  public upn: string;
  public isSelected: boolean; //should user be shown in UI
  public principalType: number; //4=Security group, 1 = user, 2=DL, 8=SP Group
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
  public lists: (SPList | SPListItem)[];
  public constructor() {

    this.siteUsers = new Array<SPSiteUser>();
    this.siteGroups = new Array<SPSiteGroup>();
    this.roleDefinitions = new Array<SPRoleDefinition>();
    this.siteUsers = new Array<SPSiteUser>();
    this.lists = new Array<SPList>();


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
export class SPExternalUser {
  public nameId: string;
  public nameIdIssuer: string;
}
export class SPRoleAssignment {
  public roleDefinitionIds: number[] = [];
  public principalId: number;


}
export class Helpers {
  public static doesUserHaveAnyPermission(securableObjects: any[], user, requestedpermissions: SPPermission[], roles, siteGroups): boolean {
    for (var securableObject of securableObjects) {
      for (var requestedpermission of requestedpermissions) {
        if (Helpers.doesUserHavePermission(securableObject, user, requestedpermission, roles, siteGroups)) {
          return true;
        }
      }
    }
    return false;
  }
  public static doesUserHavePermission(securableObject, user, requestedpermission: SPPermission, roles, siteGroups) {
    console.log(`check user ${user.name} obj ${securableObject.title} perm ${requestedpermission.value.High}${requestedpermission.value.Low} `);


    const permissions: SPBasePermissions[] = Helpers.getUserPermissionsForObject(securableObject, user, roles, siteGroups);
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
  public static getUserPermissionsForObject(securableObject, user, roles: SPRoleDefinition[], siteGroups: SPSiteGroup[]) {

    const roleAssignments: SPRoleAssignment[] = Helpers.GetRoleAssignmentsForUser(securableObject, user, siteGroups);
    let roleDefinitionIds: number[] = [];

    for (const roleAssignment of roleAssignments) {
      for (const roleDefinitionID of roleAssignment.roleDefinitionIds) {
        roleDefinitionIds.push(roleDefinitionID);
      }
    }
    //  for (var rax = 0; rax < roleAssignments.length; rax++) {
    //    for (var rdx = 0; rdx < roleAssignments[rax].roleDefinitionIds.length; rdx++) {
    //      roleDefinitionIds.push(roleAssignments[rax].roleDefinitionIds[rdx]);
    //    }
    //  }

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
  public static GetRoleAssignmentsForUser(securableObject: ISPSecurableObject, user: SPSiteUser,
    groups: SPSiteGroup[]): SPRoleAssignment[] {
    try {
      let selectedRoleAssignments: SPRoleAssignment[] = [];

      for (const roleAssignment of securableObject.roleAssignments) {
        let group: SPSiteGroup = find(groups, (g) => { return g.id === roleAssignment.principalId; });
        if (group) {
          if (this.userIsInGroup(user.id, group.id, groups)) {
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

    sp.web.siteUsers.inBatch(batch).get()
      .then((response) => {
        console.table(response);
        securityInfo.siteUsers = response.map((u) => {
          let user: SPSiteUser = new SPSiteUser();
          user.isSelected = true;
          user.id = u.Id;
          user.name = u.Title;
          user.principalType = u.PrincipalType;
          user.upn = u.LoginName.split('|')[2];
          if (u.UserId) {
            user.userId = new SPExternalUser();
            user.userId.nameId = u.UserId.NameId;
            user.userId.nameIdIssuer = u.UserId.NameIdIssuer;
          }
          return user;
        });
        return securityInfo.siteUsers;
      }).catch((error) => {
        debugger;
        errors.push(`There was an error feting site users -- ${error.message}`);
        throw error;
      });
    sp.web.siteGroups.filter(`Title ne 'Limited Access System Group'`).expand("Users").select("Title", "Id", "IsHiddenInUI", "IsShareByEmailGuestUse", "IsSiteAdmin", "IsSiteAdmin")
      .inBatch(batch).get()
      .then((response) => {
        let AdGroupPromises: Array<Promise<any>> = [];
        // if group contains an ad group(PrincipalType=4) expand it
        securityInfo.siteGroups = response.map((grp) => {
          let siteGroup: SPSiteGroup = new SPSiteGroup();
          siteGroup.userIds = [];
          siteGroup.id = grp.Id;
          siteGroup.title = grp.Title;
          for (let user of grp.Users) {
            if (user.PrincipalType === 4) {
              // To make this work with AD groups, I need to stop using the integer UserId of the user as the
              // key to the Users list and use UPN/Email instead. Users in an AD group may not have a accessed the site
              // yet , and so will not be in the userinfo list.
              // I can get the users from the AD group using the graph HTTPClient. and add them to the Users array
              // in my state. Would also need to add a list of AD groups and their members to my state.
              // then in DoesUserHavePermission method, Just inlude permissions of any ADQ Groups the user is in.
              //
              // Also should check for users that have been invited but not yet accessed the site.


              // graphHttpClient.get("v1.0/groups?$filter=displayName eq '" + user.Title + "'&$expand=members", GraphHttpClient.configurations.v1).then((response2) => {
              //   response2.json().then((data) => {
              //     //debugger;
              //   });
              // }).catch((err) => {
              // });
            } else {
              siteGroup.userIds.push(user.Id);
            }
          }


          return siteGroup;
        });
        return Promise.all(AdGroupPromises).then(() => {
          return securityInfo.siteGroups;
        });

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
        //error fetching roledefinitions
        errors.push(`There was an error fetcing role Definitions -- ${error.message}`);
        throw error;
      });
    let filters: string[] = [];
    if (!showHiddenLists) {
      filters.push("Hidden eq false");
    }
    if (!showCatalogs) {
      filters.push("IsCatalog eq false");
    }
    let filter: string = filters.join(" and ");
    sp.web.lists
      .expand("RootFolder", "RoleAssignments", "RoleAssignments/RoleDefinitionBindings", "RoleAssignments/Member",
        "RoleAssignments/Member/Users", "RoleAssignments/Member/Groups", "RoleAssignments/Member/UserId")
      .filter(filter).inBatch(batch).get()
      .then((response) => {
        securityInfo.lists = response.map((listObject) => {
          let mylist: SPList = new SPList();
          mylist.isSelected = true;// Shoudl be shown in the UI, user can deslect it in the ui
          mylist.title = listObject.Title;
          mylist.id = listObject.Id;
          mylist.hidden = listObject.Hidden;
          mylist.serverRelativeUrl = listObject.RootFolder.ServerRelativeUrl;
          mylist.type = securableType.List;// to differeentiate foldes from lists
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
    return batch.execute().then(() => {
      return securityInfo;
    }).catch((error) => {
      //debugger;
      // error in batch
      throw errors;

    });
  }
}
