declare interface IFluentUiThemeVariantWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ThemeTypeField: string;
  BackgroundShadingTypeField: string;
  CustomPaletteField: string;
  CustomPaletteMessageField: string;
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
