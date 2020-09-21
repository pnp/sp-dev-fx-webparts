import { MSGraphClient } from '@microsoft/sp-http';
import { IMailItem } from "./IMailItem";

export interface ICreateTaskContext {
  item: IMailItem;
  graphHttpClient: MSGraphClient;
  siteUrl: string;
}
