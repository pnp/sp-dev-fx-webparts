import { sp, SPHttpClient } from "@pnp/sp";
import { ISiteGroup, ISiteGroupInfo } from '@pnp/sp/site-groups';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IViewInfo } from '@pnp/sp/views';
import { IRoleDefinition, IRoleDefinitionInfo } from '@pnp/sp/security';
import { escape, findIndex, find } from '@microsoft/sp-lodash-subset';
import { IItem } from "@pnp/sp/items";
import { IRFxFolder } from '../models/IRFxFolder';

export default class RFXUtilities {
  public roleDefs: IRoleDefinitionInfo[];
  /**
    * Sets the parent of a group to another group using JSOM calls (this is not supported in rest)
    * @param groupId -- the ID of the group whose parent will be changed
    * @param ownerGroupId -- the id of the group that will become the parent
    */
  public static async setGroupOwner(groupId: number, ownerGroupId: number): Promise<void> {
    const client = new SPHttpClient();
    await Promise.all([sp.web.select("Url").get(), sp.site.select("Id").get()])
      .then(async (siteData) => {
        const siteObj = siteData[0];
        const siteId = siteData[1];
        const endpoint = siteObj.Url + `/_vti_bin/client.svc/ProcessQuery`;
        const body = `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="15.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
              <Actions>
                <SetProperty Id="1" ObjectPathId="2" Name="Owner">
                  <Parameter ObjectPathId="3" />
                </SetProperty>
                <Method Name="Update" Id="4" ObjectPathId="2" />
              </Actions>
              <ObjectPaths>
                <Identity Id="2" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${siteId.Id}:g:${groupId}" />
                <Identity Id="3" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${siteId.Id}:g:${ownerGroupId}" />
              </ObjectPaths>
            </Request>`;
        await client.post(endpoint, {
          headers: {
            "content-type": "text/xml"
          },
          body: body
        })
          .then((response) => {
            return response.json().then((r) => {
              if (r[0].ErrorInfo) {
                return Promise.reject(r[0].ErrorInfo.ErrorMessage);
              } else {
                return Promise.resolve();
              }
            });
          });
      });
  }
  /**
   * Gets the ID of a roledefinition with the given name
   *
   * @public
   * @param {string} roleDefinitionName The name of the roleDefinition whose ID we want to get
   * @returns {Promise<number>} The ID if the roleDefinition. If not found this will be -1
   * @memberof DocLibSecurity
   */
  public static getRoledefId(roleDefinitionName: string, roleDefinitions: Array<IRoleDefinitionInfo>): number {
    for (const def of roleDefinitions) {
      if (def.Name === roleDefinitionName) {
        return def.Id;
      }
    }
    return -1;
  }

  /**
   * Grants a group access to a library
   *
   * @public
   * @param {string} libraryName The name of the library to grant access to
   * @param {string} groupName The name of the group to gtrant access for
   * @param {string} roleName The role to assign the group to on this library
   * @returns {Promise<any>}
   * @memberof DocLibSecurity
   */
  public static async grantGroupAccessToLibrary(libraryName: string, groupId: number, roleName: string, roleDefinitions: Array<IRoleDefinitionInfo>): Promise<any> {

    const roleDefId = await RFXUtilities.getRoledefId(roleName, roleDefinitions);
    if (roleDefId === -1) {
      return Promise.reject(`"Role ${roleName} not found`);
    }
    return sp.web.lists.getByTitle(libraryName).roleAssignments.add(groupId, roleDefId);
  }

  public static async removeAccessToLibrary(libraryName: string, principalId: number, roleName: string, roleDefinitions: Array<IRoleDefinitionInfo>): Promise<any> {

    const roleDefId = await RFXUtilities.getRoledefId(roleName, roleDefinitions);
    if (roleDefId === -1) {
      return Promise.reject(`"Role ${roleName} not found`);
    }
    return sp.web.lists.getByTitle(libraryName).roleAssignments.remove(principalId, roleDefId);
  }

