declare interface IComparerWebPartStrings {
  PropertyPaneDescription: string;
  LayoutGroupName: string;
  BeforeLabelFieldLabel: string;
  AfterLabelFieldLabel: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
  ImagesGroupName: string;
  BeforeImageLabelFieldLabel: string;
  BeforeImageFieldLabel: string;
  BeforeImageButtonLabel: string;
  AfterImageLabelFieldLabel: string;
  AfterImageFieldLabel: string;
  AfterImageButtonLabel: string;
  StartPositionFieldLabel: string;
  HeightFieldLabel: string;
  ReadOnlyPlaceholderIconText: string;
  ReadOnlyPlaceholderDescription: string;
}

declare module 'ComparerWebPartStrings' {
  const strings: IComparerWebPartStrings;
  export = strings;
}
