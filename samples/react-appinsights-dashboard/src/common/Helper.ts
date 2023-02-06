/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { TimeInterval, TimeSpan, Segments } from './enumHelper';
import { IPageViewCountProps, IPageViewDetailProps, defaultDateFormat, chartDateFormat, Dictionary } from './CommonProps';
import moment from 'moment';

export default class Helper {
    private _appid: string = '';
    private _appkey: string = '';
    private _postUrl: string = `https://api.applicationinsights.io/v1/apps`;
    private requestHeaders: Headers = new Headers();
    private httpClientOptions: IHttpClientOptions = {};
    private httpClient: HttpClient = null;
    private cultureName:string=null;

    constructor(appid: string, appkey: string, httpclient: HttpClient, cultureName:string) {
        this._appid = appid;
        this._appkey = appkey;
        this.httpClient = httpclient;
        this._postUrl = this._postUrl + `/${this._appid}`;
        this.requestHeaders.append('Content-type', 'application/json; charset=utf-8');
        this.requestHeaders.append('x-api-key', this._appkey);
        this.httpClientOptions = { headers: this.requestHeaders };
        this.cultureName= cultureName;
    }

    public getPageViewCount = async (timespan: TimeSpan, timeinterval: TimeInterval): Promise<IPageViewCountProps[]> => {
        const finalRes: IPageViewCountProps[] = [];
        const finalPostUrl: string = this._postUrl + `/metrics/pageViews/count?timespan=${timespan}&interval=${timeinterval}`;
        const response: HttpClientResponse = await this.httpClient.get(finalPostUrl, HttpClient.configurations.v1, this.httpClientOptions);
        const responseJson: any = await response.json();
        if (responseJson.value && responseJson.value.segments.length > 0) {
            const segments: any[] = responseJson.value.segments;
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
        const finalRes: IPageViewDetailProps[] = [];
        const finalPostUrl: string = this._postUrl + `/metrics/pageViews/count?timespan=${timespan}&interval=${timeinterval}&segment=${encodeURIComponent(segment.join(','))}`;
        const response: HttpClientResponse = await this.httpClient.get(finalPostUrl, HttpClient.configurations.v1, this.httpClientOptions);
        const responseJson: any = await response.json();
        if (responseJson.value && responseJson.value.segments.length > 0) {
            const mainSegments: any[] = responseJson.value.segments;
            mainSegments.map(mainseg => {
                if (mainseg.segments.length > 0) {
                    mainseg.segments.map((seg: any) => {
                        finalRes.push({
                            oriStartDate: mainseg.start,
                            oriEndDate: mainseg.end,
                            start: this.getFormattedDate(mainseg.start, 'L'),
                            end: this.getFormattedDate(mainseg.end, 'L'),
                            date: `${this.getFormattedDate(mainseg.start, 'L')} - ${this.getFormattedDate(mainseg.end, 'L')}`,
                            Url: seg[segment[0]],
                            count: seg['pageViews/count'].sum
                        });
                    });
                }
            });
        }
        return finalRes;
    }

    public getResponseByQuery = async <T>(query: string, useTimespan: boolean, timespan?: TimeSpan): Promise<T[]> => {
        let finalRes: T[] = [];
        const urlQuery: string = useTimespan ? `timespan=${timespan}&query=${encodeURIComponent(query)}` : `query=${encodeURIComponent(query)}`;
        const finalPostUrl: string = this._postUrl + `/query?${urlQuery}`;
        const responseJson: any = await this.getAPIResponse(finalPostUrl);
        if (responseJson.tables.length > 0) {
            finalRes = responseJson.tables[0].rows;
        }
        return finalRes;
    }

    public getUserPageViews = async (timespan: TimeSpan | string, timeinterval: TimeInterval, segment: Segments[]): Promise<IPageViewDetailProps[]> => {
        const finalRes: any[] = [];
        const finalPostUrl: string = this._postUrl + `/metrics/pageViews/count?timespan=${encodeURIComponent(timespan)}&interval=${timeinterval}&segment=${encodeURIComponent(segment.join(','))}`;
        const response: HttpClientResponse = await this.httpClient.get(finalPostUrl, HttpClient.configurations.v1, this.httpClientOptions);
        const responseJson: any = await response.json();
        if (responseJson.value && responseJson.value.segments.length > 0) {
            const mainSegments: any[] = responseJson.value.segments;
            mainSegments.map(mainseg => {
                if (mainseg.segments.length > 0) {
                    const childSegments: any[] = mainseg.segments;
                    childSegments.map(childseg => {
                        const grandChildSegments: any[] = childseg.segments;
                        grandChildSegments.map(grandchildseg => {
                            if (grandchildseg['pageView/urlPath'] !== '') {
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
        const response: HttpClientResponse = await this.httpClient.get(urlWithQuery, HttpClient.configurations.v1, this.httpClientOptions);
        return await response.json();
    }

    public getTimeSpanMenu = (): Dictionary<string>[] => {
        const items: Dictionary<string>[] = [];  
        Object.keys(TimeSpan).map(key => {
            items.push({
                text: key,
                key: key
            });
        });
        return items;
    }

    public getTimeIntervalMenu = (): Dictionary<string>[] => {
        const items: Dictionary<string>[] = [];
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

    public getFormattedDate = (datetime: string, format: string=defaultDateFormat): string => {
        return moment(datetime).locale(this.cultureName).format(format ? format : defaultDateFormat);
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

    public getRandomColor = () : string => {
        return "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + ")";
    }
}