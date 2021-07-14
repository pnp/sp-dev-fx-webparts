import { ISiteGroupInfo } from "@pnp/sp/site-groups";
import { IRoleDefinition, IRoleDefinitionInfo } from '@pnp/sp/security';
export interface IVendorMaintenanceProps {
  ownersGroup:ISiteGroupInfo;
  vendorListTitle:string;
  webServerRelativeUrl:string;
  roleDefinitionForSite: string; //role to give new groups in the site
  roleDefinitions:Array<IRoleDefinitionInfo>;
}
