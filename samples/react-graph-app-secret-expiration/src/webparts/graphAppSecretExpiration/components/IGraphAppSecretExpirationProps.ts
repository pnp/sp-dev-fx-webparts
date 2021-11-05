import { MSGraphClient } from "@microsoft/sp-http";

export interface IGraphAppSecretExpirationProps {
  graphClient: MSGraphClient;
  groupByColumn: string;
  expiringSoon: boolean;
  displaySampleData: boolean;
}
