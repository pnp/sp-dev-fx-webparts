/** A single SharePoint site reference persisted in webpart properties. */
export interface ISelectedSite {
  /** SharePoint site GUID (sharepointIds.siteId from Graph search) */
  id: string;
  /** Human-readable site title */
  displayName: string;
  /** Absolute URL of the site */
  webUrl: string;
}
