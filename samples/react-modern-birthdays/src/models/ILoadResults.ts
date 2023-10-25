import { IUser } from './birthdays';

export interface ILoadResults {
  mapdata: IUser[];
  isloading: boolean;
  error: Error;
}
