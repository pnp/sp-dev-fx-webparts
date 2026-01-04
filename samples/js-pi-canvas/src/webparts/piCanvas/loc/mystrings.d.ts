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

  // Content type strings (v3.0)
  ContentTypeLabel: string;
  ContentTypeWebPart: string;
  ContentTypeSection: string;
  ContentTypeMarkdown: string;
  ContentTypeHtml: string;
  ContentTypeMermaid: string;
  ContentTypeEmbed: string;

  // Custom content strings (v3.0)
  CustomContentLabel: string;
  MarkdownPlaceholder: string;
  HtmlPlaceholder: string;
  MermaidPlaceholder: string;

  // Embed strings (v3.0)
  EmbedUrlLabel: string;
  EmbedUrlDescription: string;
  EmbedHeightLabel: string;
  EmbedHeightPlaceholder: string;

  // Feature toggle strings (v3.0)
  EnableDeepLinkingLabel: string;
  EnableDeepLinkingDescription: string;
  EnableLazyLoadingLabel: string;
  EnableLazyLoadingDescription: string;

  // Accessibility strings (v3.0)
  TabListAriaLabel: string;
}

declare module 'PiCanvasWebPartStrings' {
  const strings: IPiCanvasWebPartStrings;
  export = strings;
}
