import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpFxRoomBookingProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;

  listId: string;
  adminEmails: string;
}
