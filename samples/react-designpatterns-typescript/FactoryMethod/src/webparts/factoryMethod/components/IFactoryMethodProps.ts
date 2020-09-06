import { SPHttpClient } from "@microsoft/sp-http";
import IDataProvider  from "./dataproviders/IDataProvider";

export interface IFactoryMethodProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  dataProvider: IDataProvider;
  configureStartCallback: () => void;
}
