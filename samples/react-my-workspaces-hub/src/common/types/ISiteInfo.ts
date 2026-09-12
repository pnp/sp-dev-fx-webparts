import { SiteType } from './SiteType';

/**
 * Normalized view-model for a single site/web shown in the list.
 * Only `title`, `description` and `type` are rendered by default; the rest
 * is loaded on demand by the detail/content panels.
 */
export interface ISiteInfo {
  /** Stable unique key (siteId:webId, falling back to url). */
  id: string;
  title: string;
  description: string;
  type: SiteType;
  typeLabel: string;
  url: string;
  siteId?: string;
  webId?: string;
  groupId?: string;
  isHubSite: boolean;
  hasTeam: boolean;
  template?: string;
  author?: string;
  created?: Date;
  lastModified?: Date;
  logoUrl?: string;
}
