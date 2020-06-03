declare interface IVersionDisplayWebPartStrings {
  WebPartDescription: string;
  WebParttitle: string;
  ManifestVersionLabel: string;
  StaticImportVersionLabel: string;
  RequireVersionLabel: string;
  AboutGroupName: string;
  PropertyPaneDescription: string;
}

declare module 'VersionDisplayWebPartStrings' {
  const strings: IVersionDisplayWebPartStrings;
  export = strings;
}
