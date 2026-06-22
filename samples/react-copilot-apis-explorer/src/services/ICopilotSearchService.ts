// ============================================================================
// Copilot Search API - Type Definitions
// API: POST /beta/copilot/search
// Performs hybrid semantic and lexical search across OneDrive for work/school.
// Required permissions: Files.Read.All, Sites.Read.All
// ============================================================================

export interface CopilotSearchRequest {
  query: string;
  pageSize?: number;
  dataSources?: CopilotSearchDataSources;
}

export interface CopilotSearchDataSources {
  oneDrive?: {
    filterExpression?: string;
    resourceMetadataNames?: string[];
  };
}

export interface CopilotSearchResponse {
  totalCount: number;
  searchHits: CopilotSearchHit[];
  "@odata.nextLink"?: string;
}

export interface CopilotSearchHit {
  webUrl: string;
  preview: string;
  resourceType: string;
  resourceMetadata: {
    title: string;
    author: string;
  };
}

export interface ICopilotSearchService {
  Search(request: CopilotSearchRequest): Promise<CopilotSearchResponse>;
}
