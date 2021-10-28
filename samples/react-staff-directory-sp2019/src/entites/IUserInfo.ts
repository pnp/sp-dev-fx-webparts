
/* tslint:disable */
import { IUser } from "./IUser";
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
  department:string;
  workPhone?:string;
  cellPhone?:string;
  location?:string;
  office?: string;
 }
