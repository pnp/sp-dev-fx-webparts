import { IUserProperties } from "../../../Services/IUserProperties";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export interface ITelephoneDirectoryState{
    loading:boolean;
    columns:IColumn[];
    selectedKey:string;
}