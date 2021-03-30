declare interface IOutlook2SharePointWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  SaveMetadataFieldLabel: string;
  SaveInfo: string;
  To: string;
  On: string;
  SaveLabel: string;
  SpinnerLabel: string;
  SuccessMessage: string;
  ErrorMessage: string;
}

declare module 'Outlook2SharePointWebPartStrings' {
  const strings: IOutlook2SharePointWebPartStrings;
  export = strings;
}
