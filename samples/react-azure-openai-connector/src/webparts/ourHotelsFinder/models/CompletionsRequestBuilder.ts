import { ICompletionsRequest } from "./ICompletionsRequest";
import Constants from '../Constants';

export default class CompletionsRequestBuilder {

    private _completionsRequest: ICompletionsRequest

    public constructor(deployment: "gpt-35-turbo-model-deployment" | "gpt-4") {
        this._completionsRequest = {
            dataSources: [{
                type: "AzureCognitiveSearch",
                parameters: {
                  endpoint: "https://srch-atlas-cp-dev.search.windows.net",
                  key: Constants.AzureSearchKey,
                  indexName: "hotels-openai-test-index-lml",
                  semanticConfiguration: "",
                  queryType: "simple",
                  fieldsMapping: {
                    contentFieldsSeparator: "\n",
                    contentFields: ["Description", "HotelName", "Category"],
                    filepathField: "HotelName",
                    titleField: "HotelName",
                    urlField: "HotelName"
                  },
                  inScope: true,
                  roleInformation: "You are an AI assistant that helps users of a travel agency to find Hotels in our internal company database for our customers."
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