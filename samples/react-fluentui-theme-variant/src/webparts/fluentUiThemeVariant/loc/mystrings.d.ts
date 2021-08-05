declare interface IFluentUiThemeVariantWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ThemeTypeField: string;
  PrimaryColorField: string;
  TextColorField: string;
  BackgroundColorField: string;
  BackgroundShadingTypeField: string;
  Texts: {
    Current: string;
    Section: string;
    Custom: string;
    None: string;
    Neutral: string;
    Soft: string;
    Strong: string;
  }
}

declare module 'FluentUiThemeVariantWebPartStrings' {
  const strings: IFluentUiThemeVariantWebPartStrings;
  export = strings;
}
