import { MAX_DAYS_AHEAD, MAX_DAYS_BACK, MAX_SOURCES, ISiteCalendarSource, ISourceValidation } from '../models/Configuration';

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizePath(path: string): string {
  const trimmed = path.replace(/\/{2,}/g, '/').replace(/\/$/, '');
  return trimmed || '/';
}

export function validateSiteSources(input: string | string[], currentSiteUrl: string, maxSources: number = MAX_SOURCES): ISourceValidation {
  const lines = (Array.isArray(input) ? input : input.split(/[\r\n]+/))
    .map(value => value.trim())
    .filter(Boolean);
  const errors: string[] = [];
  const sources: ISiteCalendarSource[] = [];
  const current = new URL(currentSiteUrl);
  const seen = new Set<string>();

  if (lines.length > maxSources) {
    errors.push(`A maximum of ${maxSources} calendar sources is supported.`);
  }

  lines.slice(0, maxSources).forEach((line, index) => {
    const [urlText, groupIdText, ...extra] = line.split('|').map(value => value.trim());
    let url: URL;
    try {
      url = new URL(urlText);
    } catch (_) {
      errors.push(`源 ${index + 1} 不是有效 URL。`);
      return;
    }
    const key = `${url.origin}${normalizePath(url.pathname)}`.toLowerCase();
    if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== current.hostname.toLowerCase()) {
      errors.push(`源 ${index + 1} 必须使用当前租户的 HTTPS SharePoint 主机。`);
      return;
    }
    if (!/^\/(sites|teams)(\/|$)/i.test(url.pathname) || url.search || url.hash || extra.length > 0) {
      errors.push(`源 ${index + 1} 必须是 /sites 或 /teams 下的纯站点 URL。`);
      return;
    }
    if (!groupIdText || !GUID.test(groupIdText)) {
      errors.push(`源 ${index + 1} 需要有效的 Microsoft 365 group ID（格式：siteUrl|groupId）。`);
      return;
    }
    if (seen.has(key)) {
      errors.push(`源 ${index + 1} 与前面的源重复。`);
      return;
    }
    seen.add(key);
    sources.push({ siteUrl: `${url.origin}${normalizePath(url.pathname)}`, groupId: groupIdText, label: url.pathname.split('/').pop() || url.hostname });
  });

  return { sources, errors };
}

export function clampDays(value: number | undefined, fallback: number, maximum: number): number {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? Math.min(Math.max(Math.round(numberValue), 0), maximum) : fallback;
}

export function safeRangeSettings(daysBack?: number, daysAhead?: number): { daysBack: number; daysAhead: number } {
  return {
    daysBack: clampDays(daysBack, 7, MAX_DAYS_BACK),
    daysAhead: clampDays(daysAhead, 30, MAX_DAYS_AHEAD)
  };
}
