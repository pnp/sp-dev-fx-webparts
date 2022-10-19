declare interface IFlowButtonWebPartStrings {
  PropertyPaneDescription: string;
  EnvironmentLabel: string;
  EnvironmentEmptyError: string;
  RunButtonText: string;
}

declare module 'FlowButtonWebPartStrings' {
  const strings: IFlowButtonWebPartStrings;
  export = strings;
}
