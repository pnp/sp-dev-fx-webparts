import { ICopilotChatService } from '../../../services/ICopilotChatService';

export interface ICopilotChatProps {
  additionalContext: string;
  webSearchEnabled: boolean;
  files: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  copilotChatService: ICopilotChatService | undefined;
}
