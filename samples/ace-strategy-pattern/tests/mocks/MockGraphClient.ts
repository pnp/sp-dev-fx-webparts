import { IHttpClient, IHttpClientResponse } from "../../src/dal/http/IHttpClient";

export class MockGraphClient implements IHttpClient{
    public responses: Map<string,any> = new Map<string,any>();
    get(url: string, options?: RequestInit): Promise<IHttpClientResponse> {
        return this.returnMock(url);
    }
    private returnMock(url: string) {
        let responseBody = this.responses.get(url);
        let response = {
            ok: true,
            statusText: "OK",
            status: 200,
            json: () => Promise.resolve(responseBody),
            text: () => Promise.resolve(JSON.stringify(responseBody)),
            blob: () => Promise.resolve(new Blob([JSON.stringify(responseBody)], { type: "application/json" }))
        };
        return Promise.resolve(response);
    }

    post(url: string, options?: RequestInit): Promise<IHttpClientResponse> {
        return this.returnMock(url);
    }
    patch(url: string, options?: RequestInit): Promise<IHttpClientResponse> {
        throw new Error("Method not implemented.");
    }
    put(url: string, options?: RequestInit): Promise<IHttpClientResponse> {
        throw new Error("Method not implemented.");
    }
    delete(url: string): Promise<IHttpClientResponse> {
        throw new Error("Method not implemented.");
    }

}