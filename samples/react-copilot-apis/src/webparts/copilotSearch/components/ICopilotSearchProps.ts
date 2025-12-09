import { ICopilotSearchService } from '../../../services/ICopilotSearchService';

export interface ICopilotSearchProps {
  pageSize: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  copilotSearchService: ICopilotSearchService | undefined;
}
