import {  SearchResults } from '@pnp/sp/search';


export interface ISPServices {

    searchUsers(searchString: string, searchFirstName: boolean): Promise<SearchResults>;
    searchUsersNew(searchString: string, srchQry: string, isInitialSearch: boolean): Promise<SearchResults>;

}
