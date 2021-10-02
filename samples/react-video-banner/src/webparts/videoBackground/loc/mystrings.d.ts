declare interface IVideoBackgroundWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  StylesGroupName: string;
  wpTitleLabel: string;
  videoUrlLabel: string;
  selectVideo: string;
  selectColor: string;
  selectBrightness: string;
  selectHeight: string;
}

declare module 'VideoBackgroundWebPartStrings' {
  const strings: IVideoBackgroundWebPartStrings;
  export = strings;
}
