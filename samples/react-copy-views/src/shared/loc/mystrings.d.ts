declare interface ICopyViewsSharedStrings {
  CopyViews: string;
  NoOptions: string;
  NoOptionsMinimumChars: string;
  SearchAndSelectSourceSite: string;
  SelectAList: string;
  ListHeader: string;
  LibraryHeader: string;
  SelectViewsToCopy: string;
  SelectASiteAndList: string;

  TargetSearchLabel: string;
  TargetSearchPlaceholder: string;
  SelectListsToCopyViewsTo: string;
  NoListsFound: string;
  Copy: string;
  ErrorOccurred: string;
  SeeMore: string;
  Retry: string;
  SetAsDefaultView: string;
  ViewTypeNotSupported: string;
  CopyStatus: string;
  BusyCopyingViews: string;
  DoneCopyingViews: string;
  CopyAnotherView: string;
  CloseDialog: string;
}

declare module 'CopyViewsSharedStrings' {
  const strings: ICopyViewsSharedStrings;
  export = strings;
}
