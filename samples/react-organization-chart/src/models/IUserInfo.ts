
/* tslint:disable */
import { IUser } from "./IUser";
import { UserType } from "./UserType";

export interface IUserInfo extends  IUser {
  title:string;
  pictureUrl?: string;
  userUrl?:string;
  id?:string;
  hasDirectReports?:boolean;
  numberDirectReports?:number;
  hasPeers?:boolean;
  numberPeers?:number;
  manager?:string;
  department?:string;
  workPhone?:string;
  cellPhone?:string;
  location?:string;
  office?: string;
  userType: UserType;
}
