import { IUserProperties } from "../../../../Services/IUserProperties";


export interface  ByEmailState{
    loading:boolean;
    userProperties:IUserProperties[];
    searchFor: string;
    isDataFound:boolean;
}
