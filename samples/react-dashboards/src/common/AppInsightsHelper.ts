import { AadHttpClient, AadHttpClientFactory, HttpClient, HttpClientResponse, IHttpClientOptions } from "@microsoft/sp-http";
import ApiHelper, { IAppInsightsResponseJson, IResponseJson } from "./ApiHelper";
import ApiQueryHelper from "./ApiQueryHelper";
import { AppInsightsQueryHelper } from "./AppInsightsQueryHelper";
import { AppInsightsEndpointType, AppInsights_AuthSSO, CacheExpiration, IAppInsightsConfig, IAppInsightsQuery, ICacheConfig } from "./CommonProps";

export class AppInsightsHelperSSO {

    private _postUrl: string = '';
    private requestHeaders: Headers = new Headers();
    private httpClientOptions: IHttpClientOptions = {};
    private aadHttpClientFactory: AadHttpClientFactory = null;
    private spfxSpoApiConnectClient: AadHttpClient = null;
    private endpointType: AppInsightsEndpointType;
    private cacheDuration: CacheExpiration;
    private cacheKey: string;

    constructor(config: AppInsights_AuthSSO, cache: ICacheConfig,) {
        this.aadHttpClientFactory = config.aadHttpClientFactory;
        this._postUrl = AppInsightsQueryHelper.GetAPIEndpoint(config.appId, config.endpoint);
        this.requestHeaders.append("Content-type", "application/json; charset=utf-8");
        this.requestHeaders.append("clienttype", "pnp.apps.appinsights");
        this.httpClientOptions = { headers: this.requestHeaders };
        this.endpointType = config.endpoint;
        this.cacheDuration = cache.cacheDuration;
        this.cacheKey = `${config.appId}-${cache.userLoginName}`
    }

    public GetAPIResponse = async (config: IAppInsightsQuery): Promise<IResponseJson> => {
        const urlQuery = (AppInsightsEndpointType[this.endpointType as keyof typeof AppInsightsEndpointType] === AppInsightsEndpointType.query)
            ? `query=${AppInsightsQueryHelper.GetUrlQuery(config.query, config.dateSelection)}`
            : AppInsightsQueryHelper.GetUrlQuery(config.query, config.dateSelection)

        const requestHash = ApiQueryHelper.GetHash(`${this.cacheKey}-${urlQuery}`);//TODO: this.cacheKey
        const cacheEnabled = CacheExpiration[this.cacheDuration.toString() as keyof typeof CacheExpiration] !== CacheExpiration.Disabled;

        if (cacheEnabled) {
            const lastResponse = ApiQueryHelper.GetCachedResponse(requestHash);

            if (lastResponse) {
                console.info("AppInsightsHelper: Using cached response")
                return lastResponse;
            }
        }
        //if cache disabled or no cached response, get live response
        try {
            console.info("AppInsightsHelper: Using live response")
            await this.init();

            const response = await this.getParsedResponse(urlQuery);

            if (response && !response.error && cacheEnabled) {
                console.info("AppInsightsHelper: Saving response to cache")
                ApiQueryHelper.SaveCachedResponse(
                    requestHash,
                    response,
                    this.cacheDuration);//expiration at end of day
            }

            return response;
        } catch (error) {
            console.error(error);
        }
    }
    public GetGroupBy = (query: string): string[] => {
        return [];
    }
    private init = async (): Promise<void> => {
        return await this.aadHttpClientFactory
            .getClient(AppInsightsQueryHelper.ClientId)
            .then((client: AadHttpClient): void => {
                this.spfxSpoApiConnectClient = client;
            })
            .catch(err => {
                console.error(err)
            });
    }
    private getParsedResponse = async<T>(urlQuery: string, colRenames?: Map<string, string>): Promise<IResponseJson> => {
        const response = await this.spfxSpoApiConnectClient.get(`${this._postUrl}${urlQuery}`, AadHttpClient.configurations.v1, this.httpClientOptions);
        const responseJson: IAppInsightsResponseJson = await response.json();

        return ApiHelper.GetParsedResponse<T>(
            {
                body: responseJson.tables
                    ? responseJson.tables[0]
                    : { columns: [], rows: [] },
                error: responseJson.error
            },
            colRenames);
    }
}

export default class AppInsightsHelper {

    private _postUrl: string = "";

    private requestHeaders: Headers = new Headers();
    private httpClientOptions: IHttpClientOptions = {};
    private httpClient: HttpClient = null;
    private endpointType: AppInsightsEndpointType;
    private cacheDuration: CacheExpiration;
    private cacheKey: string;

    constructor(config: IAppInsightsConfig, cache: ICacheConfig, httpclient: HttpClient) {
        this.httpClient = httpclient;
        this._postUrl = AppInsightsQueryHelper.GetAPIEndpoint(config.appId, config.endpoint);
        this.requestHeaders.append("Content-type", "application/json; charset=utf-8");
        this.requestHeaders.append("x-api-key", config.appKey);
        this.requestHeaders.append("clienttype", "pnp.apps.appinsights");
        this.httpClientOptions = { headers: this.requestHeaders };
        this.endpointType = config.endpoint;
        this.cacheDuration = cache.cacheDuration;
        this.cacheKey = `${config.appId}-${config.appKey}`
    }

    public GetAPIResponse = async (config: IAppInsightsQuery): Promise<IResponseJson> => {
        const urlQuery = (AppInsightsEndpointType[this.endpointType as keyof typeof AppInsightsEndpointType] === AppInsightsEndpointType.query)
            ? `query=${AppInsightsQueryHelper.GetUrlQuery(config.query, config.dateSelection)}`
            : AppInsightsQueryHelper.GetUrlQuery(config.query, config.dateSelection)
        const requestHash = ApiQueryHelper.GetHash(`${this.cacheKey}-${urlQuery}`);
        const cacheEnabled = CacheExpiration[this.cacheDuration.toString() as keyof typeof CacheExpiration] !== CacheExpiration.Disabled;

        if (cacheEnabled) {
            const lastResponse = ApiQueryHelper.GetCachedResponse(requestHash);

            if (lastResponse) {
                console.info("AppInsightsHelper: Using cached response")
                return lastResponse;
            }
        }
        //if cache disabled or no cached response, get live response
        try {
            console.info("AppInsightsHelper: Using live response")
            const response = await this.getParsedResponse(`${this._postUrl}${urlQuery}`);

            if (response && !response.error && cacheEnabled) {
                console.info("AppInsightsHelper: Saving response to cache")
                ApiQueryHelper.SaveCachedResponse(
                    requestHash,
                    response,
                    this.cacheDuration)
            }

            return response;
        } catch (error) {
            console.error(error);
        }
    }
    public GetGroupBy = (query: string): string[] => {
        return [];
    }

    private getParsedResponse = async<T>(urlQuery: string, colRenames?: Map<string, string>): Promise<IResponseJson> => {
        const response: HttpClientResponse = await this.httpClient.get(urlQuery, HttpClient.configurations.v1, this.httpClientOptions);

        //  eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responseJson: IAppInsightsResponseJson = await response.json();
        return ApiHelper.GetParsedResponse<T>(
            {
                body: responseJson.tables
                    ? responseJson.tables[0]
                    : { columns: [], rows: [] },
                error: responseJson.error
            },
            colRenames);
    };
}

