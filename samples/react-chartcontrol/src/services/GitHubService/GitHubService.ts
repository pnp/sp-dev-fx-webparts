import { IGitHubService, IGitHubContributor, IAuthorCommit } from "./IGitHubService.types";
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export default class GitHubService implements IGitHubService {
  public getCommits(client: HttpClient, repoOwner: string, repo: string, alias: string): Promise<IAuthorCommit[]> {
    const requestUrl: string = `https://api.github.com/repos/${repoOwner}/${repo}/commits?author=${alias}`;
    // call the GitHub API
    return client.fetch(requestUrl,
      HttpClient.configurations.v1, {}).then((response: HttpClientResponse) => response.json())
      .then((commits: IAuthorCommit[]): IAuthorCommit[] => {
        return commits;
      });
  }

  public getContributors(client: HttpClient, repoOwner: string, repo: string): Promise<IGitHubContributor[]> {
    // note that for simplicity, we don't escape strings or verify that they are valid.
    const requestUrl: string = `https://api.github.com/repos/${repoOwner}/${repo}/contributors`;

    // call the GitHub API
    return client.fetch(requestUrl,
      HttpClient.configurations.v1, {}).then((response: HttpClientResponse) => response.json())
      .then((contributors: IGitHubContributor[]): IGitHubContributor[] => {
        return contributors;
      });
  }
}
