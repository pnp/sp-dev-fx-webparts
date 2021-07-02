import { ISiteGroupInfo } from "@pnp/sp/site-groups";
import { IVendor } from '../../../models/IVendor';
export interface IVendorMaintenanceState {
  vendors: Array<IVendor>;
  newVendorTitle:string;
  newVendorGroupName:string;
  showAddNew:boolean;
  isUpdating:boolean; //disable save button while update in progress

}
