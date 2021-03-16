declare interface ISitesSelectedManagerWebPartStrings {
  DescriptionFieldLabel: string;
  ShowAboutFieldLabel: string;
  AADGuidLabel: string;

  ErrorNoAppsFoundMessage: string;
  ErrorGettingApps: string;
  ErrorHintGettingApps: string;
  ErrorHttp: string;
  ErrorGeneric: string,
  ErrorUnknown: string,
  ErrorNoPermissionsFound: string,
  ErrorHintUrlFormat: string,

  HomeTabTitle: string;
  HomeTitleMain: string;
  HomeBulletList: string;
  HomeBulletAdd: string;
  HomeBulletClear: string;
  HomeBulletCheck: string;
  HomeTitleFYI: string;
  HomeFYI: string;
  HomeAccessTitle: string;
  HomeAccess: string;

  AddTabTitle: string;

  CheckTabTitle: string;
  CheckSiteLabel: string;
  CheckSitePlaceholder: string;
  CheckButtonText: string;
  CheckTextAreaLabel: string;

  DialogAddSuccess: string;
  DialogRemoveSuccess: string;
  DialogAddTitle: string
  DialogAddSubTitle: string
  DialogDelTitle: string
  DialogDelSubTitle: string

  ListCommandBarAdd: string;
  ListCommandBarDelete: string;
  ListColAppName: string;
  ListColAppId: string;

  PermCheckTitle: string;
  PermCheckHint: string;

  LoadingMessage: string;
  Close: string;
  WorkingOnIt: string;

  Read: string;
  Write: string;
  ReadWrite: string;
  Remove: string;
  Grant: string;
  Cancel: string;
  Info: string;
}

declare module 'SitesSelectedManagerWebPartStrings' {
  const strings: ISitesSelectedManagerWebPartStrings;
  export = strings;
}
