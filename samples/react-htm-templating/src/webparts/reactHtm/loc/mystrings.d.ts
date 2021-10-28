declare interface IReactHtmWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TemplateFieldLabel: string;
  LoadFluentUIFieldLabel: string;
  LoadFluentUISampleDataFieldLabel: string;
  FieldLabelOn: string;
  FieldLabelOff: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
}

declare module 'ReactHtmWebPartStrings' {
  const strings: IReactHtmWebPartStrings;
  export = strings;
}
