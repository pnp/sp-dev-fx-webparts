import { SPSiteUser } from "../SPSecurityService";
export interface ISelectedPermission {
  permission: string;
  color: string;
  iconName:string;
  freindlyName:string;
  isChecked?:boolean;
}


export interface ISpSecurityWebPartProps {
  users: SPSiteUser[];
  //permission: string; // used if only one permission selected.... gonzo, all new now
  selectedPermissions: ISelectedPermission[];// used if multiple  permissions selected
  showHiddenLists: boolean;
  showCatalogs: boolean;
  letUserSelectPermission: boolean;
  letUserSelectUsers: boolean;
  letUserSelectLists: boolean;
  includeAdminSelectedLists: boolean; // true to inlude them, false to excluder
  adminSelectedLists: string[];
  listTitleColumnWidth: number;
  showEmail: boolean; //0 show name, 1 show email
  showSecurityGroups: boolean; // show PrincipalType=4
  showUsers: boolean; // show PrincipalType=1
  showOnlyUsersWithPermission;// toggle to show everyone, or justy the users who have the permissions


}
