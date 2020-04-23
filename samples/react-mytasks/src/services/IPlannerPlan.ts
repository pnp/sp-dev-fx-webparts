import { IUser } from "./IUser";


export interface IPlannerPlan {
  createdBy?: IUser;
  createdDateTime: string;
  id: string;
  owner: string;
  title: string;

}


