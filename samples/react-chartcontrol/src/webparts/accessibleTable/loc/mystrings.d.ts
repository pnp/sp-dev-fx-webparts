declare interface IAccessibleTableWebPartStrings {
  DatasetFieldLabel: string;
  TitleFieldLabel: string;
  ChartSettingsGroupName: any;
  CaptionFieldLabel: string;
  TableWarning: string;
  ChartTitle: string;
  PropertyPaneDescription: string;
  AccessibilitySettingsGroupName: string;
  SummaryFieldLabel: string;
  SummaryFieldDescription: string;
  DatasetLabel: string;
  DataLabels: string[];
  CaptionFieldDescription: string;
  Loading: string;
}

declare module 'AccessibleTableWebPartStrings' {
  const strings: IAccessibleTableWebPartStrings;
  export = strings;
}
