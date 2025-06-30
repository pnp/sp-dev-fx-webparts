import { SPFI } from "@pnp/sp";
import { LogHelper } from "../helpers/LogHelper";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/taxonomy";
import { ITermInfo } from "@pnp/sp/taxonomy";
import "@pnp/sp/items/get-all";
import "@pnp/sp/search";
import { ISearchQuery, SearchResults } from "@pnp/sp/search";

class SPService {
  private static _sp: SPFI;

  public static Init(sp: SPFI): void {
    this._sp = sp;
    LogHelper.info("SPService", "constructor", "PnP SP context initialised");
  }
  public static getListItemsAsync = async (listName: string): Promise<any> => {
    try {
      const items: any = await this._sp.web.lists
        .getByTitle(listName)
        .items.select("*", "ID", "Title")
        .getAll();
      return items;
    } catch (err) {
      LogHelper.error("SPService", "getListItemsAsync", err);
      return null;
    }
  };
  public static getAllTermsByTermSet = async (
    termSetGuid: string
  ): Promise<any> => {
    try {
      // list all the terms available in this term set by term set id
      const terms: ITermInfo[] = await this._sp.termStore.sets
        .getById(termSetGuid)
        .terms();

      return terms;
    } catch (err) {
      LogHelper.error("SPService", "getAllTermsByTermSet", err);
      return null;
    }
  };

  public static getSearchResults = async (
    queryTemplate?: string
  ): Promise<any> => {
    try {
      // define a search query object matching the ISearchQuery interface
      const results2: SearchResults = await this._sp.search(<ISearchQuery>{
        QueryTemplate: queryTemplate,
        Querytext: "",
        RowLimit: 10,
        EnableInterleaving: true,
        SelectProperties: [
          "O3CTax1",
          "Description",
          "DocId",
          "Author",
          "AuthorOWSUSER",
          "Path",
          "NormUniqueID",
          "PictureThumbnailURL",
          "PromotedState",
          "O3CSortableTitle",
          "Title",
        ],
      });

      console.log(results2.ElapsedTime);
      console.log(results2.RowCount);
      console.log(results2.PrimarySearchResults);
      return results2.PrimarySearchResults;
    } catch (err) {
      LogHelper.error("SPService", "getSearchResults", err);
      return null;
    }
  };
}
export default SPService;
