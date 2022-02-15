import { ArrayUtilities } from "../../utils/ArrayUtilities";
import { IHttpClient, IHttpClientResponse } from "./IHttpClient";
import { BatchHandler } from "./BatchHandler";

export class BatchGraphClient implements IHttpClient {
    private batch: {
        id: string;
        url: string;
        method: "GET";
        headers: any;
    }[] = [];
    private registeredPromises: Map<string, { resolve, error }[]> = new Map<string, { resolve, error }[]>();
    constructor(protected baseClient: IHttpClient, public batchWaitTime = 500, public batchSplitThreshold = 15) {
    }
    public get(url: string, options?): Promise<IHttpClientResponse> {
        return new Promise<IHttpClientResponse>((resolve, error) => {
            this.createGetBatchRequest(url, { resolve, error });
        });
    }
    public post(url: string, options?): Promise<IHttpClientResponse> {
        return this.baseClient.post(url, options);
    }
    public patch(url: string, options?): Promise<IHttpClientResponse> {
        return this.baseClient.patch(url, options);
    }
    public put(url: string, options?): Promise<IHttpClientResponse> {
        return this.baseClient.put(url, options);
    }
    public delete(url: string): Promise<IHttpClientResponse> {
        return this.baseClient.delete(url);
    }
    protected generateBatch = async () => {
        const requestBatch = [...this.batch];
        this.batch = [];
        const requestPromises = new Map<string, { resolve, error }[]>(this.registeredPromises as any);

        this.registeredPromises.clear();

        //As there is an limit to max batch size (15) let's split our request to sub batches we will run sequentially
        let batches = ArrayUtilities.splitToMaxLength(requestBatch, this.batchSplitThreshold);
        for (const batch of batches) {
            let promisesToBeResolvedByCurrentBatch = ArrayUtilities.getSubMap(requestPromises, batch.map(b => b.id));
            const batchHandler = new BatchHandler(this.baseClient, promisesToBeResolvedByCurrentBatch, batch, BatchHandler.maxRetries);
            await batchHandler.executeBatch();
        }
    }
    public createGetBatchRequest = (url: string, requestPromise: { resolve, error }) => {
        if (this.batch.length === 0) {
            setTimeout(this.generateBatch, this.batchWaitTime);
        }
        let promiseId = encodeURIComponent(url);
        if (this.batch.filter(req => req.id === promiseId)[0]) {
            this.registeredPromises.get(url).push(requestPromise);
        }
        else {
            this.batch.push({
                url,
                id: promiseId,
                method: "GET",
                headers:{
                    "ConsistencyLevel":"eventual"
                }
            });
            this.registeredPromises.set(promiseId, [requestPromise]);
        }
    }
}