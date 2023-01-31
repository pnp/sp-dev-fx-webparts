import { ServiceScope } from "@microsoft/sp-core-library";

export interface IOfferCreationSpFxProps {
  siteUrl: string;
  serviceScope: ServiceScope;
  isDarkTheme: boolean;
  teamSiteDomain: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
