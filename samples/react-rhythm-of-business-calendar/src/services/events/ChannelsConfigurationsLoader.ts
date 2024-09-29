// import { ErrorHandler } from "common";
// import { PagedViewLoader, IListItemResult, SPField, IUpdateListItem, ErrorDiagnosis } from "common/sharepoint";
// import { ISharePointService, ILiveUpdateService, ITimeZoneService } from "common/services";
// import {ChannelsConfigurations } from "model";
// import { IRhythmOfBusinessCalendarSchema } from "schema";
// import { RefinerValueLoader } from "./RefinerValueLoader";
// import { decode } from "he";

// interface IChannelsConfigurationsListItemResult extends IListItemResult {
//     ChannelName: SPField.Query_Text;
//     TeamsId: SPField.Query_TextMultiLine;
//     ChannelId: SPField.Query_TextMultiLine;
//     TeamsName:SPField.Query_Text;
//     ActualChannelName:SPField.Query_Text; 
// }

// interface IChannelsConfigurationsUpdateListItem extends IUpdateListItem {
//     ChannelName: SPField.Update_Text;
//     TeamsId: SPField.Update_TextMultiLine;
//     ChannelId: SPField.Update_TextMultiLine;
//     TeamsName: SPField.Update_Text;
//     ActualChannelName:SPField.Update_Text;
    
// }

// const toChannelsConfigurations = async (row: IChannelsConfigurationsListItemResult, channelsConfigurations: ChannelsConfigurations, refinerValueLoader: RefinerValueLoader): Promise<void> => {
//     channelsConfigurations.title = row.Title;
//     channelsConfigurations.channelName = decode(row.ChannelName);
//     channelsConfigurations.teamsId = decode(row.TeamsId);
//     channelsConfigurations.channelId= decode(row.ChannelId);
//     channelsConfigurations.teamsName = decode(row.TeamsName);
//     channelsConfigurations.actualChannelName = decode(row.ActualChannelName);
// };

// const toUpdateListItem = (channelsConfigurations: ChannelsConfigurations): IChannelsConfigurationsUpdateListItem => {
//     return {
//         Title: channelsConfigurations.title,
//         ChannelName: channelsConfigurations.channelName,
//         TeamsId: channelsConfigurations.teamsId,
//         ChannelId: channelsConfigurations.channelId,
//         TeamsName : channelsConfigurations.teamsName,
//         ActualChannelName: channelsConfigurations.actualChannelName
//     };
// };

// export class ChannelsConfigurationsLoader extends PagedViewLoader<ChannelsConfigurations> {
//     constructor(schema: IRhythmOfBusinessCalendarSchema, timezones: ITimeZoneService, spo: ISharePointService, liveUpdate: ILiveUpdateService, private readonly _refinerValueLoader: RefinerValueLoader) {
//         super({ ctor: ChannelsConfigurations, view: schema.channelsConfigurationsList.view_AllChannelsConfigurations, timezones, spo, liveUpdate, fastLoad: { useCache: true } });

//         _refinerValueLoader.registerDependency(this);
//     }

//   //  protected readonly extractReferencedUsers = (approver: Approvers) => [...approver.users];
//     protected readonly toEntity = (row: IChannelsConfigurationsListItemResult, entity: ChannelsConfigurations) => toChannelsConfigurations(row, entity, this._refinerValueLoader);
//     protected readonly updateListItem = toUpdateListItem;
//     protected readonly diagnosePersistError = (error: any) => ErrorHandler.is_412_PRECONDITION_FAILED(error) ? ErrorDiagnosis.Propogate : ErrorDiagnosis.Critical;
// }