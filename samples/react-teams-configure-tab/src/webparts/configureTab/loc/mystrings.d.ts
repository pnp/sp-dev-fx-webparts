declare interface IConfigureTabWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TabNamesFieldLabel: string;
  EntityIdsFieldLabel: string;
  ContentPageUrlsFieldLabel: string;
  TabInstructions: string;
  RedirectFieldLabel: string;
  RedirectFieldInstructions: string;
  BlankTabsErrorMessage: string;
  UnevenTabsErrorMessage: string;
}

declare module 'ConfigureTabWebPartStrings' {
  const strings: IConfigureTabWebPartStrings;
  export = strings;
}
