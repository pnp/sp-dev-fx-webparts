declare interface IPersonaCardSearchWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ResultSourceIdLabel: string;
  LoadingMessage:string;
  SearchSettingsGroupName: string; 
  MaxResultsCount: string;
  NoResultMessage: string;
  RefinersFieldLabel: string;
  SearchQueryPlaceHolderText: string; 
  PlaceHolderEditLabel: string;
  PlaceHolderConfigureBtnLabel: string;
  PlaceHolderIconText: string;
  PlaceHolderDescription: string;  
}

declare module 'PersonaCardSearchWebPartStrings' {
  const strings: IPersonaCardSearchWebPartStrings;
  export = strings;
}
