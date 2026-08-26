export interface CopilotSearchResponse {
  '@odata.nextLink'?: string;
  totalCount: number;
  searchHits: CopilotSearchHit[];
}

export interface CopilotSearchHit {
  webUrl: string;
  preview: string;
  resourceType: string;
  resourceMetadata?: Record<string, unknown>;
}

export interface CopilotSearchRequest {
  query: string;
  pageSize?: number;
  dataSources?: CopilotSearchDataSourcesConfiguration;
}

export interface CopilotSearchDataSourcesConfiguration {
  oneDrive?: CopilotOneDriveConfiguration;
}

export interface CopilotOneDriveConfiguration {
  filterExpression?: string;
  resourceMetadataNames?: string[];
}

export interface ICopilotSearchService {

    /**
     * Perform hybrid (semantic and lexical) search across OneDrive for work or school content
     * @param query - Natural language query to search for relevant files (maximum 1,500 characters)
     * @param options - Optional parameters for the search request
     * @returns Promise<CopilotSearchResponse> The search results with matching documents
     * @throws Error if the Graph client is not initialized or the request fails
     */
    Search(
        query: string,
        options?: {
            pageSize?: number;
            dataSources?: CopilotSearchDataSourcesConfiguration;
        }
    ): Promise<CopilotSearchResponse>;
}
