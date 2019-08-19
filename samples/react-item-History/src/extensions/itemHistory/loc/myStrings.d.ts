declare interface IItemHistoryCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ItemHistoryCommandSetStrings' {
  const strings: IItemHistoryCommandSetStrings;
  export = strings;
}
