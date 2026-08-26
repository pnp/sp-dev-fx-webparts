export interface IAppDetails {
  AppId: string;
  AppPrincipalId: string;
  AppSource: number;
  AppStatus: number;
  AppType: number;
  AssetId: string;
  BaseTemplate: number;
  ChildCount: number;
  ContentMarket: string;
  CustomSettingsUrl: string;
  Description: string;
  IsCorporateCatalogSite: boolean;
  LastModified: string; // e.g., "09-02-2025 15:35"
  LastModifiedDate: string; // ISO format: "2025-02-09T10:05:47Z"
  ProductId: string;
  Target: string;
  Thumbnail: string;
  Title: string;
  Version: string;
}
