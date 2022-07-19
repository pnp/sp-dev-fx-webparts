declare interface IRoomChatWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
 TopicFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  ACSConnectStringFieldLabel:string;
ascConnectringErrorMessage: string;
BurttonLabelCancel: string;
ButtonLabelConfigure: string;
ButtonLabelJoin: string;
ConfigureMessageLabel: string;
DialogSubTitleLabel: string;
DialogTitleLabel: string;
EnterNameLabel: string;
LeaveChatLabel: string;
}

declare module 'RoomChatWebPartStrings' {
  const strings: IRoomChatWebPartStrings;
  export = strings;
}
