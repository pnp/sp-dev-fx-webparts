import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyFieldSite } from "@pnp/spfx-property-controls";

export interface IMyToolsProps {
  wpTitle: string;
  wpSite?: IPropertyFieldSite;
  wpLists?: { personalToolsList: { id: string, title: string, url: string }, availableToolsList: { id: string, title: string, url: string } };
  isDarkTheme: boolean;
  context: WebPartContext;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userEmail: string;
  twoColumns: boolean;
}
