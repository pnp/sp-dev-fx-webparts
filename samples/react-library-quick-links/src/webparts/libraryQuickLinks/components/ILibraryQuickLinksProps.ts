import type { SPHttpClient } from '@microsoft/sp-http';

export type LibraryView = 'tiles' | 'list';
export type LibrarySort = 'nameAsc' | 'nameDesc' | 'modifiedAsc' | 'modifiedDesc';

export interface ILibraryQuickLinksProps {
  webUrl: string;
  spHttpClient: Pick<SPHttpClient, 'get'>;
  hiddenLibraries?: string;
  viewedAs?: LibraryView;
  sortBy?: LibrarySort;
  showMetadata?: boolean;
  showHeader?: boolean;
  locale?: string;
}
