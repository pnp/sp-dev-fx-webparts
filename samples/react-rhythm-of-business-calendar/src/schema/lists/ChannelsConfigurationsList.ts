// import { IListDefinition, FieldType, IViewDefinition, ITextFieldDefinition, includeStandardViewFields, ListTemplateType, RoleOperation, RoleType } from "common/sharepoint";
// import { Defaults } from "../Defaults";

// const Field_ChannelName: ITextFieldDefinition = {
//     type: FieldType.Text,
//     name: 'ChannelName',
//     displayName: 'Channel Name'
// };

// const Field_TeamsId: ITextFieldDefinition = {
//     type: FieldType.Text,
//     name: 'TeamsId',
//     displayName: 'Teams Id',
//     multi: true
// };

// const Field_ChannelId: ITextFieldDefinition = {
//     type: FieldType.Text,
//     name: 'ChannelId',
//     displayName: 'Channel Id',
//     multi: true
// };

// const Field_TeamsName: ITextFieldDefinition = {
//     type: FieldType.Text,
//     name: 'TeamsName',
//     displayName: 'Teams Name'
// };

// const Field_ActualChannelName: ITextFieldDefinition = {
//     type: FieldType.Text,
//     name: 'ActualChannelName',
//     displayName: 'Actual Channel Name'
// };

// const View_AllChannelsConfigurations: IViewDefinition = {
//     title: "AllChannelsConfigurations",
//     rowLimit: 250,
//     paged: true,
//     default: true,
//     fields: includeStandardViewFields(
//         Field_ChannelName,
//         Field_TeamsId,
//         Field_ChannelId,
//         Field_TeamsName,
//         Field_ActualChannelName
//     )
// };

// export interface IChannelsConfigurationsListDefinition extends IListDefinition {
//     view_AllChannelsConfigurations: IViewDefinition;
// }

// export const ChannelsConfigurationsList: IChannelsConfigurationsListDefinition = {
//     title: Defaults.ListTitles.ChannelsConfigurations,
//     description: '',
//     template: ListTemplateType.GenericList,
//     dependencies: [],
//     permissions: {
//         copyRoleAssignments: false,
//         userRoles: [
//             { operation: RoleOperation.Add, roleType: RoleType.Administrator, userType: 'ownerGroup' },
//             { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'memberGroup' },
//             { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'visitorGroup' }
//         ]
//     },
//     fields: [
//         Field_ChannelName,
//         Field_TeamsId,
//         Field_ChannelId,
//         Field_TeamsName,
//         Field_ActualChannelName
//     ],
//     views: [
//         View_AllChannelsConfigurations
//     ],
//     view_AllChannelsConfigurations: View_AllChannelsConfigurations
// };