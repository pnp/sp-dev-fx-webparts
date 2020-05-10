import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { TimeInterval, TimeSpan, Segments } from './enumHelper';
import { IPageViewCountProps, IPageViewDetailProps, defaultDateFormat, chartDateFormat } from './CommonProps';

const moment: any = require('moment');

export default class Helper {
    private _appid: string = '';
    private _appkey: string = '';
    private _postUrl: string = `https://api.applicationinsights.io/v1/apps`;
    private requestHeaders: Headers = new Headers();
    private httpClientOptions: IHttpClientOptions = {};
    private httpClient: HttpClient = null;

    constructor(appid: string, appkey: string, httpclient: HttpClient) {
        this._appid = appid;
        this._appkey = appkey;
        this.httpClient = httpclient;
        this._postUrl = this._postUrl + `/${this._appid}`;
        this.requestHeaders.append('Content-type', 'application/json; charset=utf-8');
        this.requestHeaders.append('x-api-key', this._appkey);
        this.httpClientOptions = { headers: this.requestHeaders };
    }

    public getPageViewCount = async (timespan: TimeSpan, timeinterval: TimeInterval): Promise<IPageViewCountProps[]> => {
        let finalRes: IPageViewCountProps[] = [];
        let finalPostUrl: string = this._postUrl + `/metrics/pageViews/count?timespan=${timespan}&interval=${timeinterval}`;
        let response: HttpClientResponse = await this.httpClient.get(finalPostUrl, HttpClient.configurations.v1, this.httpClientOptions);
        let responseJson: any = await response.json();
        if (responseJson.value && responseJson.value.segments.length > 0) {
            let segments: any[] = responseJson.value.segments;
            segments.map((seg: any) => {
                finalRes.push({
                    oriDate: seg.start,
                    date: this.getLocalTime(seg.start),
                    sum: seg['pageViews/count'].sum
                });
            });
        }
        return finalRes;
    }

    public getPageViews = async (timespan: TimeSpan, timeinterval: TimeInterval, segment: Segments[]): Promise<IPageViewDetailProps[]> => {
        let finalRes: IPageViewDetailProps[] = [];
        let finalPostUrl: string = this._postUrl + `/metrics/pageViews/count?timespan=${timespan}&interval=${timeinterval}&segment=${encodeURIComponent(segment.join(','))}`;
        let response: HttpClientResponse = await this.httpClient.get(finalPostUrl, HttpClient.configurations.v1, this.httpClientOptions);
        let responseJson: any = await response.json();
        if (responseJson.value && responseJson.value.segments.length > 0) {
            let mainSegments: any[] = responseJson.value.segments;
            mainSegments.map(mainseg => {
                if (mainseg.segments.length > 0) {
                    mainseg.segments.map((seg: any) => {
                        finalRes.push({
                            oriStartDate: mainseg.start,
                            oriEndDate: mainseg.end,
                            start: this.getFormattedDate(mainseg.start),
                            end: this.getFormattedDate(mainseg.end),
                            date: `${this.getFormattedDate(mainseg.start)} - ${this.getFormattedDate(mainseg.end)}`,
                            Url: seg[segment[0]],
                            count: seg['pageViews/count'].sum
                        });
                    });
                }
            });
        }
        return finalRes;
    }

    public getResponseByQuery = async (query: string, useTimespan: boolean, timespan?: TimeSpan): Promise<any[]> => {
        let finalRes: any[] = [];
        let urlQuery: string = useTimespan ? `timespan=${timespan}&query=${encodeURIComponent(query)}` : `query=${encodeURIComponent(query)}`;
        let finalPostUrl: string = this._postUrl + `/query?${urlQuery}`;
        let responseJson: any = await this.getAPIResponse(finalPostUrl);
        if (responseJson.tables.length > 0) {
            finalRes = responseJson.tables[0].rows;
        }
        return finalRes;
    }

    public getUserPageViews = async (timespan: TimeSpan | string, timeinterval: TimeInterval, segment: Segments[]): Promise<IPageViewDetailProps[]> => {
        let finalRes: any[] = [];
        let finalPostUrl: string = this._postUrl + `/metrics/pageViews/count?timespan=${encodeURIComponent(timespan)}&interval=${timeinterval}&segment=${encodeURIComponent(segment.join(','))}`;
        let response: HttpClientResponse = await this.httpClient.get(finalPostUrl, HttpClient.configurations.v1, this.httpClientOptions);
        let responseJson: any = await response.json();
        if (responseJson.value && responseJson.value.segments.length > 0) {
            let mainSegments: any[] = responseJson.value.segments;
            mainSegments.map(mainseg => {
                if (mainseg.segments.length > 0) {
                    let childSegments: any[] = mainseg.segments;
                    childSegments.map(childseg => {
                        let grandChildSegments: any[] = childseg.segments;
                        grandChildSegments.map(grandchildseg => {
                            if (grandchildseg['pageView/urlPath'] != '') {
                                finalRes.push({
                                    oriStartDate: mainseg.start,
                                    oriEndDate: mainseg.end,
                                    start: this.getFormattedDate(mainseg.start),
                                    end: this.getFormattedDate(mainseg.end),
                                    date: `${this.getFormattedDate(mainseg.start)} - ${this.getFormattedDate(mainseg.end)}`,
                                    Url: grandchildseg['pageView/urlPath'],
                                    count: grandchildseg['pageViews/count'].sum,
                                    user: childseg['customDimensions/UserTitle']
                                });
                            }
                        });
                    });
                }
            });
        }
        return finalRes;
    }

    public getAPIResponse = async (urlWithQuery: string): Promise<any> => {
        let response: HttpClientResponse = await this.httpClient.get(urlWithQuery, HttpClient.configurations.v1, this.httpClientOptions);
        return await response.json();
    }

    public getTimeSpanMenu = (): any[] => {
        let items: any[] = [];
        Object.keys(TimeSpan).map(key => {
            items.push({
                text: key,
                key: key
            });
        });
        return items;
    }

    public getTimeIntervalMenu = (): any[] => {
        let items: any[] = [];
        Object.keys(TimeInterval).map(key => {
            items.push({
                text: key,
                key: key
            });
        });
        return items;
    }

    public getLocalTime = (utcTime: string): string => {
        return moment(utcTime).local().format(chartDateFormat);
    }

    public getFormattedDate = (datetime: string, format?: string): string => {
        return moment(datetime).local().format(format ? format : defaultDateFormat);
    }

    public getQueryDateFormat = (datetime: string): string => {
        return moment(datetime).local().format('YYYY-MM-DDT08:MM:00.000') + 'Z';
    }

    public getQueryStartDateFormat = (datetime: string): string => {
        return moment(datetime).format('YYYY-MM-DDT00:00:00.000Z');
    }

    public getQueryEndDateFormat = (datetime: string): string => {
        return moment(datetime).format('YYYY-MM-DDTHH:MM:00.000Z');
    }

    public getRandomColor = () => {
        return "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + ")";
    }
}