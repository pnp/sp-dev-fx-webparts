import { sp, PrincipalType, ISiteGroupInfo } from "@pnp/sp/presets/all";
import { HttpRequestError } from "@pnp/odata";
import "@pnp/graph/users";
import "@pnp/graph/groups";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import AadUserGroupLookup from "./AadUserGroupLookup";

export interface ISpGroupMembership {
  spGroup: string | undefined;
  spGroupId: number | undefined;
  membershipViaPrincipalName: string;
  membershipViaPrincipalType: PrincipalType;
  membershipViaPrincipalSpId: number;
}

class SpUserGroupLookup {
  private aadUserGroupLookup: AadUserGroupLookup;
  private spUserAndMemberGroupsPromises: Map<number, Promise<ISiteUserInfo>> = new Map();
  private aadGroupSpMembershipsPromises: Map<string, Promise<ISpGroupMembership[]>> = new Map();

  constructor(aadUserGroupLookup: AadUserGroupLookup) {
    this.aadUserGroupLookup = aadUserGroupLookup;
  }

  /**
   * Returns the SharePoint Site User and Group Ids related to the given user.
   * @param siteUserId The SharePoint site user Id of the user to retrieve information for.
   * If siteUserId is 0 then the current SP site user's information is retrieved.
   * @param email The email address of AAD user to retrieve information for. If email is
   * undefined then the current AAD user's information is retrieved.
   */
  public async getRelatedSiteUserAndGroupIds(siteUserId: number, email: string): Promise<number[]> {
    const ids = new Set<number>();

    const siteUserInfo = await this.getSpUserAndMemberGroupsPromise(siteUserId);
    ids.add(siteUserInfo.Id);

    const memberships = await this.getUserMemberships(siteUserId, email);
    memberships.forEach((membership) => {
      ids.add(membership.membershipViaPrincipalSpId);
      if (membership.spGroupId) {
        ids.add(membership.spGroupId);
      }
    });

    return Array.from(ids);
  }

  /**
   * Returns the specified user's membership of SP site groups where:
   * - The user is a directly assigned member of the SP site group.
   * - The user is a member of an AAD group which is itself a member of the SP site group.
   *
   * Included in the results are cases where the user is a member of an AAD group which
   * is known to the SP site, and the AAD group is therefore represented as an SP site user,
   * but where the AAD group is not a member of any SP site group.
   *
   * @param siteUserId The SharePoint site user Id of the user to retrieve information for.
   * If siteUserId is 0 then the current SP site user's information is retrieved.
   * @param email The email address of AAD user to retrieve information for. If email is
   * undefined then the current AAD user's information is retrieved.
   */
  public async getUserMemberships(siteUserId: number, email: string): Promise<ISpGroupMembership[]> {
    console.debug("Get user memberships", siteUserId, email);
    const userDirectMemberships = await this.getSpUserMemberships(siteUserId);
    const aadGroupMemberships = await this.getAadGroupSpMemberships(email);

    return [...userDirectMemberships, ...aadGroupMemberships];
  }

  /**
   * Returns the ISiteUserInfo of the site user with the given siteUserId. The resultant ISiteUserInfo
   * has the Groups property expanded.
   * @param siteUserId The SharePoint site user to retrieve the ISiteUserInfo object for.
   * If siteUserId is 0 then the current SP site user's information is retrieved. If siteUserId is undefined then a
   * promise resolved with underfined is returned.
   */
  public getSpUserAndMemberGroupsPromise(siteUserId: number): Promise<ISiteUserInfo | undefined> {
    if (this.spUserAndMemberGroupsPromises.has(siteUserId)) {
      return this.spUserAndMemberGroupsPromises.get(siteUserId);
    } else {
      let spUserAndMemberGroupsPromise: Promise<ISiteUserInfo>;
      if (siteUserId) {
        spUserAndMemberGroupsPromise = sp.web.getUserById(siteUserId).expand("Groups").get();
      } else if (siteUserId === 0) {
        spUserAndMemberGroupsPromise = sp.web.currentUser.expand("Groups").get();
      } else {
        spUserAndMemberGroupsPromise = Promise.resolve(undefined);
      }
      this.spUserAndMemberGroupsPromises.set(siteUserId, spUserAndMemberGroupsPromise);
      return spUserAndMemberGroupsPromise;
    }
  }

