import { DynamicProperty } from '@microsoft/sp-component-base';
import { IContributor } from '../../../services/GitHubService';
import { HttpClient } from "@microsoft/sp-http";

export interface IDynamicDataConsumerProps {
  contributor: DynamicProperty<IContributor>;
  needsConfiguration: boolean;
  repo: string;
  repoOwner: string;
  alias: string;
  /**
   * Instance of the HttpClient. Used to communicate with the GitHub API
   */
  httpClient: HttpClient;

  /**
   * Event handler for clicking the Configure button on the Placeholder
   */
  onConfigure: () => void;
}
