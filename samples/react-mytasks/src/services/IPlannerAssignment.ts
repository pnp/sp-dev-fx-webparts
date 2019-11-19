import {IUser} from './IUser';
export interface IPlannerAssignment {
  "@odata.type"?:string;
  assignedDateTime?: string;
  orderHint: string;
  assignedBy?: IUser;
}
