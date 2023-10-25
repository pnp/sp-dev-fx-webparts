import { IUserProperties } from "../../../../Services/IUserProperties";


export interface  ByFirstNameState{
    loading:boolean;
    userProperties:IUserProperties[];
    searchFor: string;
    isDataFound:boolean;
}
