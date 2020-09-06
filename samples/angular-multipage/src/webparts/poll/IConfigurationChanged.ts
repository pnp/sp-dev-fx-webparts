import { DisplayMode } from '@microsoft/sp-client-base';

export interface IConfigurationChanged {
  listName: string;
  sharePointApiUrl: string;
  title: string;
  description: string;
  displayMode: DisplayMode;
}