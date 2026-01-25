export type SampleMetadataKey =
    | "SAMPLE-TYPE"
    | "CLIENT-SIDE-DEV"
    | "SPFX-VERSION";

export interface SampleMetadataEntry {
    key: string;
    value: string;
}

export interface SampleThumbnail {
    url: string;
    alt?: string;
}

export interface SampleAuthor {
    gitHubAccount?: string;
    name?: string;
    pictureUrl?: string;
    social?: string;
}

export interface PnPSample {
    name: string;
    source?: string;
    title: string;
    shortDescription?: string;
    url: string;
    downloadUrl?: string;
    updateDateTime?: string;
    metadata?: SampleMetadataEntry[];
    thumbnails?: SampleThumbnail[];
    authors?: SampleAuthor[];
    categories?: string[];
    totalReactions?: number;
    userHasReactions?: boolean;
    isNew?: boolean;
}

// GitHub API types for pull requests / issues (from api.github.com)
export interface GitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id?: string | null;
    url: string;
    html_url: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    organizations_url?: string;
    repos_url?: string;
    events_url?: string;
    received_events_url?: string;
    type?: string;
    site_admin?: boolean;
    user_view_type?: string;
}

export interface GitHubLabel {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description?: string | null;
}

export interface GitHubPullRequestRef {
    url?: string;
    html_url?: string;
    diff_url?: string;
    patch_url?: string;
    merged_at?: string | null;
}

export interface GitHubReactions {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
}

export interface GitHubPR {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: GitHubUser;
    labels: GitHubLabel[];
    state: string;
    locked: boolean;
    assignee?: GitHubUser | null;
    assignees?: GitHubUser[];
    milestone?: any | null;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string | null;
    author_association?: string;
    type?: string | null;
    active_lock_reason?: string | null;
    draft?: boolean;
    pull_request?: GitHubPullRequestRef;
    body?: string | null;
    reactions?: GitHubReactions;
    timeline_url?: string;
    performed_via_github_app?: any | null;
    state_reason?: string | null;
    score?: number;
}
