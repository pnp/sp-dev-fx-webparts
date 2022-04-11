declare interface IGroupMembersWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'GroupMembersWebPartStrings' {
  const strings: IGroupMembersWebPartStrings;
  export = strings;
}
