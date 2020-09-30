import FeedServiceOption from "./FeedServiceOption";

export interface IRssReaderRequest {
  url: string;
  feedService: FeedServiceOption;
  feedServiceApiKey?: string;
  feedServiceUrl?: string;

  useCorsProxy?: boolean;
  corsProxyUrl?: string;
  disableCorsMode?: boolean;

  maxCount: number;

  useLocalStorage: boolean;
  useLocalStorageTimeout?: number;
  useLocalStorageKeyPrefix?: string;
}
