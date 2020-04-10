declare interface IVersionDisplayWebPartStrings {
  ManifestVersionLabel: string;
  StaticImportVersionLabel: string;
  WebPartVersionLabel: string;
  AboutGroupName: string;
  PropertyPaneDescription: string;
}

declare module 'VersionDisplayWebPartStrings' {
  const strings: IVersionDisplayWebPartStrings;
  export = strings;
}
