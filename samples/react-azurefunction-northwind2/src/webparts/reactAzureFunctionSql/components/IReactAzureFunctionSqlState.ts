
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IReactAzureFunctionSqlState {
  customers: any;

  context: WebPartContext;
  loading?: boolean;
  showPlaceholder?: boolean;
}