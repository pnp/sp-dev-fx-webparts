/**
 * Logical classification of a SharePoint site/web surfaced for the current user.
 */
export enum SiteType {
  TeamSite = 'TeamSite',
  GroupTeamSite = 'GroupTeamSite',
  CommunicationSite = 'CommunicationSite',
  HubSite = 'HubSite',
  Subsite = 'Subsite',
  Other = 'Other'
}

/** Human-friendly labels rendered in the list view Type column. */
export const SITE_TYPE_LABELS: Record<SiteType, string> = {
  [SiteType.TeamSite]: 'Team site',
  [SiteType.GroupTeamSite]: 'Group site',
  [SiteType.CommunicationSite]: 'Communication site',
  [SiteType.HubSite]: 'Hub site',
  [SiteType.Subsite]: 'Subsite',
  [SiteType.Other]: 'Other'
};
