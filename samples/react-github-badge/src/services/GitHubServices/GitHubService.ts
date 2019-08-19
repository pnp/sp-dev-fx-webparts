import { IGitHubService, IGitHubUserProfile } from "./GitHubServices.types";
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';


export class GitHubService implements IGitHubService {
  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getUserProfile(alias: string): Promise<IGitHubUserProfile> {
    const gitHubUrl: string = "https://api.github.com/users/"+alias;

    // call the GitHub API
    return this._httpClient.get(gitHubUrl,
      HttpClient.configurations.v1, {}).then((response: HttpClientResponse) => response.json())
      .then((profile: IGitHubUserProfile) => {
        return profile;
      });
  }
}

