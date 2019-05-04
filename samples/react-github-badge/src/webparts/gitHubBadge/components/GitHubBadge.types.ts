import { IGitHubUserProfile } from "../../../services/GitHubServices";
import { HttpClient } from '@microsoft/sp-http';

export interface IGitHubBadgeProps {
  gitHubUserName: string;
  httpClient: HttpClient;
}

export interface IGitHubBadgeState {
  isLoading: boolean;
  userProfile?: IGitHubUserProfile;
  errorMessage?: string;
}
