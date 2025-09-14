import { IListService } from "./IListService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import { IListField } from "./IListField";
import { IListItem } from "./IListItem";

export class ListService implements IListService {
  private _sp: any;

  /**
   *
   */
  constructor(context: WebPartContext) {
    this._sp = spfi().using(SPFx(context));
  }

  public getFields = (listId: string): Promise<Array<IListField>> => {
    return this._sp.web.lists.getById(listId).fields.filter('ReadOnlyField eq false and Hidden eq false')
      .select("Id", "Title", "InternalName", "TypeAsString")();
  }

  public getListItems(listId: string, labelField: string, valueField: string, yValueField?: string, rValueField?: string): Promise<Array<IListItem>> {
    // build the list of fields we need
    let fields: string[] = ["Id", labelField, valueField];

    // Add the y value if necessary
    if (yValueField) {
      fields.push(yValueField);
    }

    // Add a R value if necessary
    if (rValueField) {
      fields.push(rValueField);
    }

    return this._sp.web.lists.getById(listId).items.select(...fields).getAll().then((rows: any[]) => {
      return rows.map((item: any) => {
        let listItem: IListItem = {
          Id: item.Id,
          Label: item[labelField],
          Value: valueField && item[valueField],
          YValue: yValueField && item[yValueField],
          RValue: rValueField && item[rValueField]
        };
        return listItem;
      });
    });
  }
}
