/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPFI, spfi, SPFx as spSPFx } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/site-groups";
import "@pnp/sp/items";

import "@pnp/sp/site-users/web";

export class SPService {
  private sp: SPFI;
  constructor(context: any) {
    this.sp = spfi().using(spSPFx(context));
  }

  public getListItems = async (
    listTitle: string,
    filter: string = "",
    columns: string = "*",
    expand: string = "",
    orderby?: string,
    orderSequence?: boolean
  ): Promise<any> => {
    let items: any = [];
    try {
      if (!orderby) {
        items = await this.sp.web.lists
          .getByTitle(listTitle)
          .items.select(columns)
          .filter(filter)
          .expand(expand)
          .top(5000)();
      } else {
        return await this.sp.web.lists
          .getByTitle(listTitle)
          .items.select(columns)
          .orderBy(orderby, orderSequence)
          .filter(filter)
          .expand(expand)
          .top(5000)();
      }
      return Promise.resolve(items);
    } catch (ex) {
      return Promise.reject(ex);
    }
  };
}
