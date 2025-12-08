import { ICopilotChatService } from '../../../services/ICopilotChatService';

export interface ICopilotChatProps {
  additionalInstructions: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  copilotChatService: ICopilotChatService | undefined;
}
