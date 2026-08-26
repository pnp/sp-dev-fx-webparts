declare interface IRatingsWebPartStrings {
  PropertyPaneDescription: string;
  ColorFieldLabel: string;
  ColorFieldOptions: Record<'brand' | 'marigold' | 'neutral', string>;
  SizeFieldLabel: string;
  SizeFieldOptions: Record<'small' | 'medium' | 'large', string>;
  TitleFieldLabel: string;
  RateThisPageLabel: string;
  YourRatingLabel: string;
}

declare module 'RatingsWebPartStrings' {
  const strings: IRatingsWebPartStrings;
  export = strings;
}
