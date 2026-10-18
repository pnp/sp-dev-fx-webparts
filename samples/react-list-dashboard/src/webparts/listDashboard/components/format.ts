// Small number-formatting helpers (no external dependency).

import { INumberFormat } from '../model/dashboardTypes';

export function formatNumber(n: number, decimals: number): number | string {
  if (n === null || n === undefined || isNaN(n)) { return '0'; }
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

// Render a measure per the chosen format. For 'percent', total is the group's sum
// so each value shows as a share of the whole; without a total it falls back to plain.
export function formatValue(n: number, fmt: INumberFormat, total?: number): string {
  if (n === null || n === undefined || isNaN(n)) { return '0'; }
  const dp = Math.max(0, Math.min(2, fmt.decimals || 0));
  const fixed = (x: number): string => x.toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp });
  switch (fmt.kind) {
    case 'percent': {
      if (!total) { return fixed(n); } // no group total (e.g. a lone stat) -> plain number
      return fixed((n / total) * 100) + '%';
    }
    case 'currency':
      return (fmt.currencySymbol || '') + fixed(n);
    case 'number':
      return fixed(n);
    case 'compact':
    default:
      return formatCompact(n);
  }
}

// Compact form for big headline numbers: 1.2K, 3.4M, 1.1B.
export function formatCompact(n: number): string {
  if (n === null || n === undefined || isNaN(n)) { return '0'; }
  const abs = Math.abs(n);
  const strip = (x: number): string => x.toFixed(1).replace(/\.0$/, '');
  if (abs >= 1e9) { return strip(n / 1e9) + 'B'; }
  if (abs >= 1e6) { return strip(n / 1e6) + 'M'; }
  if (abs >= 1e3) { return strip(n / 1e3) + 'K'; }
  const isWhole = (n % 1) === 0;
  return String(formatNumber(n, isWhole ? 0 : 1));
}

// Render any cell value (string, number, boolean, null, lookup object) as text.
export function cellText(v: unknown): string {
  if (v === null || v === undefined) { return ''; }
  if (typeof v === 'number') { return String(formatNumber(v, 2)); }
  if (typeof v === 'boolean') { return v ? 'Yes' : 'No'; }
  if (typeof v === 'object') {
    const o = v as { Title?: string; Label?: string };
    return o.Title || o.Label || '';
  }
  return String(v);
}

export function isNumericValue(v: unknown): boolean {
  return typeof v === 'number' || (typeof v === 'string' && v !== '' && !isNaN(Number(v)));
}
