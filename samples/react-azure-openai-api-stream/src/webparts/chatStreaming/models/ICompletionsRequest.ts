export interface ICompletionsRequest {
  messages: ICompletionsMessage[];
  temperature: number;
  top_p: number;
  max_tokens: number;
  stream: boolean;
}

export interface ICompletionsMessage {
  role: "user" | "assistant" | "system";
  content: string;
}
