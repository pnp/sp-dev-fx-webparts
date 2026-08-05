import { ApprovalsService } from '../services/ApprovalsService';

export interface IPowerAutomateApprovalsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  approvalsService: ApprovalsService;
}
