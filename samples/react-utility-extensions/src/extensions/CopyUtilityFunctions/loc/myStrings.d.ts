declare interface ICopyDocumentNameCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'CopyDocumentNameCommandSetStrings' {
  const strings: ICopyDocumentNameCommandSetStrings;
  export = strings;
}
