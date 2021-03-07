import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISitesSelectedManagerProps {
  description: string;
  context: WebPartContext;
  showAbout: boolean;
  aadGuid: string;
}
