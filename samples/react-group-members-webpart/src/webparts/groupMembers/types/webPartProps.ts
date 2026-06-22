export interface IGroupMembersWebPartProps {
  showAdmins: boolean;
  showMembers: boolean;
  showVisitors: boolean;
  itemsPerPage: number;
  sortField: string;
  showSearchBox: boolean;
  showPresenceIndicator: boolean;
  adminLabel: string;
  memberLabel: string;
  visitorLabel: string;
}
