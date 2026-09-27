export interface IPageClient { get(url: string): Promise<any>; }
export function fetchPaged(client: IPageClient, endpoint: string, pageSize: number, maxItems: number, pageHost: string): Promise<{ items: any[]; partial: boolean }>;
