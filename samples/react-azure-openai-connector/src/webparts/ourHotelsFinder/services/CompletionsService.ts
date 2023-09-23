import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { ICompletionsResponse } from '../models/ICompletionsResponse';
import { IChatMessage } from '../models/IChatMessage';
import CompletionsRequestBuilder from '../models/CompletionsRequestBuilder';
import Constants from '../Constants';

export default class CompletionsService {
    private readonly _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    public async getCompletions(
            sessionMessageHistory: IChatMessage[],
            query: string,
            deployment: "gpt-35-turbo-model-deployment" | "gpt-4" = "gpt-4") : Promise<ICompletionsResponse> {
        const requestBuilder: CompletionsRequestBuilder = new CompletionsRequestBuilder(deployment);

        sessionMessageHistory.map(m => {
            if (m.role === 'assistant') {
                requestBuilder.addAssistantMessage(m.text);
            } else {
                requestBuilder.addUserMessage(m.text);
            }
        });
        requestBuilder.addUserMessage(query);

        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append('Api-Key', `${Constants.AzureOpenAiApiKey}`);

        const httpClientOptions: IHttpClientOptions = {
            body: requestBuilder.buildAsJson(),
            headers: requestHeaders
        };

        const response: HttpClientResponse =
            await this._httpClient.post(
                this._compose_AzureOpenAiApiUrl(deployment),
                HttpClient.configurations.v1,
                httpClientOptions);

        const completionsResponse: ICompletionsResponse = await response.json();

        return completionsResponse;
    }

    private _compose_AzureOpenAiApiUrl(deployment: "gpt-35-turbo-model-deployment" | "gpt-4"): string {
        return `https://oai-atlas-dev-eus.openai.azure.com/openai/deployments/${deployment}/extensions/chat/completions?api-version=2023-06-01-preview`;
    }
}