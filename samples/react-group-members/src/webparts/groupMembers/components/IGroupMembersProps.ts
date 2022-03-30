import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls";

export interface IGroupMembersProps {
  groups: IPropertyFieldGroupOrPerson[];
  ignorePeople: IPropertyFieldGroupOrPerson[];
  context: WebPartContext;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
}
