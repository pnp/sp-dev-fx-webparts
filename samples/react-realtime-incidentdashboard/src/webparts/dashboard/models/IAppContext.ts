import { ListSubscriptionFactory } from "@microsoft/sp-list-subscription";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDashboardWebPartProps } from "../DashboardWebPart";

export interface IAppContext {
  webpartContext: WebPartContext;
  properties: IDashboardWebPartProps;
  listSubscriptionFactory: ListSubscriptionFactory;
}
