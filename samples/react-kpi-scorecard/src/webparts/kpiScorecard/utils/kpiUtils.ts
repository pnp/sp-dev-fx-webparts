import type { IKpiCard, IKpiObservation, KpiThresholdState, KpiTrend } from '../models/IKpiScorecard';

export const MAX_KPI_CARDS = 6;
export const MIN_KPI_CARDS = 3;
export const ATTENTION_RATIO = 0.8;

export function normalizeNumber(value: unknown): number | undefined {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value !== 'string') {
    return undefined;
  }

  const text = value.trim();
  if (!text || !/^-?(?:\d+\.?\d*|\.\d+)$/.test(text)) {
    return undefined;
  }
  const number = Number(text);
  return Number.isFinite(number) ? number : undefined;
}

export function normalizeText(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    return normalizeText(record.LookupValue ?? record.Title ?? record.Value);
  }
  return '';
}

export function normalizeDate(value: unknown): string | undefined {
  if (typeof value !== 'string' && !(value instanceof Date)) {
    return undefined;
  }
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function getThresholdState(value: number | undefined, target: number | undefined): KpiThresholdState {
  if (typeof value !== 'number' || typeof target !== 'number') {
    return 'unknown';
  }
  if (value >= target) {
    return 'onTrack';
  }
  if (target > 0 && value >= target * ATTENTION_RATIO) {
    return 'attention';
  }
  return 'atRisk';
}

export function calculateDelta(current: number | undefined, previous: number | undefined): number | undefined {
  if (typeof current !== 'number' || typeof previous !== 'number') {
    return undefined;
  }
  const delta = current - previous;
  return Number.isFinite(delta) ? delta : undefined;
}

export function getTrend(delta: number | undefined): KpiTrend {
  if (typeof delta !== 'number') {
    return 'unknown';
  }
  if (delta > 0) {
    return 'rising';
  }
  if (delta < 0) {
    return 'falling';
  }
  return 'steady';
}

export function safeDisplayNumber(value: number | undefined, locale = 'en-GB'): string {
  return typeof value !== 'number' ? '—' : new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
}

export function safeDisplayDelta(delta: number | undefined, locale = 'en-GB'): string {
  if (typeof delta !== 'number') {
    return 'No prior observation';
  }
  const sign = delta > 0 ? '+' : '';
  return `${sign}${safeDisplayNumber(delta, locale)}`;
}

function observationSort(left: IKpiObservation, right: IKpiObservation): number {
  const leftDate = left.date ? Date.parse(left.date) : Number.NEGATIVE_INFINITY;
  const rightDate = right.date ? Date.parse(right.date) : Number.NEGATIVE_INFINITY;
  if (rightDate !== leftDate) {
    return rightDate - leftDate;
  }
  return right.id - left.id;
}

export function mapKpiCards(observations: ReadonlyArray<IKpiObservation>): IKpiCard[] {
  const byTitle = new Map<string, IKpiObservation[]>();
  observations.forEach((observation) => {
    const title = observation.title.trim();
    if (!title) {
      return;
    }
    const existing = byTitle.get(title) || [];
    existing.push({ ...observation, title });
    byTitle.set(title, existing);
  });

  return Array.from(byTitle.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .slice(0, MAX_KPI_CARDS)
    .map(([, values]) => {
      const sorted = values.slice().sort(observationSort);
      const current = sorted[0];
      const previous = sorted[1];
      const delta = calculateDelta(current.value, previous?.value);
      return {
        title: current.title,
        value: current.value,
        target: current.target,
        status: current.status,
        threshold: getThresholdState(current.value, current.target),
        delta,
        trend: getTrend(delta),
        updatedAt: current.date
      };
    });
}
