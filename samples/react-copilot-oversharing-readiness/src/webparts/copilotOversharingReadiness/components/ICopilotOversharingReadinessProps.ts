import type { IRiskSettings } from '../services/riskSettings';
import type * as stringsModule from 'CopilotOversharingReadinessWebPartStrings';

export interface ICopilotOversharingReadinessProps {
  description: string;
  environmentMessage: string;
  userDisplayName: string;
  dataSource: string;
  settings: IRiskSettings;
  strings: typeof stringsModule;
  sp?: unknown;
  graph?: unknown;
  hostWebUrl?: string;
}
