import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";

class ServiceHelper {

    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {

        this._httpClient = httpClient;
    }

    /**
     * Ensures an URL can be resolved via a GET or POST request (i.e not 404)
     * @param url The URL to test
     */
    public async ensureUrlResovles(url: string): Promise<void> {
        try {
            const responseGet: HttpClientResponse = await this._httpClient.get(url, HttpClient.configurations.v1);
            const responsePost = await this._httpClient.post(url, HttpClient.configurations.v1, {});
            
            if ((responseGet.status !== 404) || (responsePost.status !== 404)) {
                return;
            } else {
                throw "Not Found (404)";
            }

        } catch (error) {
            throw error;
        }
    }   
}

export default ServiceHelper;