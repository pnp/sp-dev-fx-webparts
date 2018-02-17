declare interface IYoutubeWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ApiKeyFieldLabel: string;
  ChannelIdFieldLabel: string;
  MaxResults: string;
}

declare module 'YoutubeWebPartStrings' {
  const strings: IYoutubeWebPartStrings;
  export = strings;
}
