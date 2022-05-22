declare interface IFindParkerWebPartStrings {
  PropertyPaneDescription: string;
  PropertyPaneBasicGroupName: string;
  PropertyPaneNumberOfElementsFieldLabel: string;
  GameTitle: string;
  GameDescription: string;
  CouldNotFindPlaceForParkersDescription: string;
  StartGameButton: string;
  RestartGameButton: string;
  EndGameMessage: string;
  GameProgressELementsLabel: string;
  GameProgressLabel: string;
}

declare module 'FindParkerWebPartStrings' {
  const strings: IFindParkerWebPartStrings;
  export = strings;
}
