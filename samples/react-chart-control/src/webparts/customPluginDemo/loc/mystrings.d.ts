declare interface ICustomPluginDemoWebPartStrings {
  WebPartDescription: string;
  MoreInfoLinkUrl: string;
  Bugs: string;
  Fixes: string;
  Redesigns: string;
}

declare module 'CustomPluginDemoWebPartStrings' {
  const strings: ICustomPluginDemoWebPartStrings;
  export = strings;
}
