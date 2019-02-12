declare interface IWorkbenchCustomizerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  MaxWidthFieldLabel: string;
  CenterCanvasFieldLabel: string;
  OverflowFieldLabel: string;
  PaddingFieldLabel: string;
}

declare module 'WorkbenchCustomizerWebPartStrings' {
  const strings: IWorkbenchCustomizerWebPartStrings;
  export = strings;
}
