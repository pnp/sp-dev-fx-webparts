
export type SPHttpClientConfiguration = any;
export type ISPHttpClientOptions = any;
export type SPHttpClientResponse = any;

export class SPHttpClient {
    public static readonly configurations: any;

    public async fetch(url: string, configuration: SPHttpClientConfiguration, options: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        return null;
    }

    public async get(url: string, configuration: SPHttpClientConfiguration, options?: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        return null;
    }

    public async post(url: string, configuration: SPHttpClientConfiguration, options: ISPHttpClientOptions): Promise<SPHttpClientResponse> {
        return null;
    }
}