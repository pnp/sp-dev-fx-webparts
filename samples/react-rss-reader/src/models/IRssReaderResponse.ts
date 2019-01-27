export interface IRssReaderResponse {
  query: IRssQuery;
}

export interface IRssQuery {
  count: number;
  created: string;
  lang: string;
  meta: IRssQueryMetaData;
  results?: IRssQueryResults;
}

export interface IRssQueryResults {
  rss?: IRssResult[];
}

export interface IRssResult {
  channel: IRssChannel;
}

export interface IRssChannel {
  item: IRssItem;
}

export interface IRssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: IRssGuid;
  creator: string;
  date: string;
}

export interface IRssGuid {
  isPermaLink: string;
  content: string;
}

export interface IRssQueryMetaData {
  url: IRssUrl;
}

export interface IRssUrl {
  id: string;
  status: string;
  headers: IRssHeaders;
}

export interface IRssHeaders {
  header: IRssHeader[];
}

export interface IRssHeader {
  name: string;
  value: string;
}
