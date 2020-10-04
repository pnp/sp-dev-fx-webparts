import { PrincipalType } from "@pnp/sp/presets/all";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/groups";
import { IUser } from "@pnp/graph/users";

export interface ISpGroupMembership {
  spGroup: string | undefined;
  spGroupId: number | undefined;
  membershipViaPrincipalName: string;
  membershipViaPrincipalType: PrincipalType;
  membershipViaPrincipalSpId: number;
}

class AadUserGroupLookup {
  private aadUserPromises: Map<string, Promise<any>> = new Map();
  private aadUserGroupIdsPromises: Map<string, Promise<string[]>> = new Map();

  public async getAadUser(email: string | undefined): Promise<IUser> {
    if (this.aadUserPromises.has(email)) {
      return this.aadUserPromises.get(email);
    } else {
      let aadUserPromise: Promise<IUser>;
      if (email) {
        console.debug("Getting AAD user by email:", email);
        aadUserPromise = graph.users.getById(email).get();
      } else {
        console.debug("Getting AAD user for current user");
        aadUserPromise = graph.me() as Promise<IUser>;
      }

      this.aadUserPromises.set(email, aadUserPromise);
      return aadUserPromise;
    }
  }

  public getAadUserGroupIds(email: string): Promise<string[]> {
    if (this.aadUserGroupIdsPromises.has(email)) {
      return this.aadUserGroupIdsPromises.get(email);
    } else {
      let aadUserGroupIds: Promise<string[]>;
      if (email) {
        console.debug("Getting AAD group ids for user by email:", email);
        aadUserGroupIds = graph.users.getById(email).getMemberGroups();
      } else {
        console.debug("Getting AAD group ids for current user");
        aadUserGroupIds = graph.me.getMemberGroups();
      }
      this.aadUserGroupIdsPromises.set(email, aadUserGroupIds);
      return aadUserGroupIds;
    }
  }
}

export default AadUserGroupLookup;
