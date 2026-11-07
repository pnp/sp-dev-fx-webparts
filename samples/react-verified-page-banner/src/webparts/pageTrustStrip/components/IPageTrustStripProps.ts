import type { Theme } from "@fluentui/react-components";
import type { TrustStatus } from "../logic/trustStatus";

export interface IPageTrustStripProps {
  instanceId: string;
  theme: Theme;
  loading: boolean;
  placedOnPage: boolean;
  loadError?: string;
  columnsReady: boolean;
  listReady: boolean;
  columnProblem?: string;
  canManageWeb: boolean;
  canConfirm: boolean;
  /** Page owner or someone who can edit the page. */
  canSeeOpenRequests?: boolean;
  openRequestCount?: number;
  openRequestsUrl?: string;
  /** Shown in edit mode on every instance after the first. */
  duplicateNote?: string;
  ownerName?: string;
  ownerIsAuthorFallback: boolean;
  lastConfirmedText?: string;
  reviewDueText?: string;
  status: TrustStatus | "unavailable";
  reviewPeriodDays: number;
  /** Opens the flag dialog on first render. Used by the local preview. */
  initialFlagOpen?: boolean;
  onRetry: () => void;
  onConfirm: () => Promise<void>;
  onSetup: () => Promise<void>;
  onSubmitFlag: (note: string) => Promise<void>;
}
