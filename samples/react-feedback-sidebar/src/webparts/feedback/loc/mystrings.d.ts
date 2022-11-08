declare interface IFeedbackWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ButtonLabel: string;
  SectionTitle: string;
  FeedbackWrapperDescription: string;
  FeedbackWrapperTitle: string;
  PlaceholderTextarea: string;
  FeedbackSent: string;
  NewFeedback: string;
  Error: string;
  TryAgain: string;
  Send: string;
}

declare module "FeedbackWebPartStrings" {
  const strings: IFeedbackWebPartStrings;
  export = strings;
}
