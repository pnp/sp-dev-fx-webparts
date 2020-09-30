import { IAssign } from "./IAssign";

export interface IAssignsState{
unAssigns: JSX.Element[];
assigns:JSX.Element[];
nonMembers?:JSX.Element[];
hasMoreMembers:boolean;
hasError:boolean;
messageError: string;
isloading: boolean;
searchValue?:string;
}
