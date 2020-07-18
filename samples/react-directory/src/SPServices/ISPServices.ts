import { PeoplePickerEntity } from '@pnp/sp';

export interface ISPServices {
    getUserProperties(user: string): Promise<any>;
    getUserProfileProperty(user: string, property: string): Promise<string>;
    getUsers(searchUser: string): Promise<PeoplePickerEntity[]>;
    searchUsers(searchString: string, searchFirstName: boolean);

}