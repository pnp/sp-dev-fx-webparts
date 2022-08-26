declare interface IGroupMembershipManagerWebPartStrings {
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  LoadingGroups: string;
  PickGroup: string;
  DisplayName: string;
  GroupTypes: string;
  Visibility: string;
  SecurityEnabled: string;
  LoadingMembers: string;
  LoadingOwners: string;
  Owners: string;
  Members: string;
  Add: string;
  Remove: string;
  AddDialogTitle: string;
  AddDialogTitleOwner: string;
  Close: string;
  Search: string;
  SearchPlaceholder: string;
  Retry: string;
  Adding: string;
  Added: string;
  Removing: string;
  Removed: string;
  RemoveDialogTitle: string;
  RemoveDialogTitleOwner: string;
}

declare module 'GroupMembershipManagerWebPartStrings' {
  const strings: IGroupMembershipManagerWebPartStrings;
  export = strings;
}
