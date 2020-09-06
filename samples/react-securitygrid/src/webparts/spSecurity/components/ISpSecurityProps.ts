import { SPSiteUser } from "../../SPSecurityService";
import { SPPermission } from "@microsoft/sp-page-context";
import {  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneDropdownOption, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
import { AadHttpClient } from "@microsoft/sp-http";
import {ISelectedPermission} from "../ISpSecurityWebPartProps";
export interface ISpSecurityProps {
  users: SPSiteUser[];
  //permission: string;
  selectedPermissions:ISelectedPermission[];
  showHiddenLists: boolean;
  showCatalogs:boolean;
  getPermissionTypes:()=> IPropertyPaneDropdownOption[];
  aadHttpClient: AadHttpClient;
  letUserSelectPermission:boolean;
  letUserSelectUsers:boolean;
  letUserSelectLists:boolean;
  includeAdminSelectedLists:boolean; // true to inlude them, false to excluder
  adminSelectedLists:string[];
  listTitleColumnWidth:number;
  showEmail:boolean; //0 show name, 1 show email
  showSecurityGroups:boolean; // show PrincipalType=4
  showUsers:boolean; // show PrincipalType=1
  showOnlyUsersWithPermission:boolean; //// toggle to show everyone, or justy the users who have the permissions
  domElement:any; // needed to disable button postback after render on classic pages
  
  
}
