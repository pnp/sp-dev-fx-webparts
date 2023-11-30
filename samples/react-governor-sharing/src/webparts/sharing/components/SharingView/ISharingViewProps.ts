/* eslint-disable @typescript-eslint/no-explicit-any */
import IDataProvider from "./DataProvider";

export interface ISharingViewProps {
  pageLimit: number;
  context: any;
  isTeams: boolean;
  dataProvider: IDataProvider;
}