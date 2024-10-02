// import { intersection } from 'lodash';
// import { Moment } from 'moment-timezone';
// import { Guid } from '@microsoft/sp-core-library';
// import { groupBy, IManyToManyRelationship, ManyToManyRelationship, MaxLengthValidationRule, RequiredValidationRule, User, ValidationRule } from 'common';
// import { ListItemEntity } from "common/sharepoint";
// import { RefinerValue } from './RefinerValue';
// import { Refiner } from './Refiner';

// interface IState {
//     channelName: string;
//     teamsId: string;
//     channelId: string;
//     teamsName: string;
//     actualChannelName: string;
//     //channel_originalName: string;
// }

// export class ChannelsConfigurations extends ListItemEntity<IState> {
//     public static readonly ChannelNameValidations = [
//         new RequiredValidationRule<ChannelsConfigurations>(e => e.channelName),
//         new MaxLengthValidationRule<ChannelsConfigurations>(e => e.channelName, 255)
//     ];
//     public static readonly TeamsIdValidations = [
//         new RequiredValidationRule<ChannelsConfigurations>(e => e.teamsId),
//         new MaxLengthValidationRule<ChannelsConfigurations>(e => e.teamsId, 255)
//     ];
//     public static readonly ChannelIdValidations = [
//         new RequiredValidationRule<ChannelsConfigurations>(e => e.channelId),
//         new MaxLengthValidationRule<ChannelsConfigurations>(e => e.channelId, 255)
//     ];

//     // public static appliesTo(channelsConfigurations: ChannelsConfigurations, eventValuesByRefiner: Map<Refiner, RefinerValue[]>): boolean {
//     //     const { refinerValuesByRefiner: approverValuesByRefiner } = channelsConfigurations;
//     //     return [...approverValuesByRefiner.keys()].every(refiner => {
//     //         const approverValues = approverValuesByRefiner.get(refiner);
//     //         const eventValues = eventValuesByRefiner.get(refiner);
//     //         return intersection(approverValues, eventValues).length > 0;
//     //     });
//     // }

//     // public static appliesToAny(channelsConfigurations: ChannelsConfigurations[], eventValuesByRefiner: Map<Refiner, RefinerValue[]>): boolean {
//     //     return channelsConfigurations.some(a => ChannelsConfigurations.appliesTo(a, eventValuesByRefiner));
//     // }

//     constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
//         super(author, editor, created, modified, id, uniqueId, etag);

//         this.channelName = "";
//         this.teamsId = "";
//         this.channelId = "";
//         this.teamsName = "";
//         this.actualChannelName="";

//     }

//     public readonly refinerValues: IManyToManyRelationship<RefinerValue>;

//     private _refinerValuesByRefiner: Map<Refiner, RefinerValue[]> = undefined;
//     public get refinerValuesByRefiner() {
//         return (this._refinerValuesByRefiner = this._refinerValuesByRefiner ||
//             groupBy(this.refinerValues.get(), value => value.refiner.get())
//         );
//     }

//     // public hasChanges(specificProperty?: string | number | symbol): boolean {
//     //     if (specificProperty)
//     //         return super.hasChanges(specificProperty);
//     //     else
//     //         return super.hasChanges() || this.refinerValues.hasChanges();
//     // }

//     public immortalize() {
//         this._refinerValuesByRefiner = undefined;
//         super.immortalize();
//     }

//     public endLiveUpdate() {
//         this._refinerValuesByRefiner = undefined;
//         super.endLiveUpdate();
//     }



//     public get channelName(): string { return this.state.channelName; }
//     public set channelName(val: string) { this.state.channelName = val; }

//     public get teamsId(): string { return this.state.teamsId; }
//     public set teamsId(val: string) { this.state.teamsId = val; }

//     public get channelId(): string { return this.state.channelId; }
//     public set channelId(val: string) { this.state.channelId = val; }

//     public get teamsName(): string { return this.state.teamsName; }
//     public set teamsName(val: string) { this.state.teamsName = val; }

//     public get actualChannelName(): string { return this.state.actualChannelName; }
//     public set actualChannelName(val: string) { this.state.actualChannelName = val; }


//     protected validationRules(): ValidationRule<ChannelsConfigurations>[] {
//         return [
//             ...ChannelsConfigurations.ChannelNameValidations,
//             ...ChannelsConfigurations.TeamsIdValidations,
//             ...ChannelsConfigurations.ChannelIdValidations
//         ];
//     }
// }

// export type ChannelsConfigurationsMap = Map<number, ChannelsConfigurations>;
// export type ReadonlyChannelsConfigurationsMap = ReadonlyMap<number, ChannelsConfigurations>;