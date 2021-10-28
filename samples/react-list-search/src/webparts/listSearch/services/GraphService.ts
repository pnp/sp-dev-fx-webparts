import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/groups";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PnPClientStorage } from "@pnp/common";
import IGraphService from "./IGraphService";



export default class GraphService implements IGraphService {

  private _storage: PnPClientStorage;
  private _localStorageKey: string = 'userGroups';
  // 1 day
  private _expiredTimeMillisecons: number = 8.64e+7;

  public constructor(spfxContext: WebPartContext) {
    graph.setup({
      spfxContext
    });
    this._storage = new PnPClientStorage();
  }

  public async getTransitiveMemberOf(): Promise<string[]> {
    try {
      this._storage.local.deleteExpired();
      let userGroups = this._storage.local.get(this._localStorageKey);
      if (!userGroups) {
        userGroups = await graph.me.getMemberGroups();
        this._storage.local.put(this._localStorageKey, userGroups, new Date(new Date().getTime() + this._expiredTimeMillisecons));
      }
      return userGroups;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
