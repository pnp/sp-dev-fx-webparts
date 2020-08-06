import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
export interface IMySitesProps {
  title: string;
  context: WebPartContext;
  themeVariant: IReadonlyTheme | undefined;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  itemsPerPage:number;
}