  public async getSpSiteUserByLoginName(loginName: string): Promise<ISiteUserInfo | undefined> {
    try {
      const user = await sp.web.siteUsers.getByLoginName(loginName).get();
      console.debug("Get SP site user by login name", loginName, user);
      return user;
    } catch (err) {
      console.debug("Exception when getting site user by loginName", loginName, err);
      if (await this.isUserNotFoundException(err)) {
        return undefined;
      } else {
        throw err;
      }
    }
  }

  public async getSpSiteUsers(): Promise<ISiteUserInfo[]> {
    return sp.web.siteUsers.filter("PrincipalType eq " + PrincipalType.User).get();
  }

  private async getSpUserMemberships(siteUserId: number): Promise<ISpGroupMembership[]> {
    const siteUserInfo = await this.getSpUserAndMemberGroupsPromise(siteUserId);
    // There MUST be a better way to do this rather than casting.
    // We know that the ISiteUserInfo was expanded to include Groups, but the ISiteUserInfo type
    // doesn't have the Groups property. There is probably something I should be doing with union
    // types here!
    if (siteUserInfo) {
      const siteGroups = (siteUserInfo as any).Groups as ISiteGroupInfo[];
      if (siteGroups.length) {
        return siteGroups.map((siteGroup) => {
          return {
            spGroup: siteGroup.Title,
            spGroupId: siteGroup.Id,
            membershipViaPrincipalName: siteUserInfo.Title,
            membershipViaPrincipalType: siteUserInfo.PrincipalType,
            membershipViaPrincipalSpId: siteUserInfo.Id,
          };
        });
      } else {
        return [
          {
            spGroup: undefined,
            spGroupId: undefined,
            membershipViaPrincipalName: siteUserInfo.Title,
            membershipViaPrincipalType: siteUserInfo.PrincipalType,
            membershipViaPrincipalSpId: siteUserInfo.Id,
          },
        ];
      }
    } else {
      return [];
    }
  }

  private getAadGroupSpMemberships(email: string): Promise<ISpGroupMembership[]> {
    if (this.aadGroupSpMembershipsPromises.has(email)) {
      return this.aadGroupSpMembershipsPromises.get(email);
    } else {
      const aadGroupSpMemberships = this.populateAadGroupsAsSpUsers(email);
      this.aadGroupSpMembershipsPromises.set(email, aadGroupSpMemberships);
      return aadGroupSpMemberships;
    }
  }

  private async populateAadGroupsAsSpUsers(email: string): Promise<ISpGroupMembership[]> {
    const aadGroupIds = await this.aadUserGroupLookup.getAadUserGroupIds(email);
    console.debug("Retrieved AAD group ids for user", email, aadGroupIds);
    if (aadGroupIds.length === 0) {
      return Promise.resolve([]);
    }

    const filter = aadGroupIds.map((id) => `substringof('|${id}',LoginName)`).join(" or ");
    const groupSiteUserInfos = await sp.web.siteUsers.filter(filter).get();
    console.debug("Found SP site users corresponding to AAD groups", groupSiteUserInfos);

    const groupSiteUserMembershipsPromises = groupSiteUserInfos.map((groupSiteUserInfo) =>
      this.getSpUserMemberships(groupSiteUserInfo.Id)
    );

    const groupSiteUserMemberships = await Promise.all(groupSiteUserMembershipsPromises);

    return ([] as ISpGroupMembership[]).concat(...groupSiteUserMemberships);
  }

  private isHttpRequestError(e): e is HttpRequestError {
    return (e as HttpRequestError).isHttpRequestError;
  }

  /**
   * Checks whether the given exception indicates that a user could not be found.
   * @param e The exception to test.
   */
  private async isUserNotFoundException(e): Promise<boolean> {
    if (this.isHttpRequestError(e)) {
      const json = await e.response.json();
      // Error code documented at https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-csom/ee540879(v=office.15)
      return (
        e.status === 500 &&
        typeof json["odata.error"] === "object" &&
        json["odata.error"].code.startsWith("-2146232832,")
      );
    } else {
      return false;
    }
  }
}

export default SpUserGroupLookup;
