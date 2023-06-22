declare interface INewSiteFormFormCustomizerStrings {
  Save: string;
  Cancel: string;
  Close: string;
  FormHeader: string;
  UrlAvailableWithModification: string;
  UrlAvailable: string;
  GroupAliasAvailable: string;
  GroupAliasUnavailable: string;
  SiteNameAvailable: string;  
  Verifying: string;
  GroupAliasFormatError:string;
  PleaseEnterGroupAliasError:string;
  SiteAddressFormatError:string;
  PleaseEnterSiteAddressError:string;
}

declare module 'NewSiteFormFormCustomizerStrings' {
  const strings: INewSiteFormFormCustomizerStrings;
  export = strings;
}
