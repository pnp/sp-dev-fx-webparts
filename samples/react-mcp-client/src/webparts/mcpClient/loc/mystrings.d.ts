declare interface IMcpClientWebPartStrings {
  PropertyPaneDescription: string;
  ServerGroupName: string;
  UseMockServerFieldLabel: string;
  MockOn: string;
  MockOff: string;
  EndpointFieldLabel: string;
  EndpointFieldDescription: string;
  AadResourceFieldLabel: string;
  AadResourceFieldDescription: string;
}

declare module 'McpClientWebPartStrings' {
  const strings: IMcpClientWebPartStrings;
  export = strings;
}
