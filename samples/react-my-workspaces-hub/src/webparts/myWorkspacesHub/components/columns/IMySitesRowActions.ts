import { ISiteInfo } from '../../../../common/types';

export interface IMySitesRowActions {
  /** Open the Lists & Libraries drawer for a site. */
  onOpenContent: (site: ISiteInfo) => void;
  /** Open the storage / lifecycle details drawer. */
  onDetails: (site: ISiteInfo) => void;
  /** Open the owners / members drawer (group-connected sites only). */
  onMembership: (site: ISiteInfo) => void;
  /** Follow or unfollow the site for the current user. */
  onToggleFollow: (site: ISiteInfo) => void;
  /** Whether the current user already follows the site. */
  isFollowed: (site: ISiteInfo) => boolean;
  /** Colour applied to the star icon on followed sites. */
  followedStarColor: string;
  /** Local portal host for row menus, scoped to the web part. */
  menuMountNode?: HTMLElement;
  /** Currently-open row menu id, used to hide underlying row triggers. */
  openMenuId?: string;
  /** Track row menu open state. */
  onMenuOpenChange: (siteId: string, open: boolean) => void;
  /** Feature toggles controlling which actions are shown. */
  features: {
    siteContent: boolean;
    follow: boolean;
    membership: boolean;
  };
}
