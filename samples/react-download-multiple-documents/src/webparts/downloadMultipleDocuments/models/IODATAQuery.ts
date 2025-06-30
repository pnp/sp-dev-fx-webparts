export interface IODataQuery {
    id?: string;
    endpoint: string;
    select?: string;
    expand?: string;
    filter?: string;
    orderby?: string;
    top?: number;
    count?: boolean;
    customQueryString?: string;
    isSiteRelative?: boolean;
}