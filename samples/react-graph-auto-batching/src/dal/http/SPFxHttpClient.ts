import { IHttpClient, IHttpClientResponse } from "./IHttpClient";
import { AadHttpClient } from "@microsoft/sp-http";

export class SPFxHttpClient implements IHttpClient {
    constructor(protected httpClient: AadHttpClient) {

    }
    public get(url: string, options?: RequestInit): Promise<IHttpClientResponse> {
        return this.httpClient.get(url, AadHttpClient.configurations.v1, {
            ...options,
            headers: {
                ...options?.headers,
                Accept: "application/json",
                ConsistencyLevel: "eventual",
                "Content-Type": "application/json"
            }
        });
    }
    public post(url: string, options?: RequestInit): Promise<IHttpClientResponse> {
        return this.httpClient.post(url, AadHttpClient.configurations.v1, options);
    }
    public patch(url: string, options?: RequestInit): Promise<IHttpClientResponse> {
        return this.httpClient.fetch(url, AadHttpClient.configurations.v1, {
            ...options,
            headers: {
                ...options?.headers,
                Accept: "application/json",
                ConsistencyLevel: "eventual",
                "Content-Type": "application/json"
            },
            method: "PATCH"
        });
    }
    public put(url: string, options?: RequestInit): Promise<IHttpClientResponse> {
        return this.httpClient.fetch(url, AadHttpClient.configurations.v1, {
            ...options,
            headers: {
                ...options?.headers,
                Accept: "application/json",
                ConsistencyLevel: "eventual",
                "Content-Type": "application/json"
            },
            method: "PUT"
        });
    }
    public delete(url: string): Promise<IHttpClientResponse> {
        return this.httpClient.fetch(url, AadHttpClient.configurations.v1, {
            method: "DELETE"
        });
    }

}