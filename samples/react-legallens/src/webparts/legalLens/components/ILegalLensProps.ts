import { ISharePointService } from '../services/SharePointService';
import { IAzureAIFoundryService } from '../services/AzureAIFoundryService';
import { ILang } from '../constants/languages';

export interface ILegalLensProps {
  langs: ILang[];
  description: string;
  sharePointService: ISharePointService;
  aiFoundryService: IAzureAIFoundryService;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  userEmail: string;
  context: any;
  documentIntelligenceEndpoint?: string;
  documentIntelligenceKey?: string;
  showTranslateTab: boolean;
  showESignatureTab: boolean;
  colorScheme: 'dark' | 'light' | 'site';
}