import { ICompletionsRequest } from "./ICompletionsRequest";
import Constants from '../Constants';

export default class CompletionsRequestBuilder {

    private _completionsRequest: ICompletionsRequest

    public constructor(deployment: "gpt-35-turbo-model-deployment" | "gpt-4") {
        this._completionsRequest = {
            dataSources: [{
                type: "AzureCognitiveSearch",
                parameters: {
                  endpoint: Constants.AzureSearchEndpoint,
                  key: Constants.AzureSearchKey,
                  indexName: Constants.AzureSearchIndexName,
                  //semanticConfiguration: "hotels-index-semantic-config",
                  //queryType: "semantic",
                  queryType: "simple",
                  fieldsMapping: {
                    contentFieldsSeparator: "\n",
                    contentFields: ["Description", "HotelName", "Description_fr", "Category"],
                    filepathField: "HotelId",
                    titleField: "HotelName",
                    urlField: undefined
                  },
                  inScope: true,
                  roleInformation: "You are an AI assistant that helps users of a travel agency to find Hotels in our internal company database for our customers."
                  // "filter": "Tags/any(g:search.in(g, 'pool, view'))",
                }
              }],
            messages: [{
                role: "system",
                content: "You are an AI assistant that helps users of a travel agency to find Hotels in our internal company database for our customers."}
            ],
            deployment: deployment,
            temperature: 0,
            top_p: 1,
            max_tokens: 800
        }
    }

    public addUserMessage(content: string): void {
        this._completionsRequest.messages.push({
            role: "user",
            content: content
        });
    }

    public addAssistantMessage(content: string): void {
        this._completionsRequest.messages.push({
            role: "assistant",
            content: content
        });
    }

    public build(): ICompletionsRequest {
        return this._completionsRequest;
    }

    public buildAsJson(): string {
        return JSON.stringify(this._completionsRequest);
    }
}