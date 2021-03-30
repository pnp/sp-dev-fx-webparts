import { SPSecurityInfo } from "../../SPSecurityService";
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
export interface ISpSecurityState {
  securityInfo: SPSecurityInfo;
  // permission: string;
  selectedPermissions: ISelectedPermission[];
  showUserPanel: boolean;
  showListPanel: boolean;
  showPermissionsPanel: boolean;
  showEmail: boolean; //0 show name, 1 show email
  securityInfoLoaded: boolean;
  errors: Array<string>;

}
