declare interface IRecaptchaWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  SiteKeyFieldLabel: string;
  SubmitButtonLabel:string;
}

declare module 'RecaptchaWebPartStrings' {
  const strings: IRecaptchaWebPartStrings;
  export = strings;
}
