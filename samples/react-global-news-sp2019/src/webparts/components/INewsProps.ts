import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Theme } from 'spfx-uifabric-themes';
export interface INewsProps {
  title: string;
  newsUrl: string;
  apiKey: string;
  context: WebPartContext;
  updateProperty: (value: string) => void;
  displayMode: DisplayMode;
  viewOption:string;
  pageSize: number;
  themeVariant: Theme;

}
