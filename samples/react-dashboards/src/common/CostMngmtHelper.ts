/* eslint-disable @typescript-eslint/no-explicit-any */
import { AadHttpClient, AadHttpClientFactory, IHttpClientOptions } from "@microsoft/sp-http";
import moment from "moment";
import ApiHelper, { ICostMngmtResponseJson, IResponseJson } from "./ApiHelper";
import ApiQueryHelper from "./ApiQueryHelper";
import { CacheExpiration, ICacheConfig, ICostManagementConfig, ICostManagementQuery } from "./CommonProps";
import CostMngmtQueryHelper from "./CostMngmtQueryHelper";

export default class CostMngmtHelper {

    private _postUrl: string = '';
    private requestHeaders: Headers = new Headers();
    private httpClientOptions: IHttpClientOptions = {};
    private aadHttpClientFactory: AadHttpClientFactory = null;
    private spfxSpoApiConnectClient: AadHttpClient = null;
    private cacheDuration: CacheExpiration;
    private cacheKey: string;

    constructor(config: ICostManagementConfig, cache: ICacheConfig, aadHttpClientFactory: AadHttpClientFactory) {
        this.aadHttpClientFactory = aadHttpClientFactory;
        this._postUrl = CostMngmtQueryHelper.GetAPIEndpoint(
            config.scope, {
            subscriptionId: config.subscriptionId,
            resourceGroupName: config.resourceGroupName,
            managementGroupId: config.managementGroupId
        }
        );
        this.requestHeaders.append("Content-type", "application/json; charset=utf-8");
        this.requestHeaders.append("clienttype", "pnp.apps.costmanagement");
        this.httpClientOptions = { headers: this.requestHeaders };
        this.cacheDuration = cache.cacheDuration;
        this.cacheKey = `${config.subscriptionId ?? ''}-${config.resourceGroupName ?? ''}-${config.managementGroupId ?? ''}-${cache.userLoginName}`
    }

    public GetAPIResponse = async (config: ICostManagementQuery): Promise<IResponseJson> => {
        const body = JSON.stringify(JSON.parse(config.query), null, 0);

        const requestHash = ApiQueryHelper.GetHash(`${this.cacheKey}-${body}`);
        const lastResponse = ApiQueryHelper.GetCachedResponse(requestHash);

        if (lastResponse) {
            return lastResponse;
        }
        else {
            await this.init();
            const response = await this.getParsedResponse(body);

            if (response && !response.error) {
                ApiQueryHelper.SaveCachedResponse(
                    requestHash,
                    response,
                    this.cacheDuration);

            }
            return response;
        }
    }
    public GetGroupBy = (query: string): string[] => {
        return CostMngmtQueryHelper.GetGroupBy(query);
    }


    private init = async (): Promise<void> => {
        return await this.aadHttpClientFactory
            .getClient(CostMngmtQueryHelper.ClientId)
            .then((client: AadHttpClient): void => {
                this.spfxSpoApiConnectClient = client;
            })
            .catch(err => {
                console.error(err)
            });
    }
    private getParsedResponse = async<T>(requestBody: string, colRenames?: Map<string, string>): Promise<IResponseJson> => {


        this.httpClientOptions.body = requestBody;
        const resp = await this.spfxSpoApiConnectClient.post(
            CostMngmtQueryHelper.GetAPIEndpointFull(this._postUrl),
            AadHttpClient.configurations.v1,
            this.httpClientOptions);
        const responseJson: ICostMngmtResponseJson = await resp.json();

        const response = ApiHelper.GetParsedResponse<T>(
            {
                body: responseJson.properties,
                error: responseJson.error
            },
            colRenames);

        this.printoQuotaInfo(resp.headers)

        this.setDateColumnFormat(response, 'BillingMonth', 'YYYY-MM-DDThh:mm:ss', 'YYYY-MM-DDThh:mm:ssZ');
        this.setDateColumnFormat(response, 'UsageDate', 'YYYYMMDD', 'L');

        //reorder columns in response.tables, move  Cost & Currency to the end
        if (response.tables.length > 0 && response.columns.has('Cost') && response.columns.has('Currency')) {
            this.getReorderedColumns(response);
        }

        return response;
    }
    private setDateColumnFormat = (response: IResponseJson, dateColName: string, initialFormat: string, targetFormat: string): void => {
        if (response.columns.has(dateColName)) {
            response.columns.forEach((value: string, key: string) => {
                if (key === dateColName) {
                    response.columns.set(key, 'datetime')
                }
            })
            response.tables.forEach((row: any) => {
                if (row[dateColName]) {
                    row[dateColName] = moment(row[dateColName], initialFormat).format(targetFormat)
                }
            });
        }
    }
    private getReorderedColumns = (response: IResponseJson): void => {
        //move Cost & Currency in response.columns to the end
        const costCol = response.columns.get('Cost');
        const currencyCol = response.columns.get('Currency');
        response.columns.delete('Cost');
        response.columns.delete('Currency');
        response.columns.set('Cost', costCol);
        response.columns.set('Currency', currencyCol);

        //move Cost & Currency to the end
        response.tables = response.tables.reduce((prev, curr) => {
            const { Cost, Currency, ...rest } = curr;
            const newRow = { ...rest, Cost, Currency };
            prev.push(newRow);
            return prev;
        }, []);
    }
    private printoQuotaInfo(headers: Headers): void {
        console.info(`x-ms-ratelimit-microsoft.costmanagement-qpu-consumed (QPUs consumed by an API call): ${headers.get('x-ms-ratelimit-microsoft.costmanagement-qpu-consumed')}`)
        console.info(`x-ms-ratelimit-microsoft.costmanagement-qpu-remaining (list of remaining quotas): ${headers.get('x-ms-ratelimit-microsoft.costmanagement-qpu-remaining')}`)

        console.info(`x-ms-ratelimit-remaining-microsoft.costmanagement-clienttype-requests: ${headers.get('x-ms-ratelimit-remaining-microsoft.costmanagement-clienttype-requests')} `)
        console.info(`x-ms-ratelimit-remaining-microsoft.costmanagement-entity-requests: ${headers.get('x-ms-ratelimit-remaining-microsoft.costmanagement-entity-requests')}`)
        console.info(`x-ms-ratelimit-remaining-microsoft.costmanagement-tenant-requests: ${headers.get('x-ms-ratelimit-remaining-microsoft.costmanagement-tenant-requests')}`)
        console.info(`x-ms-ratelimit-remaining-subscription-resource-requests: ${headers.get('x-ms-ratelimit-remaining-subscription-resource-requests')}`)
    }

}


