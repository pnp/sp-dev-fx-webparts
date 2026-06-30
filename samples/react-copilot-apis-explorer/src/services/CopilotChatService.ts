import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";
import {
  ICopilotChatService,
  CopilotConversation,
  CopilotContextMessage,
  CopilotContextualResources,
  CopilotFileReference,
  ChatMessageRequest,
} from "./ICopilotChatService";

// Service Implementation
export class CopilotChatService implements ICopilotChatService {
  /**
   * Instance method to send a chat message to a Copilot conversation.
   * Delegates to the static method after ensuring the client is initialized.
   */
  public async SendChatMessage(
    conversationId: string,
    messageText: string,
    options?: {
      timeZone?: string;
      additionalContext?: CopilotContextMessage[];
      contextualResources?: CopilotContextualResources;
      files?: CopilotFileReference[];
      webSearchEnabled?: boolean;
    },
  ): Promise<CopilotConversation> {
    if (!CopilotChatService._msGraphClient) {
      throw new Error(
        "Microsoft Graph client has not been initialized. Call CopilotChatService.init() first.",
      );
    }
    return await CopilotChatService.SendChatMessage(
      conversationId,
      messageText,
      options,
    );
  }

  private static _msGraphClient: MSGraphClientV3 | null = null;

  /**
   * Initialize the Microsoft Graph client
   * @param msGraphClientFactory The MSGraphClientFactory from SPFx context
   */
  public static async init(
    msGraphClientFactory: MSGraphClientFactory,
  ): Promise<void> {
    CopilotChatService._msGraphClient =
      await msGraphClientFactory.getClient("3");
    console.log(
      "[CopilotChatService] Microsoft Graph client initialized successfully",
    );
  }

  /**
   * Create a new Copilot conversation
   * @returns Promise<CopilotConversation> The created conversation
   * @throws Error if the Graph client is not initialized or the request fails
   */
  public static async CreateCopilotConversation(): Promise<CopilotConversation> {
    if (!CopilotChatService._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized.");
    }

    try {
      console.log("[CopilotChatService] Creating new Copilot conversation...");

      // POST to /beta/copilot/conversations with empty body
      const conversation: CopilotConversation =
        await CopilotChatService._msGraphClient
          .api("/copilot/conversations")
          .version("beta")
          .post({});

      console.log(
        "[CopilotChatService] Conversation created successfully:",
        conversation.id,
      );
      return conversation;
    } catch (error) {
      console.error("[CopilotChatService] Error creating conversation:", error);
      console.error(
        "[CopilotChatService] Full error details:",
        JSON.stringify(error, null, 2),
      );

      // Check if it's a Graph API error with more details
      if (error && typeof error === "object" && "statusCode" in error) {
        console.error(
          "[CopilotChatService] Status Code:",
          (error as any).statusCode,
        );
        console.error("[CopilotChatService] Error body:", (error as any).body);
      }
      throw new Error(
        `Failed to create Copilot conversation: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Send a chat message to an existing Copilot conversation
   * @param conversationId - The ID of the conversation to send the message to
   * @param messageText - The text of the message to send
   * @param options - Optional parameters for the chat message
   * @returns Promise<CopilotConversation> The updated conversation with the response
   * @throws Error if the Graph client is not initialized or the request fails
   */
  public static async SendChatMessage(
    conversationId: string,
    messageText: string,
    options?: {
      timeZone?: string;
      additionalContext?: CopilotContextMessage[];
      contextualResources?: CopilotContextualResources;
      files?: CopilotFileReference[];
      webSearchEnabled?: boolean;
    },
  ): Promise<CopilotConversation> {
    // Implementation for sending a chat message within an existing Copilot conversation

    if (!this._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized.");
    }

    if (!conversationId) {
      throw new Error("Conversation ID is required");
    }

    if (!messageText || messageText.trim().length === 0) {
      throw new Error("Message text is required and cannot be empty");
    }

    try {
      console.log(
        "[CopilotChatService] Sending message to conversation:",
        conversationId,
      );

      // Build the request body
      const requestBody: ChatMessageRequest = {
        message: {
          text: messageText.trim(),
        },
        locationHint: {
          timeZone:
            options?.timeZone ||
            Intl.DateTimeFormat().resolvedOptions().timeZone ||
            "UTC",
        },
      };

      // Add additional context if provided
      if (options?.additionalContext && options.additionalContext.length > 0) {
        requestBody.additionalContext = options.additionalContext;
      }

      // Handle contextual resources with priority order:
      // 1. Use directly provided contextualResources if available
      // 2. Build contextualResources from individual options (files, webSearchEnabled)
      let contextualResources: CopilotContextualResources | undefined;

      if (options?.contextualResources) {
        // Use the directly provided contextualResources
        contextualResources = { ...options.contextualResources };
      } else {
        // Build contextualResources from individual options for backward compatibility
        contextualResources = {};

        // Add files if provided
        if (options?.files && options.files.length > 0) {
          contextualResources.files = options.files;
        }

        // Configure web search if specified
        if (options?.webSearchEnabled !== undefined) {
          contextualResources.webContext = {
            isWebEnabled: options.webSearchEnabled,
          };
        }

        // Only add contextualResources if we have content
        if (Object.keys(contextualResources).length === 0) {
          contextualResources = undefined;
        }
      }

      // Add contextualResources to request if available
      if (contextualResources) {
        requestBody.contextualResources = contextualResources;
      }

      // POST to /beta/copilot/conversations/{conversationId}/chat
      const response: CopilotConversation = await this._msGraphClient
        .api(`/copilot/conversations/${conversationId}/chat`)
        .version("beta")
        .post(requestBody);

      console.log(
        "[CopilotChatService] Message sent successfully. Turn count:",
        response.turnCount,
      );
      return response;
    } catch (error) {
      console.error("[CopilotChatService] Error sending chat message:", error);
      throw new Error(
        `Failed to send chat message: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Instance method to create a Copilot conversation.
   * Delegates to the static method after ensuring the client is initialized.
   */
  public async CreateCopilotConversation(): Promise<CopilotConversation> {
    if (!CopilotChatService._msGraphClient) {
      throw new Error(
        "Microsoft Graph client has not been initialized. Call CopilotChatService.init() first.",
      );
    }
    return await CopilotChatService.CreateCopilotConversation();
  }
}
