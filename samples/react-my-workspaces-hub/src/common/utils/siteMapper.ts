import { ISiteInfo } from '../types/ISiteInfo';
import { SiteType, SITE_TYPE_LABELS } from '../types/SiteType';

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

/** A raw search row is a flat bag of managed-property string values. */
export type SearchRow = Record<string, unknown>;

function str(row: SearchRow, key: string): string {
  const value = row[key];
  return value !== null && value !== undefined ? String(value) : '';
}

function hasGroup(groupId: string): boolean {
  return groupId.length > 0 && groupId !== EMPTY_GUID;
}

/** Classify a search row into a {@link SiteType}. */
export function resolveSiteType(row: SearchRow): SiteType {
  const template = str(row, 'WebTemplate');
  const contentClass = str(row, 'contentclass');
  const isHub = str(row, 'IsHubSite').toLowerCase() === 'true';

  if (isHub) {
    return SiteType.HubSite;
  }
  if (hasGroup(str(row, 'GroupId'))) {
    return SiteType.GroupTeamSite;
  }
  if (template.indexOf('SITEPAGEPUBLISHING') === 0) {
    return SiteType.CommunicationSite;
  }
  if (contentClass === 'STS_Web') {
    return SiteType.Subsite;
  }
  if (template.indexOf('STS') === 0) {
    return SiteType.TeamSite;
  }
  return SiteType.Other;
}

/** Map a single raw search row to the normalized {@link ISiteInfo} model. */
export function mapRowToSite(row: SearchRow): ISiteInfo {
  const type = resolveSiteType(row);
  const url = str(row, 'Path') || str(row, 'SPWebUrl') || str(row, 'OriginalPath');
  const siteId = str(row, 'SiteID');
  const webId = str(row, 'WebId');
  const groupId = str(row, 'GroupId');
  const created = str(row, 'Created');
  const modified = str(row, 'LastModifiedTime');
  const id = siteId || webId ? `${siteId}:${webId}` : url;

  return {
    id,
    title: str(row, 'Title') || url,
    description: str(row, 'Description'),
    type,
    typeLabel: SITE_TYPE_LABELS[type],
    url,
    siteId: siteId || undefined,
    webId: webId || undefined,
    groupId: hasGroup(groupId) ? groupId : undefined,
    isHubSite: str(row, 'IsHubSite').toLowerCase() === 'true',
    hasTeam: false,
    template: str(row, 'WebTemplate') || undefined,
    author: str(row, 'Author') || undefined,
    created: created ? new Date(created) : undefined,
    lastModified: modified ? new Date(modified) : undefined,
    logoUrl: str(row, 'SiteLogo') || undefined
  };
}

/** Map and de-duplicate a collection of raw search rows. */
export function mapRowsToSites(rows: SearchRow[]): ISiteInfo[] {
  const byKey = new Map<string, ISiteInfo>();
  for (const row of rows) {
    const site = mapRowToSite(row);
    if (!byKey.has(site.id)) {
      byKey.set(site.id, site);
    }
  }
  return Array.from(byKey.values());
}
