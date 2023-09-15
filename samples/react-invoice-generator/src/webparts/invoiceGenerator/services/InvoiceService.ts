import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import { IInvoice } from '../models/index'
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFieldAddResult, FieldTypes } from "@pnp/sp/fields/types";
import { IListInfo } from "@pnp/sp/lists";

export class InvoiceService {
  private sp: SPFI;

  constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx(context));
  }

  public async getInvoice(listId: string): Promise<IInvoice[]> {

    try {
      if (listId) {
      const list = this.sp.web.lists.getById(listId);
      const items = await list.items.select('ID', 'Title', 'billTo')();
      return items;
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
      return null;
    }
  }


// eslint-disable-next-line  @typescript-eslint/no-explicit-any
  public async createList(listName: string): Promise<any> {
    try {
      // create list
      const createList = await this.sp.web.lists.add(listName, "List created by Invoice Generator web part");
      const field: IFieldAddResult = await this.sp.web.lists.getByTitle(listName).fields.add("billTo", FieldTypes.Text,
        { FieldTypeKind: 3, Group: "Invoice Generator Fields" });
      // return list ID
      console.log(`List '${listName}' created with ID '${createList.data.Id}' and field '${field.data.InternalName}'.`);
      await this.sp.web.lists.getByTitle(listName).defaultView.fields.add("billTo");
      return createList.data.Id;
    } catch (error) {
      console.log("Error creating list or field:", error);
      return null;
    }

  }

  public async getLists(): Promise<IListInfo[]> {
    try {
      const lists = await this.sp.web.lists.select("Id", "Title")();
      return lists;
    } catch (error) {
      console.log(`Error retrieving lists: ${error}`);
      return null;
    }
  }


  public async listExists(listName: string): Promise<boolean> {
    try {
      const lists = await this.sp.web.lists.filter(`Title eq '${listName}'`)();
      if (lists.length > 0) {
        return true;
      }
    } catch (error) {
      console.error('Error checking if list exists:', error);
    }
    return false;
  }
}
