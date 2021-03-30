import { IUser } from "./IUser";
import { IUserPresence } from "./IUserPresence";

export interface IUserInfo extends  IUser {
  title:string;
  pictureUrl?: string;
  userUrl?:string;
  presence?: IUserPresence;
  id?:string;
 }
