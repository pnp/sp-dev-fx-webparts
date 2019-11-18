import {IUser} from './IUser';
export interface IIdentitySet {
  application: Application;
  device: Application;
  user: IUser;
}

interface Application {
  '@odata.type': string;
}
