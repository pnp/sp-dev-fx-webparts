import { ISourceResult } from '../services/governanceLogic';

export interface IGovernanceSiteLifecycleDashboardProps {
  sourceResults: ISourceResult[];
  configurationErrors: string[];
  referenceDate: string;
  reviewHorizonDays: number;
  loading: boolean;
  loadError?: string;
  onRetry: () => void;
}
