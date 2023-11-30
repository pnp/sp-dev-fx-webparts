import { Guid } from "@microsoft/sp-core-library";
import { ISearchResult } from "@pnp/sp/search";
import { SearchHit } from "@microsoft/microsoft-graph-types";

export interface ISearchResultExtended extends ISearchResult {
  SPSiteURL?: string;
  ListItemId?: number;
  ListId?: string;
  ListUrl?: string;
  SharedWithUsersOWSUSER?: string;
  FileName?: string;
  SharedWithDetails?: string;
  Rank?: number;
  DocId?: number;
  WorkId?: number;
  IdentityListItemId?: Guid;
  ViewableByExternalUsers?: boolean;
  DriveItemId?: string;
  FileId?: string;
  DriveId?: string;
  SiteUrl?: string;
}

export interface IGraphSearchResultExtended extends SearchHit {

}
