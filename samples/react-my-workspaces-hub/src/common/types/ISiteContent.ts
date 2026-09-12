/** Subset of the SharePoint `/_api/web/apptiles` payload we consume. */
export interface IAppDetails {
  AppId: string;
  BaseTemplate: number;
  ChildCount: number;
  Description: string;
  LastModified: string;
  LastModifiedDate: string;
  Target: string;
  Thumbnail: string;
  Title: string;
}

/** Normalized list/library entry rendered in the Site Content drawer. */
export interface ISiteContentItem {
  id: string;
  name: string;
  type: string;
  items?: number;
  modified: string;
  modifiedDate: string;
  description: string;
  thumbnail: string;
  target?: string;
  baseTemplate: number;
  appId: string;
}

/** Minimal Graph drive details surfaced in the details dialog. */
export interface IDriveDetails {
  id?: string;
  description?: string;
  webUrl?: string;
}
