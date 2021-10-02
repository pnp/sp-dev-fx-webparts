import { MSGraphClient } from "@microsoft/sp-http";

export interface IGraphAppSecretExpirationProps {
  description: string;
  graphClient: MSGraphClient;
}
