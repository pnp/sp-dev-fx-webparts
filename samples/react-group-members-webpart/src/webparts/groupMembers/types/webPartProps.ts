export interface IGroupMembersWebPartProps {
  title: string;
  showOwners: boolean;
  showAdmins: boolean;
  showMembers: boolean;
  showVisitors: boolean;
  itemsPerPage: number;
  sortField: string;
  showSearchBox: boolean;
  showPresenceIndicator: boolean;
  ownerLabel: string;
  adminLabel: string;
  memberLabel: string;
  visitorLabel: string;
  showSummaryGrid?: boolean;
  showRolePivot?: boolean;
  showPageHeader?: boolean;
  pageHeaderTitle?: string;
  pageHeaderSubtitle?: string;
  showRoleLabels?: boolean;
  hideClaimsPrincipals?: boolean;
  showSectionBorders?: boolean;
  showCommandBar?: boolean;
  excludedPrincipals?: string;
}
