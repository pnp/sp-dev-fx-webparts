import {  SearchResults } from '@pnp/sp/search';

export interface ISPServices {
  searchUsersNew(
    searchString: string,
    srchQry: string,
    isInitialSearch: boolean
  ): Promise<SearchResults>;
}
