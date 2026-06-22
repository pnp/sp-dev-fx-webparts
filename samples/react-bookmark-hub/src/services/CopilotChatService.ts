import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";
import {
  ICopilotChatService,
  CopilotConversation,
  CopilotContextMessage,
  CopilotContextualResources,
  CopilotFileReference,
  ChatMessageRequest,
} from "./ICopilotChatService";

export class CopilotChatService implements ICopilotChatService {
  private static _msGraphClient: MSGraphClientV3 | null = null;

  public static async init(msGraphClientFactory: MSGraphClientFactory): Promise<void> {
    CopilotChatService._msGraphClient = await msGraphClientFactory.getClient("3");
  }

  public static async CreateCopilotConversation(): Promise<CopilotConversation> {
    if (!CopilotChatService._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized. Call CopilotChatService.init() first.");
    }
    try {
      const conversation: CopilotConversation = await CopilotChatService._msGraphClient
        .api("/copilot/conversations")
        .version("beta")
        .post({});
      return conversation;
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error("[CopilotChatService] Error creating conversation:", error);
      if (error && typeof error === "object" && "statusCode" in error && "body" in error) {
        console.error("[CopilotChatService] Error body:", (error as Record<string, unknown>).body);
      }
      throw new Error(`Failed to create Copilot conversation: ${msg}`);
    }
  }

  public static async SendChatMessage(
    conversationId: string,
    messageText: string,
    options?: {
      timeZone?: string;
      additionalContext?: CopilotContextMessage[];
      contextualResources?: CopilotContextualResources;
      files?: CopilotFileReference[];
      webSearchEnabled?: boolean;
    }
  ): Promise<CopilotConversation> {
    if (!CopilotChatService._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized.");
    }
    if (!conversationId) {
      throw new Error("Conversation ID is required.");
    }
    if (!messageText || messageText.trim().length === 0) {
      throw new Error("Message text is required and cannot be empty.");
    }

    try {
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

      if (options?.additionalContext && options.additionalContext.length > 0) {
        requestBody.additionalContext = options.additionalContext;
      }

      let contextualResources: CopilotContextualResources | undefined;
      if (options?.contextualResources) {
        contextualResources = { ...options.contextualResources };
      } else {
        contextualResources = {};
        if (options?.files && options.files.length > 0) {
          contextualResources.files = options.files;
        }
        if (options?.webSearchEnabled !== undefined) {
          contextualResources.webContext = { isWebEnabled: options.webSearchEnabled };
        }
        if (Object.keys(contextualResources).length === 0) {
          contextualResources = undefined;
        }
      }

      if (contextualResources) {
        requestBody.contextualResources = contextualResources;
      }

      const response: CopilotConversation = await CopilotChatService._msGraphClient
        .api(`/copilot/conversations/${conversationId}/chat`)
        .version("beta")
        .post(requestBody);

      return response;
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error("[CopilotChatService] Error sending chat message:", error);
      throw new Error(`Failed to send chat message: ${msg}`);
    }
  }

  public async CreateCopilotConversation(): Promise<CopilotConversation> {
    if (!CopilotChatService._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized. Call CopilotChatService.init() first.");
    }
    return CopilotChatService.CreateCopilotConversation();
  }

  public async SendChatMessage(
    conversationId: string,
    messageText: string,
    options?: {
      timeZone?: string;
      additionalContext?: CopilotContextMessage[];
      contextualResources?: CopilotContextualResources;
      files?: CopilotFileReference[];
      webSearchEnabled?: boolean;
    }
  ): Promise<CopilotConversation> {
    if (!CopilotChatService._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized. Call CopilotChatService.init() first.");
    }
    return CopilotChatService.SendChatMessage(conversationId, messageText, options);
  }
}
