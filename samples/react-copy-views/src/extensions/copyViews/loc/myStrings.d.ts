declare interface ICopyViewsCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'CopyViewsCommandSetStrings' {
  const strings: ICopyViewsCommandSetStrings;
  export = strings;
}
