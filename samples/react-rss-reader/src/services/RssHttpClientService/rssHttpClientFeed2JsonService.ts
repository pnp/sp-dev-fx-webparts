import * as strings from                                   'RssReaderWebPartStrings';

import {
  IRssHttpClientComponentService,
  RssHttpClientService } from                              './';

import {
  IRssReaderRequest,
  IRssReaderResponse,
  IRssQueryResults,
  IRssResult,
  IRssChannel,
  IRssItem,
  IRssGuid,
  IRssQueryMetaData,
  IRssUrl,
  IRssHeaders,
  IRssHeader
} from                                                     '../../models';

export class RssHttpClientFeed2JsonService implements IRssHttpClientComponentService {
  public async get(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse> {

    var p = new Promise<IRssReaderResponse>(async (resolve, reject) => {

      let rawFeedOutput: any = null;
      let response: IRssReaderResponse = null;

      try {

        //Create the url to the feed2json service url per documentation at: https://feed2json.org/
        let rssUrl: string = (feedRequest.feedServiceUrl ? feedRequest.feedServiceUrl : "https://feed2json.org/convert") + "?url=" + feedRequest.url;

        rawFeedOutput = await RssHttpClientService.getRssJson(rssUrl, feedRequest.useCorsProxy ? feedRequest.corsProxyUrl : "", feedRequest.disableCorsMode);

      }
      catch (err) {
        console.log("RssHttpClientFeed2JsonService.get: error retrieving feed");
        console.log(err);

        reject(err + " - " + strings.ErrorPossibleCORSBlock);
        return;
      }

      //at this point, we need to now process the raw resutls and turn them into a valid response
      if (rawFeedOutput) {

        try {

          response = this.convertRssFeedToRssReaderResponse(rawFeedOutput, feedRequest.maxCount);

          resolve(response);

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
      lang: "",
      meta: {
        url: {
          id: input.home_page_url,
          status: input.name,
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
        newItem.channel.item.link = item.url;
        newItem.channel.item.description = item.content_html;
        newItem.channel.item.pubDate = item.date_published;
        newItem.channel.item.creator = (item.author && item.author.name) ? item.author.name : "";
        newItem.channel.item.date = item.date_published;
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
