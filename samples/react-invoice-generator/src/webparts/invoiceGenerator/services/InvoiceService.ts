import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import { IInvoice } from '../models/index'
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FieldTypes } from "@pnp/sp/fields/types";
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
      return [];
    } catch (error) {
      console.error('Error loading invoices:', error);
      return [];
    }
  }


  /**
   * Provision the invoice list if it does not already exist, and return its ID.
   * Uses the atomic `lists.ensure()` so a re-run is idempotent: an existing list is
   * reused rather than erroring, and the `billTo` field is only added on first creation.
   * Returns undefined on failure.
   */
  public async ensureList(listName: string): Promise<string | undefined> {
    try {
      const result = await this.sp.web.lists.ensure(listName, "List created by Invoice Generator web part");
      if (result.created) {
        const field = await result.list.fields.add("billTo", FieldTypes.Text,
          { FieldTypeKind: 3, Group: "Invoice Generator Fields" });
        await result.list.defaultView.fields.add("billTo");
        console.log(`List '${listName}' created with ID '${result.data.Id}' and field '${field.InternalName}'.`);
      } else {
        console.log(`List '${listName}' already exists (ID '${result.data.Id}') — reusing.`);
      }
      return result.data.Id;
    } catch (error) {
      console.log("Error ensuring list or field:", error);
      return undefined;
    }
  }

  public async getLists(): Promise<IListInfo[]> {
    try {
      const lists = await this.sp.web.lists.select("Id", "Title")();
      return lists;
    } catch (error) {
      console.log(`Error retrieving lists: ${error}`);
      return [];
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
