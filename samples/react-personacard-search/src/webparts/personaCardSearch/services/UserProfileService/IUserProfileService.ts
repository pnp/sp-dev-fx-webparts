import { IPerson } from '../../index';

export interface IUserProfileService {   
    getPropertiesForUsers: (userLoginNames: string[]) => Promise<IPerson[]>;   
}