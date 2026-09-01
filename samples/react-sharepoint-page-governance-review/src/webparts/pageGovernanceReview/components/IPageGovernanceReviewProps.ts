import { SPHttpClient } from '@microsoft/sp-http';
export interface IPageGovernanceReviewProps { client: SPHttpClient; webUrl: string; sourcesJson: string; oldModifiedDays: number; referenceDate: string; staleReviewBefore: string; }
