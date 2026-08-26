import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from '@microsoft/sp-core-library';
import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';
export interface IInvoiceGeneratorProps {
  logoImage: string,
  listId: string;
  context: WebPartContext;
  taxRate: number;
  companyName: string;
  companyAddress: string;
  themeVariant: IReadonlyTheme | undefined;
  displayMode: DisplayMode;
}
