declare interface IWorkbenchCustomizerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  CustomWorkbenchStylesFieldLabel: string;
  customWorkbenchStylesFullWidthFieldLabel: string;
  PreviewModeFieldLabel: string;
}

declare module 'WorkbenchCustomizerWebPartStrings' {
  const strings: IWorkbenchCustomizerWebPartStrings;
  export = strings;
}
