import { IUserProperties } from "../../../../Services/IUserProperties";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";


export interface  ByEmailState{
    loading:boolean;
    userProperties:IUserProperties[];
    searchFor: string;
    isDataFound:boolean;
}