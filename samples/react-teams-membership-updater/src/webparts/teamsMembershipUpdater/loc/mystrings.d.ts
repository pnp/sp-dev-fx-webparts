declare interface ITeamsMembershipUpdaterWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  LoglistFieldLabel: string;
  LoglistDescription: string;
  loadingTeams: string;
  loadingTeamsDescription: string;
  doneText: string;
  doneHistory: string;
  loadingMembersLabel: string;
  loadingMembersDescription: string;
  comparingMembers: string;
  comparingMembersDescription: string;
  removingOrphend: string;
  removingOrphendDescription: string;
  addingNew: string;
  addingNewDescription: string;
  logging: string;
  loggingDescription: string;
  selectTeam: string;
  selectTeamPlacehold: string;
  checkingOwner: string;
  checkingOwnerDescription: string;
  selectFile: string;
  selectFileLabel: string;
  emailColumn: string;
  emailColumnPlaceholder: string;
  submitButton: string;
  orphanedMembersTitle: string;
  orphanedMembersContent: string;
  on: string;
  off: string;
  selectChannel: string;
  selectChannelPlaceholder: string;
  noChannel: string;
}

declare module 'TeamsMembershipUpdaterWebPartStrings' {
  const strings: ITeamsMembershipUpdaterWebPartStrings;
  export = strings;
}
