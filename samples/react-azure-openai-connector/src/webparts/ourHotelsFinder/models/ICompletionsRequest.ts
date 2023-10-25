export interface ICompletionsRequest {
  dataSources: ICompletionsDataSource[];
  messages: ICompletionsMessage[];
  deployment: "gpt-35-turbo-model-deployment" | "gpt-4";
  temperature: number;
  top_p: number;
  max_tokens: number;
}

export interface ICompletionsDataSource {
  type: "AzureCognitiveSearch";
  parameters: ICompletionsDataSourceParameters;
}

export interface ICompletionsDataSourceParameters {
  endpoint: string;
  key: string;
  indexName: string;
  semanticConfiguration?: string;
  queryType: string;
  fieldsMapping: ICompletionsDataSourceFieldsMapping;
  inScope: boolean;
  roleInformation: string;
}

export interface ICompletionsDataSourceFieldsMapping {
  contentFieldsSeparator: string;
  contentFields: string[];
  filepathField: string;
  titleField: string;
  urlField: string | undefined;
}

export interface ICompletionsMessage {
  role: "user" | "assistant" | "system";
  content: string;
}
