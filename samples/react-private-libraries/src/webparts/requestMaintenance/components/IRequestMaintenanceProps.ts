import { ISiteGroupInfo } from "@pnp/sp/site-groups";
import { IRoleDefinition, IRoleDefinitionInfo } from '@pnp/sp/security';


import { ISiteUser } from "@pnp/sp/site-users";

import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';  

export interface IRequestMaintenanceProps {
  
  siteOwnersGroup:ISiteGroupInfo; // Site owners groupw will be given full contyrol on new libraros
  rfxListTitle:string; // the name of the list that holds all the RFX Info
  rfxFoldersListTitle:string; // the name of the list that holds all the RFX Folder Info
  archiveLibraryTitle:string; // the name of the library that ther archive button moves stuff to.
  webServerRelativeUrl:string;
  roleDefinitions:Array<IRoleDefinitionInfo>;// all role definitions on the site
  roleDefinitionForLibraryMembersGroupOnLibrary:string;// each new RFX library has an group created for internal users. What role should that group have on trghe library (Contribute)
  roleDefinitionForLibraryMembersGroupOnSite: string; // each new RFX library has an group created for internal users. What role should that group have on trghe site (READ)
  roleDefinitionForLibraryMembersGroupOnFolder: string; // each new RFX library has an group created for internal users. What role should that group have on trghe site (READ)

  roleDefinitionForLibraryVisitorsGroupOnLibrary:string;// each new RFX library has an group created for external users. What role should that group have on trghe library (Contribute)
  roleDefinitionForLibraryVisitorsGroupOnSite: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
  roleDefinitionForLibraryVisitorsGroupOnFolder: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)

  roleDefinitionForFolderMembersOnFolder:string;
  roleDefinitionForFolderMembersOnLibrary:string;
  roleDefinitionForFolderMembersOnSite:string;
  
  
  roleDefinitionForFolderVisitorsOnFolder:string;
  roleDefinitionForFolderVisitorsOnLibrary:string;
  roleDefinitionForFolderVisitorsOnSite:string;

  allowGroupNameChanges:boolean;
  enablePrivateFolders:boolean;

  
  
}
