export interface CopilotConversation {
  id: string;
  createdDateTime: string;
  displayName: string;
  status: string;
  turnCount: number;
  messages?: CopilotConversationMessage[];
}

export interface CopilotConversationMessage {
  '@odata.type': string;
  id: string;
  text: string;
  createdDateTime: string;
  adaptiveCards: unknown[];
  attributions: CopilotAttribution[];
  sensitivityLabel: CopilotSensitivityLabel;
}

export interface CopilotAttribution {
  attributionType: string;
  providerDisplayName: string;
  attributionSource: string;
  seeMoreWebUrl: string;
  imageWebUrl: string;
  imageFavIcon: string;
  imageWidth: number;
  imageHeight: number;
}

export interface CopilotSensitivityLabel {
  sensitivityLabelId: string | undefined;
  displayName: string | undefined;
  tooltip: string | undefined;
  priority: number | undefined;
  color: string | undefined;
  isEncrypted: boolean | undefined;
}

export interface ChatMessageRequest {
  message: {
    text: string;
  };
  locationHint: {
    timeZone: string;
  };
  additionalContext?: CopilotContextMessage[];
  contextualResources?: CopilotContextualResources;
}

export interface CopilotContextMessage {
  text: string;
}

export interface CopilotContextualResources {
  files?: CopilotFileReference[];
  webContext?: {
    isWebEnabled: boolean;
  };
}

export interface CopilotFileReference {
  uri: string;
}

export interface ICopilotChatService {

    /**
     * Create a new Copilot conversation
     * @returns Promise<CopilotConversation> The created conversation
     * @throws Error if the Graph client is not initialized or the request fails
     */
    CreateCopilotConversation(): Promise<CopilotConversation>;

    /**
     * Send a chat message to an existing Copilot conversation
     * @param conversationId - The ID of the conversation to send the message to
     * @param messageText - The text of the message to send
     * @param options - Optional parameters for the chat message
     * @returns Promise<CopilotConversation> The updated conversation with the response
     * @throws Error if the Graph client is not initialized or the request fails
     */
    SendChatMessage(
        conversationId: string,
        messageText: string,
        options?: {
            timeZone?: string;
            additionalContext?: CopilotContextMessage[];
            contextualResources?: CopilotContextualResources;
            files?: CopilotFileReference[];
            webSearchEnabled?: boolean;
        }
    ): Promise<CopilotConversation>;
}