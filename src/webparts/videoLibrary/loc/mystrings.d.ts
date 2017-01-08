declare interface IVideoLibraryStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  VideoChannelFieldLabel: string;
  ListNameFieldLabel: string;
  LayoutFieldLabel: string;
  DurationFieldLabel: string;
  PanelsFieldLabel: string;
  EaseFieldLabel: string;
}

declare module "videoLibraryStrings" {
  const strings: IVideoLibraryStrings;
  export = strings;
}
