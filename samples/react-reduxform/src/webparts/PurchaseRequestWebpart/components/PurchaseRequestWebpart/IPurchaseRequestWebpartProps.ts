import { SPHttpClient } from '@microsoft/sp-http';

export interface IPurchaseRequestWebpartProps {
  description: string;
  siteUrl:string;
  spHttpClient:SPHttpClient;
  itemId:string;
}
