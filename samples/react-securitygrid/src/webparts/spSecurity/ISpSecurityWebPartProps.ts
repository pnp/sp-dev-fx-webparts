import { SPSiteUser } from "../SPSecurityService";
import { SPPermission } from "@microsoft/sp-page-context";

export interface ISpSecurityWebPartProps {
  users: SPSiteUser[];
  permission: string;
  showHiddenLists: boolean;
  showCatalogs:boolean;
  letUserSelectPermission:boolean;
  letUserSelectUsers:boolean;
  letUserSelectLists:boolean;
  includeAdminSelectedLists:boolean; // true to inlude them, false to excluder
  adminSelectedLists:string[];
  listTitleColumnWidth:number;
  

}
