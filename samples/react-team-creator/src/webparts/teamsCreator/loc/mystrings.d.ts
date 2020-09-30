declare interface ITeamsCreatorWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TeamNameLabel: string;
  TeamDescriptionLabel: string;
  Owners: string;
  Members: string;
  CreateChannel: string;
  ChannelName: string;
  ChannelDescription: string;
  AddTab: string;
  TabName: string;
  App: string;
  Welcome: string;
  Create: string;
  Clear: string;
  CreatingGroup: string;
  CreatingTeam: string;
  CreatingChannel: string;
  InstallingApp: string;
  CreatingTab: string;
  Error: string;
  Success: string;
  StartOver: string;
  OpenTeams: string;
}

declare module 'TeamsCreatorWebPartStrings' {
  const strings: ITeamsCreatorWebPartStrings;
  export = strings;
}
