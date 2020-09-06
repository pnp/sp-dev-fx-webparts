import { SPHttpClient } from '@microsoft/sp-http';

export interface IReactCrudProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}