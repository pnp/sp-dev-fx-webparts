export type KpiThresholdState = 'onTrack' | 'attention' | 'atRisk' | 'unknown';
export type KpiTrend = 'rising' | 'falling' | 'steady' | 'unknown';

export interface IKpiObservation {
  readonly id: number;
  readonly title: string;
  readonly value: number | undefined;
  readonly target: number | undefined;
  readonly status: string;
  readonly date?: string;
}

export interface IKpiCard {
  readonly title: string;
  readonly value: number | undefined;
  readonly target: number | undefined;
  readonly status: string;
  readonly threshold: KpiThresholdState;
  readonly delta: number | undefined;
  readonly trend: KpiTrend;
  readonly updatedAt?: string;
}

export type KpiLoadErrorKind = 'accessDenied' | 'notFound' | 'throttled' | 'generic';

export interface IKpiLoadError {
  readonly kind: KpiLoadErrorKind;
  readonly message: string;
}
