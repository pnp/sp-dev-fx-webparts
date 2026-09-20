import { ISiteInfo } from '../types/ISiteInfo';
import { SiteType, SITE_TYPE_LABELS } from '../types/SiteType';
import {
  IAnalyticsViewModel,
  ICategoryCount,
  ITopSite,
  ITrendPoint
} from '../types/IAnalytics';

const RECENT_WINDOW_DAYS = 30;
const TREND_MONTHS = 12;
const TOP_SITES_LIMIT = 5;
type DateInput = Date | string | undefined;

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function toDate(value: DateInput): Date | undefined {
  if (!value) {
    return undefined;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function buildByType(sites: ISiteInfo[]): ICategoryCount[] {
  const buckets = new Map<SiteType, ICategoryCount>();
  for (const site of sites) {
    let bucket = buckets.get(site.type);
    if (!bucket) {
      bucket = { type: site.type, label: SITE_TYPE_LABELS[site.type], count: 0, withTeam: 0 };
      buckets.set(site.type, bucket);
    }
    bucket.count += 1;
    if (site.hasTeam) {
      bucket.withTeam += 1;
    }
  }
  return Array.from(buckets.values()).sort((a, b) => b.count - a.count);
}

function buildTrend(sites: ISiteInfo[]): ITrendPoint[] {
  const now = new Date();
  const points: ITrendPoint[] = [];
  const index = new Map<string, ITrendPoint>();

  for (let offset = TREND_MONTHS - 1; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const point: ITrendPoint = { period: monthKey(date), date, count: 0 };
    points.push(point);
    index.set(point.period, point);
  }

  for (const site of sites) {
    const modified = toDate(site.lastModified) ?? toDate(site.created);
    if (!modified) {
      continue;
    }
    const point = index.get(monthKey(modified));
    if (point) {
      point.count += 1;
    }
  }

  return points;
}

function buildTopSites(sites: ISiteInfo[]): ITopSite[] {
  return sites
    .map((site) => ({
      id: site.id,
      title: site.title,
      typeLabel: site.typeLabel,
      url: site.url,
      lastModified: toDate(site.lastModified as Date | string | undefined)
    }))
    .filter((site): site is ITopSite & { lastModified: Date } => site.lastModified !== undefined)
    .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
    .slice(0, TOP_SITES_LIMIT);
}

/**
 * Pure, in-memory aggregation of the user's sites into render-ready analytics.
 * No network calls — derives everything from the already-loaded {@link ISiteInfo}[].
 */
export class AnalyticsService {
  public static build(sites: ISiteInfo[]): IAnalyticsViewModel {
    const recentCutoff = Date.now() - RECENT_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    let withTeam = 0;
    let hubSites = 0;
    let recentlyModified = 0;

    for (const site of sites) {
      if (site.hasTeam) {
        withTeam += 1;
      }
      if (site.isHubSite) {
        hubSites += 1;
      }
      const modified = toDate(site.lastModified);
      if (modified && modified.getTime() >= recentCutoff) {
        recentlyModified += 1;
      }
    }

    return {
      total: sites.length,
      withTeam,
      hubSites,
      recentlyModified,
      byType: buildByType(sites),
      trend: buildTrend(sites),
      topSites: buildTopSites(sites)
    };
  }
}
