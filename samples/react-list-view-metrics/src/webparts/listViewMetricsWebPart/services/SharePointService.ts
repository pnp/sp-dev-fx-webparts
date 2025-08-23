/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Log } from "@microsoft/sp-core-library";
import { BaseWebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Web } from "@pnp/sp";

// Local imports
import { ISharePointService } from "./ISharePointService";

const LOG_SOURCE = "SharePointService";

// Query parameters for REST retrieval
// - select: fields to return, or "*" to request all fields
// - expand: navigation properties to expand
// - filter: OData filter string
type QueryParams = {
  select?: string | string[]; // '*' => all fields (skip .select())
  expand?: string | string[];
  filter?: string;
};

// Utility: normalize single string or CSV string into array<string>
const toArray = (v?: string | string[]) =>
  v
    ? Array.isArray(v)
      ? v
      : v
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
    : [];

// Utility: detect special case where user wants all fields
const isAllFields = (v?: string | string[]) =>
  typeof v === "string" && v.trim() === "*";

export class SharePointService implements ISharePointService {
  constructor(private context: BaseWebPartContext) {
    // Bind PnPjs to the SPFx context
    sp.setup({ spfxContext: this.context });
  }

  /**
   * Get list fields (visible and editable only).
   * Hidden and read-only fields are filtered out.
   */
  public async getListFields(
    webUrl: string,
    listGuid: string
  ): Promise<any[] | undefined> {
    try {
      const web = new Web(webUrl);
      const list = web.lists.getById(listGuid);

      return await list.fields
        .filter(`Hidden eq false and ReadOnlyField eq false`)
        .get();
    } catch (error) {
      Log.error(LOG_SOURCE, error as Error);
      return undefined;
    }
  }

  /**
   * Get field internal names defined in a specific view.
   */
  public async getViewFields(
    webUrl: string,
    listGuid: string,
    viewGuid: string
  ): Promise<any[] | undefined> {
    try {
      const web = new Web(webUrl);
      const list = web.lists.getById(listGuid);

      // Returns a field collection wrapper with an Items array
      const viewFields: any = await list.views.getById(viewGuid).fields.get();
      return viewFields?.Items ?? [];
    } catch (error) {
      Log.error(LOG_SOURCE, error as Error);
      return undefined;
    }
  }

  /**
   * Get list items using either:
   *  - CAML query (if a viewGuid is provided → respects view filters, sorting, etc.)
   *  - REST API (if no viewGuid → uses queryParams for select/expand/filter)
   */
  public async getSharePointItems(
    webUrl: string,
    listGuid: string,
    viewGuid?: string,
    queryParams?: QueryParams
  ): Promise<any[] | undefined> {
    try {
      const web = new Web(webUrl);
      const list = web.lists.getById(listGuid);

      // ----------------------
      // Branch 1: Use the view's CAML
      // ----------------------
      if (viewGuid) {
        const { ViewQuery } = await list.views
          .getById(viewGuid)
          .select("ViewQuery")
          .get();

        // Wrap the view query inside a <View> element
        const viewXml = `<View><Query>${ViewQuery ?? ""}</Query></View>`;

        // "FieldValuesAsText" ensures text projections for all fields
        return await list.getItemsByCAMLQuery(
          { ViewXml: viewXml },
          "FieldValuesAsText"
        );
      }

      // ----------------------
      // Branch 2: REST query
      // ----------------------
      const { select, expand, filter } = queryParams ?? {};
      let q = list.items;

      // Apply select only if not '*' and not empty
      if (!isAllFields(select)) {
        const sel = toArray(select);
        if (sel.length) q = q.select(...sel);
      }

      // Apply expand if provided
      const exp = toArray(expand);
      if (exp.length) q = q.expand(...exp);

      // Apply filter if provided
      if (filter) q = q.filter(filter);

      // Always use .getAll() → ensures large lists are fully retrieved
      return await q.getAll();
    } catch (error) {
      Log.error(LOG_SOURCE, error as Error);
      return undefined;
    }
  }
}
