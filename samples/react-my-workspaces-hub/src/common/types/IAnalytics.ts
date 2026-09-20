import { SiteType } from './SiteType';

/** Count of sites in one {@link SiteType} bucket (with team-connected subset). */
export interface ICategoryCount {
  type: SiteType;
  label: string;
  count: number;
  withTeam: number;
}

/** A single point on the activity trend (one calendar month). */
export interface ITrendPoint {
  /** ISO `YYYY-MM` key. */
  period: string;
  /** First day of the month. */
  date: Date;
  count: number;
}

/** A site row surfaced in the "most recently modified" chart. */
export interface ITopSite {
  id: string;
  title: string;
  typeLabel: string;
  url: string;
  lastModified?: Date;
}

/** Aggregated, render-ready analytics derived from the user's sites. */
export interface IAnalyticsViewModel {
  total: number;
  withTeam: number;
  hubSites: number;
  recentlyModified: number;
  byType: ICategoryCount[];
  trend: ITrendPoint[];
  topSites: ITopSite[];
}
