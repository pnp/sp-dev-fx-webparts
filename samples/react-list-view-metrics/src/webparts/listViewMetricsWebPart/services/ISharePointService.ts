export type QueryParams = {
  select?: string | string[];
  expand?: string | string[]; 
  filter?: string;
};

export interface ISharePointService {
  /**
   * Returns list items. If viewGuid is provided, runs the view's CAML.
   * Otherwise runs a REST query that always uses getAll().
   */
  getSharePointItems(
    webUrl: string,
    listGuid: string,
    viewGuid?: string,
    queryParams?: QueryParams
  ): Promise<any[] | undefined>;

  /** Returns the internal names of fields in the specified view. */
  getViewFields(
    webUrl: string,
    listGuid: string,
    viewGuid: string
  ): Promise<string[] | undefined>;

  /** Returns non-hidden, non-readonly fields of the list. */
  getListFields(
    webUrl: string,
    listGuid: string
  ): Promise<any[] | undefined>;
}