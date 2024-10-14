import { graphfi, GraphFI, SPFx } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/groups";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PnPClientStorage } from "@pnp/common";


let _graph: GraphFI
export default class GraphService {

  private _storage: PnPClientStorage;
  private _localStorageKey = 'userGroups';
  // 1 day
  private _expiredTimeMillisecons = 8.64e+7;

  public constructor(spfxContext: WebPartContext) {
    _graph = graphfi().using(SPFx(spfxContext));
    this._storage = new PnPClientStorage();
  }

  public async getTransitiveMemberOf(): Promise<string[]> {
    try {
      this._storage.local.deleteExpired();
      let userGroups = this._storage.local.get(this._localStorageKey);
      if (!userGroups) {
        userGroups = await _graph.me.getMemberGroups();
        this._storage.local.put(this._localStorageKey, userGroups, new Date(new Date().getTime() + this._expiredTimeMillisecons));
      }
      return userGroups;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
