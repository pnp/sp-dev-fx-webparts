import { MSGraphClient } from '@microsoft/sp-http';
import { Guid } from '@microsoft/sp-core-library';

export interface IPeopleWithPresenceProps {
  graphHttpClient: MSGraphClient;
  siteUrl: string;
  groupId: Guid;
}
