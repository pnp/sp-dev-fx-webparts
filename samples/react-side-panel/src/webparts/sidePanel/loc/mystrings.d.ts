declare interface ISidePanelStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  PanelPositionFieldLabel: string;
}

declare module 'sidePanelStrings' {
  const strings: ISidePanelStrings;
  export = strings;
}
