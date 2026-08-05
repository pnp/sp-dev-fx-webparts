import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IHotDeskBookingProps {
  title: string;
  resourcesListName: string;
  bookingsListName: string;
  isAdminMode: boolean;
  defaultResourceType: string;
  context: WebPartContext;
}
