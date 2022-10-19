export interface IHttpClientResponse {
    json: () => Promise<any>;
    text: () => Promise<string>;
    blob: () => Promise<Blob>;
    ok: boolean;
    status: number;
    statusText?: string;
}

export interface IHttpClient {
    get(url: string, options?: RequestInit): Promise<IHttpClientResponse>;
    post(url: string, options?: RequestInit): Promise<IHttpClientResponse>;
    patch(url: string, options?: RequestInit): Promise<IHttpClientResponse>;
    put(url: string, options?: RequestInit): Promise<IHttpClientResponse>;
    delete(url: string): Promise<IHttpClientResponse>;
}
