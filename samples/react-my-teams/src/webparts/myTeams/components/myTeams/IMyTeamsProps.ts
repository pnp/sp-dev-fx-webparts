import { MSGraphClient } from "@microsoft/sp-http";

export interface IMyTeamsProps {
  graphClient: MSGraphClient;
  tenantId: string;
  openInClientApp: boolean;
}
