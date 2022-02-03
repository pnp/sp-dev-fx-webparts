import { IHttpClient } from "./IHttpClient";

export class BatchHandler {
    public static readonly maxRetries = 5;
    constructor(protected baseClient: IHttpClient, protected registeredPromises: Map<string, { resolve, error }[]>, protected batch: { id: string; url: string; method: "GET" }[], protected retries: number = 0) { }

    public async executeBatch() {
        let betaRequests = this.batch.filter(req => req.url.indexOf("v1.0/") < 0);
        let v1Requests = this.batch.filter(req => req.url.indexOf("v1.0/") >= 0);
        let batchBody = JSON.stringify({ requests: betaRequests });
        let batchBodyV1 = JSON.stringify({
            requests: v1Requests.map(req => ({
                ...req,
                url: req.url.replace("v1.0/", "")
            }))
        });
        let responses = [];
        if (betaRequests.length > 0) {
            let betaResponse = await this.requestBatch(batchBody);
            responses.push(...betaResponse.responses);
        }
        if (v1Requests.length > 0) {
            let v1Response = await this.requestBatch(batchBodyV1, "v1.0");
            responses.push(...v1Response.responses);
        }
        this.processBatchResponse(responses);
        if (this.batch.length > 0 && this.retries > 0) {
            this.retries--;
            this.executeBatch();
        }
    }

    private processBatchResponse(responses) {
        const retryBatch = [];
        const retryRegisteredPromises: Map<string, { resolve, error }[]> = new Map<string, { resolve, error }[]>();

        this.registeredPromises.forEach((promises: { resolve; error; }[], url: string) => {
            let promiseResponse = responses.filter(resp => resp.id === url)[0];
            if (promiseResponse && promiseResponse.status === 429 && this.retries > 0) {
                retryBatch.push({
                    url,
                    id: url,
                    method: "GET"
                });
                retryRegisteredPromises.set(url, promises);
            } else {
                this.handleSingleResponse(promiseResponse, promises);
            }
        });

        if (retryBatch.length > 0) {
            this.registeredPromises = retryRegisteredPromises;
            this.batch = retryBatch;
        } else {
            this.batch = [];
            this.registeredPromises.clear();
        }
    }

    private handleSingleResponse(promiseResponse: any, promises: { resolve: any; error: any; }[]) {
        if (promiseResponse) {
            promises.forEach(promise => {
                promise.resolve({
                    json: () => Promise.resolve(promiseResponse.body),
                    ok: promiseResponse.status === 200,
                    text: () => Promise.resolve(JSON.stringify(promiseResponse.body))
                });
            });
        }
        else {
            promises.forEach(promise => {
                promise.error({
                    json: () => Promise.resolve(promiseResponse),
                    ok: false,
                    text: () => Promise.resolve(JSON.stringify(promiseResponse))
                });
            });
        }
    }

    protected requestBatch = async (batchBody: string, version: string = "beta") => {
        const options = {
            headers: {
                Accept: "application/json",
                ConsistencyLevel: "eventual",
                "Content-Type": "application/json"
            }, body: batchBody
        };
        const response = await this.baseClient.post(`https://graph.microsoft.com/${version}/$batch`, options);
        if (response.ok) {
            let batchResponse = await response.json();
            return batchResponse;
        }
    }
}