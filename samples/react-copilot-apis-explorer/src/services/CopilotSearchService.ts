import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";
import {
  ICopilotSearchService,
  CopilotSearchRequest,
  CopilotSearchResponse,
} from "./ICopilotSearchService";

// ============================================================================
// Copilot Search Service
// Calls POST /beta/copilot/search to perform hybrid semantic + lexical search
// across OneDrive for work or school content.
//
// Key points for developers:
// - This is a Beta API and may change
// - Searches respect existing access controls and sensitivity labels
// - The query supports natural language (max 1,500 characters)
// - Results include preview text with keyword highlighting via <c0> tags
// ============================================================================
export class CopilotSearchService implements ICopilotSearchService {
  private static _msGraphClient: MSGraphClientV3 | null = null;

  public static async init(
    msGraphClientFactory: MSGraphClientFactory,
  ): Promise<void> {
    CopilotSearchService._msGraphClient =
      await msGraphClientFactory.getClient("3");
    console.log(
      "[CopilotSearchService] Microsoft Graph client initialized successfully",
    );
  }

  /**
   * Perform a hybrid semantic and lexical search across OneDrive content.
   * @param request - The search request with query, pageSize, and optional dataSources
   * @returns The search response with totalCount and searchHits
   */
  public static async Search(
    request: CopilotSearchRequest,
  ): Promise<CopilotSearchResponse> {
    if (!CopilotSearchService._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized.");
    }

    if (!request.query || request.query.trim().length === 0) {
      throw new Error("Search query is required and cannot be empty.");
    }

    if (request.query.length > 1500) {
      throw new Error("Search query cannot exceed 1,500 characters.");
    }

    try {
      console.log(
        "[CopilotSearchService] Searching for:",
        request.query,
      );

      // Build the request body
      const requestBody: CopilotSearchRequest = {
        query: request.query.trim(),
        pageSize: request.pageSize || 10,
        dataSources: request.dataSources || {
          oneDrive: {
            resourceMetadataNames: ["title", "author"],
          },
        },
      };

      // POST to /beta/copilot/search
      const response: CopilotSearchResponse =
        await CopilotSearchService._msGraphClient
          .api("/copilot/search")
          .version("beta")
          .post(requestBody);

      console.log(
        "[CopilotSearchService] Search completed. Total results:",
        response.totalCount,
      );
      return response;
    } catch (error) {
      console.error("[CopilotSearchService] Error performing search:", error);
      throw new Error(
        `Failed to perform Copilot search: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Instance method delegates to static method
  public async Search(
    request: CopilotSearchRequest,
  ): Promise<CopilotSearchResponse> {
    return await CopilotSearchService.Search(request);
  }
}
