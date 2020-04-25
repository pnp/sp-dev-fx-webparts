declare interface IPersonalAppSettingsWebPartStrings {
  PropertiesListNotCreatedError: string;
  PropertiesNotSavedError: string;
  SiteManagePermissionsNotProvisioned: string;
  WebPartSettings: string;
  WebPartTitle: string;
  WebPartDescription: string;
  Edit: string;
  Save: string;
  Cancel: string;
  Loading: string;
}

declare module 'PersonalAppSettingsWebPartStrings' {
  const strings: IPersonalAppSettingsWebPartStrings;
  export = strings;
}
