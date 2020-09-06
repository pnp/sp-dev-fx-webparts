import { IRssReaderRequest, IRssReaderResponse } from       '../../models';

export interface IRssHttpClientComponentService {

    /**
     * Get a component service request based on feedRequest
     * @param feedRequest the rss reader request
     */
    get(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse>;

    /**
     * normalization method to convert raw rss response to acceptable format
     * @param feedRequest the rss reader request
     */
    convertRssFeedToRssReaderResponse(input: any, maxCount: number) : IRssReaderResponse;
}
