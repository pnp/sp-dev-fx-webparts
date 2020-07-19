import { PeoplePickerEntity } from '@pnp/sp';

export interface ISPServices {

    searchUsers(searchString: string, searchFirstName: boolean);

}