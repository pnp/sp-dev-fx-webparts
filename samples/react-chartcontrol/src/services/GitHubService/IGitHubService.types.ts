import { HttpClient } from '@microsoft/sp-http';

/**
 * Exposes GitHub API calls
 */
export interface IGitHubService {
  getCommits(client: HttpClient, repoOwner: string, repo: string, alias: string): Promise<IAuthorCommit[]>;
  getContributors(client: HttpClient, repoOwner: string, repo: string): Promise<IGitHubContributor[]>;
}

// The majority of the interfaces in this file were auto-generated from JSON.
// I don't use everything, but I left everything here in case you'd like to
// use this code for your own purpose.
export interface IGitHubContributor {
  avatar_url: string;
  contributions: number;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface IContributor {
  alias: string;
  repoOwner: string;
  repo: string;
}

export interface Author {
  date: Date;
  email: string;
  name: string;
}

export interface Committer {
  date: Date;
  email: string;
  name: string;
}

export interface Tree {
  sha: string;
  url: string;
}

export interface Verification {
  payload?: any;
  reason: string;
  signature?: any;
  verified: boolean;
}

export interface Commit {
  author: Author;
  comment_count: number;
  committer: Committer;
  message: string;
  tree: Tree;
  url: string;
  verification: Verification;
}

export interface Author2 {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface Committer2 {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface Parent {
  html_url: string;
  sha: string;
  url: string;
}

/**
 * Describes a commit
 */
export interface IAuthorCommit {
  author: Author2;
  comments_url: string;
  commit: Commit;
  committer: Committer2;
  html_url: string;
  node_id: string;
  parents: Parent[];
  sha: string;
  url: string;
}

