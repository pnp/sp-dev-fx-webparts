import { ISiteGroupInfo } from "@pnp/sp/site-groups";
import { IRoleDefinition, IRoleDefinitionInfo } from '@pnp/sp/security';
import { IRFx } from '../../../models/IRFx';
import { IRFxFolder } from '../../../models/IRFxFolder';
import { IActivity } from '../../../models/IActivity';
import { ISiteUser } from "@pnp/sp/site-users";
export interface IRequestMaintenanceState {
  currentUserId: number;
  currentUserEMail: string;
  currentUserLoginName: string;
  selectedRfx: IRFx;
  showFolders: boolean;
  rfxFolders:Array<IRFxFolder>;
  rfxs: Array<IRFx>;
  siteGroups: ISiteGroupInfo[];
  showAddNewLibrary: boolean;
  isUpdating: boolean;
  invalidCharacters: boolean;
  // used when adding an rfx::
  newRfxId: string;
  newRfxDescription: string;
  newRFxClosingDate: Date;
  newRFxLibraryMembersGroupName: string;
  newRFxLibraryVisitorsGroupName: string;
  newRFxLibraryOwnersGroupName: string;
  
  showAddNewFolder: boolean;
 
  newFolderName:string;
  newFolderMembersGroupName:string;
  newFolderVisitorsGroupName:string;

  showActivity:boolean;
  activities:Array<IActivity>;

  mainSelectedItemsCount:number;
}
