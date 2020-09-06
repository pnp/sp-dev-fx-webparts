import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IPersonalAppsProps {
  title: string;
  view:string | number;
  displayMode: DisplayMode;
  themeVariant: IReadonlyTheme | undefined;
}
