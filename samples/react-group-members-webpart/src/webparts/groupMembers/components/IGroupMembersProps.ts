import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IGroupMembersProps {
  context: WebPartContext;
  roles: string[]; 
  itemsPerPage?: number;
  sortField?: string;
  themeColor?: string;
}
