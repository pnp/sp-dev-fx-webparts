import { MSGraphClientV3 } from "@microsoft/sp-http";

export interface IGraphAppSecretExpirationProps {
  graphClient: MSGraphClientV3;
  groupByColumn: string;
  expiringSoon: boolean;
  displaySampleData: boolean;
}
