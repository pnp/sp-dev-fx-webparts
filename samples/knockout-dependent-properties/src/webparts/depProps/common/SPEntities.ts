/**
 * Represents SharePoint View object
 */
export interface ISPView {
  Title: string;
  Id: string;
  ListId: string;
}

/**
 * Represents SharePoint List object
 */
export interface ISPList {
  Title: string;
  Id: string;
}

/**
 * Represents SharePoint REST service response for /_api/web/lists service call
 */
export interface ISPLists {
  value: ISPList[];
}

/**
 * Represents SharePoint REST service response for /_api/web/lists('id')/views service call
 */
export interface ISPViews {
  value: ISPView[];
}