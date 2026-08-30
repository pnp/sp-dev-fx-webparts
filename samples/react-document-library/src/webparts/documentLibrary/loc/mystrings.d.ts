declare interface IDocumentLibraryWebPartStrings {
  PropertyPaneDescription: string;
  LibraryGroupName: string;
  LibraryTitleFieldLabel: string;
  LibraryRootPathFieldLabel: string;
  LibraryRootPathFieldDescription: string;
  WebPartTitleFieldLabel: string;
  DisplayGroupName: string;
  PageSizeFieldLabel: string;
  ShowFoldersFieldLabel: string;
  ShowFileTypeFieldLabel: string;
  ShowModifiedDateFieldLabel: string;
}

declare module 'DocumentLibraryWebPartStrings' {
  const strings: IDocumentLibraryWebPartStrings;
  export = strings;
}
