// Types
export interface CopilotConversationMessage {
  "@odata.type": string;
  id: string;
  text: string;
  createdDateTime: string;
  adaptiveCards: unknown[];
  attributions: CopilotAttribution[];
  sensitivityLabel: CopilotSensitivityLabel;
}

export interface CopilotConversation {
  id: string;
  createdDateTime: string;
  displayName: string;
  status: string;
  turnCount: number;
  messages?: CopilotConversationMessage[];
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

// Interface
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
    },
  ): Promise<CopilotConversation>;
}
