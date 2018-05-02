declare interface IMetadataSitePagesCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MetadataSitePagesCommandSetStrings' {
  const strings: IMetadataSitePagesCommandSetStrings;
  export = strings;
}
