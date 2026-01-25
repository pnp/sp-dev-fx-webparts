import type { GitHubPR } from "../types/models";

export interface GitHubPRFetchOptions {
  owner: string;
  repo: string;
  state?: "open" | "closed" | "all";
  per_page?: number;
  page?: number;
  token?: string; // optional GitHub token for higher rate limits
}

export class GitHubPRService {
  private readonly apiBase = "https://api.github.com";
  private readonly opts: GitHubPRFetchOptions;

  constructor(opts: GitHubPRFetchOptions) {
    this.opts = opts;
  }

  private buildUrl(): string {
    const { owner, repo, state = "all", per_page = 100, page = 1 } = this.opts;
    const params = new URLSearchParams({ state, per_page: String(per_page), page: String(page) });
    return `${this.apiBase}/repos/${owner}/${repo}/issues?${params.toString()}`;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = { Accept: "application/vnd.github.v3+json" };
    if (this.opts.token) {
      headers["Authorization"] = `token ${this.opts.token}`;
    }
    return headers;
  }

  async fetchPRs(): Promise<GitHubPR[]> {
    const url = this.buildUrl();
    const res = await fetch(url, { headers: this.getHeaders() });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GitHub API request failed: ${res.status} ${res.statusText} - ${body}`);
    }
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) {
      throw new Error("Unexpected GitHub API response format: expected array");
    }
    // The issues endpoint returns both issues and PRs; filter for those with `pull_request` prop
    const prs: GitHubPR[] = (data as any[])
      .filter((i) => i && typeof i === "object" && i.pull_request)
      .map((i) => i as GitHubPR);
    return prs;
  }
}

export async function fetchPullRequests(opts: GitHubPRFetchOptions): Promise<GitHubPR[]> {
  const svc = new GitHubPRService(opts);
  return svc.fetchPRs();
}
