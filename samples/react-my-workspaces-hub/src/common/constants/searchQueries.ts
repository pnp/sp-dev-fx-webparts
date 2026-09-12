/**
 * Managed properties requested for each site/web search row.
 * `contentclass` distinguishes site collections (STS_Site) from webs (STS_Web).
 */
export const SITE_SELECT_PROPERTIES: readonly string[] = [
  'Title',
  'Description',
  'Path',
  'OriginalPath',
  'SPSiteURL',
  'SPWebUrl',
  'SiteID',
  'WebId',
  'GroupId',
  'RelatedGroupId',
  'SiteGroup',
  'IsHubSite',
  'SiteLogo',
  'WebTemplate',
  'contentclass',
  'Author',
  'Created',
  'LastModifiedTime'
];

/** Base predicate: real SP sites/webs, excluding personal OneDrive (SPSPERS) sites. */
export const SITES_BASE_PREDICATE =
  '(contentclass:STS_Site OR contentclass:STS_Web) AND -WebTemplate:SPSPERS*';

/**
 * GroupId wildcard scan matching any Microsoft 365 group-connected site.
 * Built from a..z + 0..9 so every possible GUID first character is covered.
 */
export const GROUP_ID_WILDCARD: string = 'abcdefghijklmnopqrstuvwxyz0123456789'
  .split('')
  .map((c) => `GroupId:${c}*`)
  .join(' OR ');

/**
 * Compose the full KQL query for the current user's sites.
 * @param searchText optional free-text term matched against Title.
 */
export function buildSitesQuery(searchText?: string): string {
  const trimmed = searchText ? searchText.trim() : '';
  const term = trimmed.length > 0 ? ` Title:${trimmed}*` : '';
  return `${SITES_BASE_PREDICATE}${term}`;
}
