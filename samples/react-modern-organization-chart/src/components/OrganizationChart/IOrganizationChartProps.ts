import { IUser } from "../../Entities/IUser";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
export interface IOrganizationChartProps {
  title: string;
  currentUser:  IUser ;
  context: WebPartContext;
  themeVariant: IReadonlyTheme | undefined;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  refreshInterval: number;
}
