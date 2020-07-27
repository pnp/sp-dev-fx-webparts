import { WebPartContext } from "@microsoft/sp-webpart-base";
import {

  IReadonlyTheme
} from "@microsoft/sp-component-base";
import { DisplayMode } from "@microsoft/sp-core-library";
export interface IManageProfileCardPropertiesProps {
  title: string;
  webpartContext: WebPartContext;
  themeVariant: IReadonlyTheme;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
