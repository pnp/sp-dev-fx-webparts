import { IListService } from "./IListService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { IListField } from "./IListField";
import { SPHttpClient } from "@microsoft/sp-http";

export class ListService implements IListService {
  private _context: WebPartContext;

  /**
   *
   */
  constructor(context: WebPartContext) {
    this._context = context;
  }

  public getFields = (listId: string): Promise<Array<IListField>> => {
    sp.setup({
      spfxContext: this._context
    });

    return sp.web.lists.getById(listId).fields.filter('ReadOnlyField eq false and Hidden eq false')
      .select("Id", "Title", "InternalName", "TypeAsString").get();
  }
}
