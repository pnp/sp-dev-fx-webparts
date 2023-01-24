import { ServiceScope } from "@microsoft/sp-core-library";

export interface ICreateOfferSettingsProps {
  serviceScope: ServiceScope;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
}
