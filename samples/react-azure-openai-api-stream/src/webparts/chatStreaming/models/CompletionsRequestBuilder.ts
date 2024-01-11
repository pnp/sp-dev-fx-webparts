import { ICompletionsRequest } from "./ICompletionsRequest";

export default class CompletionsRequestBuilder {

    private _completionsRequest: ICompletionsRequest

    public constructor() {
        this._completionsRequest = {
            messages: [{
                role: "system",
                content: "You are an AI assistant that helps users of an intranet."}
            ],
            temperature: 0,
            top_p: 1,
            max_tokens: 800,
            stream: true
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