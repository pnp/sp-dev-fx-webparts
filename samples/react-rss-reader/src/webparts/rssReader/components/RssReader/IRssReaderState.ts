import { IRssReaderResponse } from     '../../../../models';

export interface IRssReaderState {
  rssFeedReady: boolean;
  rssFeed: IRssReaderResponse;
  rssFeedError: string;
}
