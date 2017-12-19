import { SPSiteUser } from "../../SPSecurityService";
import { SPPermission } from "@microsoft/sp-page-context";
import {IPropertyPaneDropdownOption} from "@microsoft/sp-webpart-base";
import { GraphHttpClient } from "@microsoft/sp-http";
export interface ISpSecurityProps {
  users: SPSiteUser[];
  permission: string;
  showHiddenLists: boolean;
  showCatalogs:boolean;
  getPermissionTypes:()=> IPropertyPaneDropdownOption[];
  graphHttpClient: GraphHttpClient;
  letUserSelectPermission:boolean;
  letUserSelectUsers:boolean;
  letUserSelectLists:boolean;
  includeAdminSelectedLists:boolean; // true to inlude them, false to excluder
  adminSelectedLists:string[];
  listTitleColumnWidth:number;
  showEmail:boolean; //0 show name, 1 show email
  showSecurityGroups:boolean; // show PrincipalType=4
  showUsers:boolean; // show PrincipalType=1
  domElement:any; // needed to disable button postback after render on classic pages
  
  
}
