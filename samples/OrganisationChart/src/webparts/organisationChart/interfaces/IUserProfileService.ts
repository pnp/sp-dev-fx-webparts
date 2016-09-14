import { IPerson } from '../interfaces/IPerson';

export interface IUserProfileService {
  getPropertiesForCurrentUser: () => Promise<IPerson>;
  getManagers: (userLoginNames: string[]) => Promise<IPerson[]>;
  getReports: (userLoginNames: string[]) => Promise<IPerson[]>;
}