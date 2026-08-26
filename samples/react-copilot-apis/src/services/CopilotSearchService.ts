// Import types for supporting SPFx with the service class
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { CopilotSearchDataSourcesConfiguration, CopilotSearchRequest, CopilotSearchResponse, ICopilotSearchService } from "./ICopilotSearchService";
import { MSGraphClientV3, MSGraphClientFactory } from '@microsoft/sp-http';

export class CopilotSearchService implements ICopilotSearchService {

    public static readonly serviceKey: ServiceKey<ICopilotSearchService> = ServiceKey.create<ICopilotSearchService>('PnP:CopilotAPIs:CopilotSearchService', CopilotSearchService);
    private _msGraphClient: MSGraphClientV3 | undefined;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(async () => {
            const msGraphClientFactory: MSGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
            this._msGraphClient = await msGraphClientFactory.getClient('3');
        });
    }

    /**
     * Perform hybrid (semantic and lexical) search across OneDrive for work or school content
     * @param query - Natural language query to search for relevant files (maximum 1,500 characters)
     * @param options - Optional parameters for the search request
     * @returns Promise<CopilotSearchResponse> The search results with matching documents
     * @throws Error if the Graph client is not initialized or the request fails
     */
    public async Search(
        query: string,
        options?: {
            pageSize?: number;
            dataSources?: CopilotSearchDataSourcesConfiguration;
        }
    ): Promise<CopilotSearchResponse> {
        // Implementation for searching OneDrive content using Copilot Search API

        if (!this._msGraphClient) {
            throw new Error('Microsoft Graph client has not been initialized.');
        }

        if (!query || query.trim().length === 0) {
            throw new Error('Query is required and cannot be empty');
        }

        if (query.trim().length > 1500) {
            throw new Error('Query must be 1,500 characters or less');
        }

        try {
            console.log('[CopilotSearchService] Performing search with query:', query);
            
            // Build the request body
            const requestBody: CopilotSearchRequest = {
                query: query.trim()
            };

            // Add optional parameters if provided
            if (options?.pageSize !== undefined) {
                // Validate pageSize is within acceptable range (1-100)
                if (options.pageSize < 1 || options.pageSize > 100) {
                    throw new Error('Page size must be between 1 and 100');
                }
                requestBody.pageSize = options.pageSize;
            }

            // Add data sources configuration if provided
            if (options?.dataSources) {
                requestBody.dataSources = options.dataSources;
            }

            // POST to /beta/copilot/search
            const response: CopilotSearchResponse = await this._msGraphClient
                .api('/copilot/search')
                .version('beta')
                .post(requestBody);

            console.log('[CopilotSearchService] Search completed successfully. Total results:', response.totalCount);
            return response;
        } catch (error) {
            console.error('[CopilotSearchService] Error performing search:', error);
            throw new Error(`Failed to perform Copilot search: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
