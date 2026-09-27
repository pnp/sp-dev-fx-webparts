export interface INavigationItem {
  id: string;
  label: string;
  url: string;
  description?: string;
}

export interface ILocaleConfiguration {
  code: string;
  displayName: string;
  items: INavigationItem[];
}

export interface IMultilingualConfiguration {
  defaultLocale: string;
  locales: ILocaleConfiguration[];
}

export interface IParseResult {
  configuration?: IMultilingualConfiguration;
  error?: string;
}
