declare interface ICustomLinksWebPartStrings {
  PropertyPaneDescription: string;
  WebPartPropertiesGroupName: string;
  linksLinksGroupName:string;
  TitleFieldLabel: string;
  URLMessageError:string;
  MaxWidthLabel: string;
  MaxHeightLabel: string;
  FontSizeLabel: string;
  ColorLabel: string;
  BackgroundColorLabel:string;
  PanelHeaderDataCollection:string;
  ManageBtnLabel:string;

}

declare module 'CustomLinksWebPartStrings' {
  const strings: ICustomLinksWebPartStrings;
  export = strings;
}