  /**
    *  Determinse if a SiteGroup  with the given name exists
    *
    * @public
    * @param {string} groupName The name of the SiteGroup we want to check
    * @returns {Promise<boolean>}  True if SiteGroup exists , otherwise false
    * @memberof DocLibSecurity
    */
  public static doesGroupExist(groupName: string): Promise<boolean> {
    return sp.web.siteGroups.getByName(groupName).get()
      .then((list) => {
        return true;
      })
      .catch((e) => {
        return false;
      });

  }

  // /**
  //  * Grants a group access to the site
  //  *
  //  * @public
  //  * @param {string} groupName The group name to be granted access
  //  * @param {string} roleName The role to assign the group to on this site 
  //  * @returns {Promise<any>}
  //  * @memberof DocLibSecurity
  //  */
  // // public static async grantNewGroupAccessToSite(groupName: string, roleName: string, roleDefinitions: Array<IRoleDefinitionInfo>): Promise<any> {

  // //   const roleDefId = await this.getRoledefId(roleName, roleDefinitions);
  // //   const grp = await sp.web.siteGroups.getByName(groupName).get();
  // //   return sp.web.roleAssignments.add(grp.Id, roleDefId);

  // // }

  public static async grantGroupIdAccessToSite(groupId: number, roleName: string, roleDefinitions: Array<IRoleDefinitionInfo>): Promise<any> {
    const roleDefId = await this.getRoledefId(roleName, roleDefinitions);
    return sp.web.roleAssignments.add(groupId, roleDefId);
  }

  /**
   * Navigates to the default view of the selected lbrary
   *
   * @public
   * @param {string} title -- the Title of the doclib to open
   * @memberof DocLibSecurity
   */
  public static linkToLibrary(title: string): void {

    sp.web.lists.getByTitle(title).defaultView.get()
      .then((view: IViewInfo) => {
        window.location.pathname = view.ServerRelativeUrl;
      });
  }
  public static linkToFolder(folder: IRFxFolder, rfxListName: string): void {
    let ifrx = sp.web.lists.getByTitle(rfxListName).items.getById(folder.rfxId).get()
      .then((rfx) => {
        sp.web.lists.getByTitle(rfx["Title"]).rootFolder.folders.getByName(folder.title).get()
          .then((item) => {
            debugger;
            window.location.pathname = item.ServerRelativeUrl;
          });
      });
  }
  /**
   *  Naviates to the Group Maintenance page for the selected Group
   *
   * @public
   * @param {string} groupName The name of the Group
   * @memberof DocLibSecurity
   */
  public static linkToGroup(groupName: string, webServerRelativeUrl: string): void {

    sp.web.siteGroups.getByName(groupName).get()
      .then((grp: ISiteGroupInfo) => {
        let newUrl = `${window.location.origin}${webServerRelativeUrl}/_layouts/15/people.aspx?MembershipGroupId=${grp.Id}`;
        window.location.href = newUrl;
      });
  }
  /**
   *  Naviates to the Group Maintenance page for the selected Group
   *
   * @public
   * @param {string} groupName The name of the Group
   * @memberof DocLibSecurity
   */
  public static linkToGroupById(groupId: number, webServerRelativeUrl: string): void {

    let newUrl = `${window.location.origin}${webServerRelativeUrl}/_layouts/15/people.aspx?MembershipGroupId=${groupId}`;
    window.location.href = newUrl;

  }

  /**
   * Delets a group with the given name
   *
   * @public
   * @param {string} groupName the name of the group to remove
   * @returns {Promise<void>}
   * @memberof DocLibSecurity
   */
  public static deletegroup(groupName: string): Promise<void> {

    return sp.web.siteGroups.getByName(groupName).get()
      .then((grp: ISiteGroupInfo) => {
        sp.web.siteGroups.removeById(grp.Id);
      });
  }


  public static getSiteGroupName(siteGroupId: number, siteGroups: Array<ISiteGroupInfo>): string {
    let sg: ISiteGroupInfo = find(siteGroups, (sgx) => {
      return sgx.Id === siteGroupId;
    });
    if (sg) {
      return sg.Title;
    }
    else { return (`*${siteGroupId}*`); }
  }
}