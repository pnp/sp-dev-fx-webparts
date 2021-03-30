import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface INewsProps {
  title: string;
  newsUrl: string;
  apiKey: string;
  context: WebPartContext;
  updateProperty: (value: string) => void;
  displayMode: DisplayMode;
  viewOption:string;
  pageSize: number;
  themeVariant: IReadonlyTheme | undefined;

}
