export interface GitHubIssue {
    active_lock_reason?: any;
    assignee?: any;
    assignees: any[];
    author_association: string;
    body: string;
    closed_at?: any;
    comments: number;
    comments_url: string;
    created_at: string;
    events_url: string;
    html_url: string;
    id: number;
    labels: any[];
    labels_url: string;
    locked: boolean;
    milestone?: any;
    node_id: string;
    number: number;
    performed_via_github_app?: any;
    repository_url: string;
    state: string;
    timeline_url: string;
    title: string;
    updated_at: string;
    url: string;
    user: User;
}

export interface User {
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