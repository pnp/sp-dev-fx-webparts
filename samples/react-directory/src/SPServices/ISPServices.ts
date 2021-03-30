import { PeoplePickerEntity } from '@pnp/sp';

export interface ISPServices {

    searchUsers(searchString: string, searchFirstName: boolean);
    searchUsersNew(searchString: string, srchQry: string, isInitialSearch: boolean, pageNumber?: number);

}