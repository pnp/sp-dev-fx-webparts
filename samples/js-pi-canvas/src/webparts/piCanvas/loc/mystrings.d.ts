declare interface IPiCanvasWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SectionClass: string;
  WebPartClass: string;
  TabLabels: string;
  ManageTabLabels: string;
  AppTitle: string;
  OriginalAuthor: string;
  UpgradedBy: string;

  // Template strings
  TemplatesGroupName: string;
  TemplatesDescription: string;
  ApplyTemplateLabel: string;
  SelectTemplatePlaceholder: string;
  BuiltInTemplatesHeader: string;
  SavedTemplatesHeader: string;
  ApplyTemplateButton: string;
  ExportImportHeader: string;
  ExportConfigLabel: string;
  ImportConfigLabel: string;
  SaveAsTemplateLabel: string;
  TemplateNamePrompt: string;
  ExportSuccessMessage: string;
  ImportSuccessMessage: string;
  SaveTemplateSuccessMessage: string;
  ImportErrorMessage: string;
  SaveTemplateErrorMessage: string;
  NoSiteAssetsAccess: string;

  // Permission strings
  PermissionHeaderLabel: string;
  PermissionEnabledLabel: string;
  PermissionGroupsLabel: string;
  PermissionGroupsDescription: string;
  PermissionCustomGroupsLabel: string;
  PermissionCustomGroupsPlaceholder: string;
  PermissionCustomGroupsDescription: string;
  PermissionVisibleToAll: string;
  PermissionOwnersLabel: string;
  PermissionMembersLabel: string;
  PermissionVisitorsLabel: string;
  PermissionOwnersMembers: string;
  PermissionMembersVisitors: string;
  PermissionAllGroups: string;

  // Permission placeholder strings
  PermissionPlaceholderLabel: string;
  PermissionPlaceholderDescription: string;
  PermissionPlaceholderTextLabel: string;
  PermissionPlaceholderTextPlaceholder: string;
  PermissionPlaceholderDefault: string;
}

declare module 'PiCanvasWebPartStrings' {
  const strings: IPiCanvasWebPartStrings;
  export = strings;
}
