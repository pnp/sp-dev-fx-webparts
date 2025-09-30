import { SPSiteUser } from "../../SPSecurityService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";
import { AadHttpClient } from "@microsoft/sp-http";
import {ISelectedPermission} from "../ISpSecurityWebPartProps";

export interface ISpSecurityProps {
  users: SPSiteUser[];
  selectedPermissions:ISelectedPermission[];
  showHiddenLists: boolean;
  showCatalogs:boolean;
  getPermissionTypes:()=> IPropertyPaneDropdownOption[];
  aadHttpClient: AadHttpClient;
  letUserSelectPermission:boolean;
  letUserSelectUsers:boolean;
  letUserSelectLists:boolean;
  letUserSelectSites:boolean;
  includeAdminSelectedLists:boolean; // true to inlude them, false to excluder
  adminSelectedLists:string[];
  listTitleColumnWidth:number;
  showEmail:boolean; //0 show name, 1 show email
  showSecurityGroups:boolean; // show PrincipalType=4
  showUsers:boolean; // show PrincipalType=1
  showOnlyUsersWithPermission:boolean; //// toggle to show everyone, or justy the users who have the permissions
  spContext:WebPartContext
  //domElement:any; // needed to disable button postback after render on classic pages
  
}
