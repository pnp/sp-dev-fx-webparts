import { SPHttpClient, AadHttpClientFactory, MSGraphClientFactory } from "@microsoft/sp-http"; 
export interface ISummariseProps {
  spHttpClient: SPHttpClient;
  aadHttpClientFactory: AadHttpClientFactory;
  msGraphClientFactory: MSGraphClientFactory;
  pageItemId: number;
  pageId: string;
  siteId: string;
  siteUrl: string;
}
