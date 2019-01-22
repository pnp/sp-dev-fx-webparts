import { HttpClient } from "@microsoft/sp-http";

export interface IDynamicDataCallableProps {
  repoOwner: string;
  repo: string;
  /**
 * Instance of the HttpClient. Used to communicate with the GitHub API
 */
  httpClient: HttpClient;
  onSelectionChange: (alias: string) => void;

  /**
 * Event handler for clicking the Configure button on the Placeholder
 */
  onConfigure: () => void;
}
