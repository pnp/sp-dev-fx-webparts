import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { SPFI } from "@pnp/sp";
import { FormResultsModel, FormResultsSchema } from "./Models";


export default class SharePointHelper {
  public static async GetFormResultsData(sp: SPFI): Promise<FormResultsModel> {
      const items = await sp.web.lists
        .getByTitle("Form Results")
        .items
        .expand('Contact')
        .select(
          "Id",
          "Title",
          "Description",
          "Qty",
          "Rating",
          "IsActive",
          "Status",
          "PublishDate",
          "Contact/Title",
          "Email"
        )();

      // Parse data into a fully typed object
      return FormResultsSchema.parse(items);
  }
}
