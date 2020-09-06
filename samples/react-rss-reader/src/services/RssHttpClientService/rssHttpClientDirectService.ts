import * as strings from                                   'RssReaderWebPartStrings';

import {
  IRssHttpClientComponentService,
  RssHttpClientService } from                              './';
import {
  IRssReaderResponse,
  IRssQueryResults,
  IRssResult,
  IRssChannel,
  IRssItem,
  IRssGuid,
  IRssQueryMetaData,
  IRssUrl,
  IRssHeaders,
  IRssHeader,
  IRssReaderRequest
 } from                                                    '../../models';
import { RssXmlParserService } from                        '../../services/RssXmlParserService';

export class RssHttpClientDirectService implements IRssHttpClientComponentService {
  public async get(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse> {

    var p = new Promise<IRssReaderResponse>(async (resolve, reject) => {

      let rawFeedOutput: any = null;
      let response: IRssReaderResponse = null;

      try {

        rawFeedOutput = await RssHttpClientService.getRssXml(feedRequest.url, feedRequest.useCorsProxy ? feedRequest.corsProxyUrl : "", feedRequest.disableCorsMode);

      }
      catch (err) {

        console.log("RssHttpClientDirectService.get: error retrieving feed");
        console.log(err);

        reject(err + " - " + strings.ErrorPossibleCORSBlock);
        return;

      }

      //at this point, we need to now process the raw resutls and turn them into a valid response
      if (rawFeedOutput) {

        RssXmlParserService.init();

        try {
          let feedOutput = await RssXmlParserService.parse(rawFeedOutput);

          if (feedOutput) {
            response = this.convertRssFeedToRssReaderResponse(feedOutput, feedRequest.maxCount);

            resolve(response);
          }
          else {
            reject(strings.ErrorParsingFeed);
          }
        }
        catch (err) {
          reject(strings.ErrorCovertFeedInvalidSource);
        }

      }

      //if here, an error occurred
      reject(strings.ErrorPossibleCORBBlock);

    });

    return p;
  }

  public convertRssFeedToRssReaderResponse(input: any, maxCount: number) : IRssReaderResponse {
    var response: IRssReaderResponse = {query: null} as IRssReaderResponse;

    if (!input) {
      return null;
    }

    response.query = {

      //set up feed header
      count: input.items ? input.items.length : 0,
      created: (new Date()).toDateString(),
      lang: input.language,
      meta: {
        url: {
          id: input.link,
          status: input.title,
          headers: {
            header: [
              {
                name: input.description
              } as IRssHeader
            ] as IRssHeader[]
          } as IRssHeaders
        } as IRssUrl,
      } as IRssQueryMetaData,
      results: null
    };

    //feed items
    if (input.items) {

      response.query.results = {
        rss: [] as IRssResult[]
      } as IRssQueryResults;

      input.items.map((item: any) => {
        let newItem: IRssResult = {} as IRssResult;

        newItem.channel = {} as IRssChannel;
        newItem.channel.item = {} as IRssItem;

        newItem.channel.item.title = item.title;
        newItem.channel.item.link = item.link;
        newItem.channel.item.description = item.content;
        newItem.channel.item.pubDate = item.pubDate;
        newItem.channel.item.creator = item.creator;
        newItem.channel.item.date = item.isoDate;
        newItem.channel.item.guid = {
          isPermaLink: "true",
          content: item.guid
        } as IRssGuid;

        response.query.results.rss.push(newItem);
      });

      //ensure that we only get maxCount records
      if (response.query.results.rss.length > maxCount) {

        response.query.results.rss = response.query.results.rss.splice(0, maxCount);

      }
    }

    return response;
  }
}
