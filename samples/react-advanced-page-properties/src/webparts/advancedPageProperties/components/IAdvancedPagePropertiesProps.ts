import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAdvancedPagePropertiesProps {
  context: WebPartContext;
  title: string;
  selectedProperties: string[];
  themeVariant: IReadonlyTheme | undefined;
}
