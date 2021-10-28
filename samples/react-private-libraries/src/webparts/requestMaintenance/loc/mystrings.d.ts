declare interface IRequestMaintenanceWebPartStrings {
  instrumentationKey:string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  rfxListTitleLabel:string;
  rfxFoldersListTitleLabel:string;
  archiveLibraryTitle:string;
privateFoldersEnabled:string;
privateFoldersDisabled:string;
privateFolders:string;
  
  // Library member permissions
  roleDefinitionForLibraryMembersGroupOnLibrary:string;
  roleDefinitionForLibraryMembersGroupOnSite:string;
  roleDefinitionForLibraryMembersGroupOnFolder:string;
  

  // library visitor permissions
  roleDefinitionForLibraryVisitorsGroupOnLibrary:string;
  roleDefinitionForLibraryVisitorsGroupOnSite:string;
  roleDefinitionForLibraryVisitorsGroupOnFolder:string;

  // folder member permissions
  roleDefinitionForFolderMembersOnFolder:string;
  roleDefinitionForFolderMembersOnLibrary:string;
  roleDefinitionForFolderMembersOnSite:string;
  
  roleDefinitionForFolderVisitorsOnFolder:string;
  roleDefinitionForFolderVisitorsOnLibrary:string;
  roleDefinitionForFolderVisitorsOnSite:string;
  allowGroupNameChanges:string;
}

declare module 'RequestMaintenanceWebPartStrings' {
  const strings: IRequestMaintenanceWebPartStrings;
  export = strings;
}
