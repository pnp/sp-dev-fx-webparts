import { IGitHubUserProfile } from "../../../services/GitHubServices";
import { HttpClient } from '@microsoft/sp-http';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IGitHubBadgeV2Props {
  gitHubUserName: string;
  httpClient: HttpClient;
  displayMode: DisplayMode;
  onConfigure: () => void;
}

export interface IGitHubBadgeV2State {
  isLoading: boolean;
  userProfile?: IGitHubUserProfile;
  errorMessage?: string;
}
