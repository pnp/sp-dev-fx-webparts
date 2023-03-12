import { IUserProperties } from "../../../../Services/IUserProperties";
export interface  ByLastNameState{
    loading:boolean;
    userProperties:IUserProperties[];
    searchFor: string;
    isDataFound:boolean;
}
