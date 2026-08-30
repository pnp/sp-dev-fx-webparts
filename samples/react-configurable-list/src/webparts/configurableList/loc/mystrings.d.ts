declare interface IConfigurableListWebPartStrings {
  ConfigurationGroupName: string;
  ListTitleFieldLabel: string;
  VisibleFieldsFieldLabel: string;
  VisibleFieldsFieldDescription: string;
  TitleFieldLabel: string;
  PageSizeFieldLabel: string;
  DefaultSortFieldLabel: string;
  DefaultSortDirectionLabel: string;
  AscendingOption: string;
  DescendingOption: string;
  EnableSearchFieldLabel: string;
  OnText: string;
  OffText: string;
}

declare module 'ConfigurableListWebPartStrings' {
  const strings: IConfigurableListWebPartStrings;
  export = strings;
}
