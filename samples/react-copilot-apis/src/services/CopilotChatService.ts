// Import types for supporting SPFx with the service class
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { ChatMessageRequest, CopilotContextMessage, CopilotContextualResources, CopilotConversation, CopilotFileReference, ICopilotChatService } from "./ICopilotChatService";
import { MSGraphClientV3, MSGraphClientFactory } from '@microsoft/sp-http';

export class CopilotChatService implements ICopilotChatService {

    public static readonly serviceKey: ServiceKey<ICopilotChatService> = ServiceKey.create<ICopilotChatService>('PnP:CopilotAPIs:CopilotChatService', CopilotChatService);
    private _msGraphClient: MSGraphClientV3 | undefined;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(async () => {
            const msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
            this._msGraphClient = await msGraphClientFactory.getClient('3');
        });
    }

    /**
     * Create a new Copilot conversation
     * @returns Promise<CopilotConversation> The created conversation
     * @throws Error if the Graph client is not initialized or the request fails
     */
    public async CreateCopilotConversation(): Promise<CopilotConversation> {
        // Implementation for creating a new Copilot conversation
        if (!this._msGraphClient) {
            throw new Error('Microsoft Graph client has not been initialized.');
        }

        try {
            console.log('[CopilotChatService] Creating new Copilot conversation...');
            
            // POST to /beta/copilot/conversations with empty body
            const conversation: CopilotConversation = await this._msGraphClient
            .api('/copilot/conversations')
            .version('beta')
            .post({});

            console.log('[CopilotChatService] Conversation created successfully:', conversation.id);
            return conversation;
        } catch (error) {
            console.error('[CopilotChatService] Error creating conversation:', error);
            throw new Error(`Failed to create Copilot conversation: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        // Implementation for sending a chat message within an existing Copilot conversation

        if (!this._msGraphClient) {
            throw new Error('Microsoft Graph client has not been initialized.');
        }

        if (!conversationId) {
            throw new Error('Conversation ID is required');
        }

        if (!messageText || messageText.trim().length === 0) {
            throw new Error('Message text is required and cannot be empty');
        }

        try {
            console.log('[CopilotChatService] Sending message to conversation:', conversationId);
            
            // Build the request body
            const requestBody: ChatMessageRequest = {
                message: {
                        text: messageText.trim()
                    },
                    locationHint: {
                        timeZone: options?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
                    }
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
                        isWebEnabled: options.webSearchEnabled
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
                .version('beta')
                .post(requestBody);

            console.log('[CopilotChatService] Message sent successfully. Turn count:', response.turnCount);
            return response;
        } catch (error) {
            console.error('[CopilotChatService] Error sending chat message:', error);
            throw new Error(`Failed to send chat message: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}