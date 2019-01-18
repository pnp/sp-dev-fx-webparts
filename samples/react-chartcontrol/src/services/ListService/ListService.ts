import { IListService } from "./IListService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { IListField } from "./IListField";
import { IListItem } from "./IListItem";

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

  public getListItems(listId: string, labelField: string, xValueField: string, yValueField?: string, rValueField?: string): Promise<Array<IListItem>> {
    sp.setup({
      spfxContext: this._context
    });

    return sp.web.lists.getById(listId).items.select("Id", labelField).getAll().then((rows: any[]) => {
      return rows.map((item: any) => {
        let listItem: IListItem = {
          Id: item.Id,
          Label: item[labelField],
          XValue: xValueField && item[xValueField],
          YValue: yValueField && item[yValueField],
          RValue: rValueField && item[rValueField]
        };
        return listItem;
      });
    });
  }
}
