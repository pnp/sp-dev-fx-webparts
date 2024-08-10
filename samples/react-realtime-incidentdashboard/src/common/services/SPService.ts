import { SPFI } from "@pnp/sp";
import { RenderListDataOptions } from "@pnp/sp/lists";
import { LogHelper } from "../helpers/LogHelper";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";

class SPService {
  private static _sp: SPFI;

  public static Init(sp: SPFI) {
    this._sp = sp;
    LogHelper.info("SPService", "constructor", "PnP SP context initialised");
  }
  public static getTicketsAsync = async (listId: string) => {
    try {
      const items: any = await this._sp.web.lists
        .getById(listId)
        .items.select("*", "ID", "Title")
        .orderBy("Modified", false)
        .getAll();
      console.log("SPService -> getTicketsAsync", items);
      return items;
    } catch (err) {
      LogHelper.error("SPService", "getTicketsAsync", err);
      return null;
    }
  };
  public static getListItemsStreamAsync = async (listName: string) => {
    try {
      const items: any = await this._sp.web.lists
        .getByTitle(listName)
        .renderListDataAsStream({
          RenderOptions: RenderListDataOptions.ListData,
        });

      return items;
    } catch (err) {
      LogHelper.error("PnPSPService", "getListItemsStreamAsync", err);
      return null;
    }
  };
}
export default SPService;
