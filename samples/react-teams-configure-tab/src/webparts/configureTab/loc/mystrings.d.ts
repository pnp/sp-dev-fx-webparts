declare interface IConfigureTabWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TabNamesFieldLabel: string;
  TabNamesFieldInstructions: string;
  EntityIdsFieldLabel: string;
  EntityIdsFieldInstructions: string;
  ContentPageUrlsFieldLabel: string;
  ContentPageUrlsFieldInstructions: string;
  RedirectFieldLabel: string;
  RedirectFieldInstructions: string;
}

declare module 'ConfigureTabWebPartStrings' {
  const strings: IConfigureTabWebPartStrings;
  export = strings;
}
