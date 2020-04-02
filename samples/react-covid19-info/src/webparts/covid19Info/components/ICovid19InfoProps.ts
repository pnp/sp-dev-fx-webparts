import { DisplayMode } from "@microsoft/sp-core-library";
import { HttpClient } from "@microsoft/sp-http";

export interface ICovid19InfoProps {
  countryCode: string;
  showHistory: boolean;
  viewMoreLink: string;
  countUpTime: number;
  confirmedColor: string;
  deathColor: string;
  recoveredColor: string;
  displayMode: DisplayMode;
  httpClient: HttpClient;
  onConfigure(): void;
}
