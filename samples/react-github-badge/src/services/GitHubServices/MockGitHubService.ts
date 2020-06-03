import { IGitHubService, IGitHubUserProfile } from "./GitHubServices.types";

export class MockGitHubService implements IGitHubService {
  public getUserProfile(alias: string): Promise<IGitHubUserProfile> {

    return new Promise<IGitHubUserProfile>((resolve) => {
      // pretend we're getting the data from the GitHub API by adding a delay
      setTimeout(() => {
        const fakeProfile: IGitHubUserProfile = {
          login: "skaggej",
          id: 1846656,
          node_id: "MDQ6VXNlcjE4NDY2NTY=",
          avatar_url: "https://avatars1.githubusercontent.com/u/1846656?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/skaggej",
          html_url: "https://github.com/skaggej",
          followers_url: "https://api.github.com/users/skaggej/followers",
          following_url: "https://api.github.com/users/skaggej/following{/other_user}",
          gists_url: "https://api.github.com/users/skaggej/gists{/gist_id}",
          starred_url: "https://api.github.com/users/skaggej/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/skaggej/subscriptions",
          organizations_url: "https://api.github.com/users/skaggej/orgs",
          repos_url: "https://api.github.com/users/skaggej/repos",
          events_url: "https://api.github.com/users/skaggej/events{/privacy}",
          received_events_url: "https://api.github.com/users/skaggej/received_events",
          type: "User",
          site_admin: false,
          name: "Eric Skaggs",
          company: "http://www.catapultsystems.com",
          blog: "http://www.ericskaggs.net",
          location: "Phoenix, AZ",
          email: null,
          hireable: null,
          bio: "Fuse Solution Architect at Catapult Systems",
          public_repos: 29,
          public_gists: 3,
          followers: 8,
          following: 33,
          created_at: "2012-06-13T14:01:52Z",
          updated_at: "2019-04-09T00:18:35Z"
        };
        resolve(fakeProfile);
      }, 500);
    });
  }
}

