import { IGitHubService, IGitHubContributor, IAuthorCommit } from "./IGitHubService.types";
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export  class GitHubService implements IGitHubService {
  /**
   * Gets a list of github commits in a repo for a single contributor
   * @param client the HttpClient object that will make the call
   * @param repoOwner the repo owner (i.e.: the first slash after github.com. E.g.: https://github.com/SharePoint/sp-dev-docs = sharepoint)
   * @param repo the repo name (i.e.: the second slash after github.com. E.g.: https://github.com/SharePoint/sp-dev-docs- = sp-dev-docs)
   * @param alias the GitHub contributor alias. e.g.: hugoabernier
   *
   * NOTE: GitHub only allows a certain number of API calls without authentication. If you plan on using this
   * more extensively, you may want to add authentication, by adding an Http headers:
   *  "cache-control": "no-cache") -- no necessary, but useful
   *  "Authorization" "token f11111f1100bb1ec1111ad11c1111ed1d1a1111a");
   */
  public getCommits(client: HttpClient, repoOwner: string, repo: string, alias: string): Promise<IAuthorCommit[]> {
    const requestUrl: string = `https://api.github.com/repos/${repoOwner}/${repo}/commits?author=${alias}`;
    // call the GitHub API
    return client.fetch(requestUrl,
      HttpClient.configurations.v1, {}).then((response: HttpClientResponse) => response.json())
      .then((commits: IAuthorCommit[]): IAuthorCommit[] => {
        return commits;
      });
  }

  /**
   * Gets a list of contributors in a repo
   * @param client the HttpClient
   * @param repoOwner the repo owner (i.e.: the first slash after github.com. E.g.: https://github.com/SharePoint/sp-dev-docs = sharepoint)
   * @param repo the repo name (i.e.: the second slash after github.com. E.g.: https://github.com/SharePoint/sp-dev-docs- = sp-dev-docs)
   *
   * See above notes regarding daily limits on GitHub API
   */
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
