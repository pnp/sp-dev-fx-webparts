import type { IKpiCard } from '../models/IKpiScorecard';
import type { IKpiScorecardConfig, KpiScorecardService } from '../services/KpiScorecardService';

export interface IKpiScorecardProps {
  readonly config: IKpiScorecardConfig;
  readonly service: KpiScorecardService;
  readonly cardsTitle: string;
}

export interface IKpiScorecardState {
  readonly status: 'loading' | 'success' | 'empty' | 'error';
  readonly cards: ReadonlyArray<IKpiCard>;
  readonly errorKind?: 'accessDenied' | 'notFound' | 'throttled' | 'generic';
}
