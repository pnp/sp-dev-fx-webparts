export interface CopilotConversation {
  id: string;
  turnCount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CopilotContextMessage {
  author: string;
  text: string;
}

export interface CopilotFileReference {
  sharePointFile?: {
    siteId?: string;
    itemId?: string;
    url?: string;
  };
}

export interface CopilotContextualResources {
  files?: CopilotFileReference[];
  webContext?: {
    isWebEnabled: boolean;
  };
}

export interface ChatMessageRequest {
  message: {
    text: string;
  };
  locationHint?: {
    timeZone: string;
  };
  additionalContext?: CopilotContextMessage[];
  contextualResources?: CopilotContextualResources;
}

export interface ICopilotChatService {
  CreateCopilotConversation(): Promise<CopilotConversation>;
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
