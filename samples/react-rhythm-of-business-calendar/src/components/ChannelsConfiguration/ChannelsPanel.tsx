// import React from 'react';
// import { FocusZone, ICommandBarItemProps, IDropdownOption, Text } from "@fluentui/react";
// import { Entity, ErrorHandler } from 'common';
// import { EntityPanelBase, IEntityPanelProps, IDataPanelBaseState, ResponsiveGrid, GridRow, GridCol, IDataPanelBase, LiveTextField, LiveText} from "common/components";
// import { ChannelsConfigurations, Refiner, RefinerValue } from "model";
// import { withServices, ServicesProp, EventsServiceProp, EventsService } from 'services';
// import { ListItemTechnicals } from '../shared';

// import { PersistConcurrencyFailureMessage, ChannelsPanel as strings } from "ComponentStrings";

// import styles from '../approvals/ApproversPanel.module.scss';

// export interface IChannelsPanel extends IDataPanelBase<ChannelsConfigurations> {
// }

// interface IOwnProps {
//     sendDataToParent?: (data: boolean) => void;
//     isTeamsMessageRequired?:boolean;
// }
// type IProps = IOwnProps & IEntityPanelProps<ChannelsConfigurations> & ServicesProp<EventsServiceProp>;

// interface IOwnState {
//     refinerValueOptionsByRefiner?: Map<Refiner, IDropdownOption[]>;
//     refiners?: readonly Refiner[];
//     dataToSend?: boolean;
// }
// type IState = IOwnState & IDataPanelBaseState<ChannelsConfigurations>;

// class ChannelsPanel extends EntityPanelBase<ChannelsConfigurations, IProps, IState> implements IChannelsPanel {

//     handleButtonClick = () => {
//         // Call the function passed from the parent and pass the data
//         this.props.sendDataToParent(this.state.dataToSend);
//     };

//     protected get title() {
//         return '';
//     }

//     protected resetState(): IState {
//         this._buildRefinerValueOptions();

//         return {
//             ...super.resetState(),
//             refinerValueOptionsByRefiner: new Map(),
//             refiners: [],
//             dataToSend: this.props.isTeamsMessageRequired ? this.props.isTeamsMessageRequired : false
//         };
//     }

//     public componentShouldRender() {
//         super.componentShouldRender();
//         this._buildRefinerValueOptions();
//     }

//     private async _buildRefinerValueOptions() {
//         const { [EventsService]: { refinersAsync } } = this.props.services;

//         await refinersAsync.promise;

//         const refiners = [...refinersAsync.data];
//         refiners.sort(Refiner.OrderAscComparer);

//         const refinerValueOptionsByRefiner = new Map<Refiner, IDropdownOption[]>();
//         for (const refiner of refiners) {
//             const options: IDropdownOption[] = refiner.values.filter(Entity.NotDeletedFilter).map((value: RefinerValue) => {
//                 const { key, displayName: text } = value;
//                 return { key, text, data: value } as IDropdownOption;
//             });

//             refinerValueOptionsByRefiner.set(refiner, options);
//         }

//         this.setState({ refinerValueOptionsByRefiner, refiners });
//     }

//     protected async persistChangesCore() {
//         const { [EventsService]: events } = this.props.services;
//         let _teamsName = "";
//         let _actualChannelName = "";
//         try{
//              _teamsName = await events.getTeamsNameById(this.entity.teamsId);
//              _actualChannelName = await events.getActualChannelNameById(this.entity.teamsId,this.entity.channelId);
//              this.setState({
//                 dataToSend:false
//              });
//         } catch (ex) {
//              _teamsName = "";
//              _actualChannelName = "";
//              this.setState({
//                 dataToSend:true
//              });
//         }

//         try {
//             this.entity.teamsName = _teamsName;
//             this.entity.actualChannelName = _actualChannelName;
//             events.track(this.entity);
//             await events.persist();
//         } catch (e) {
//             if (ErrorHandler.is_412_PRECONDITION_FAILED(e)) {
//                 const message = await ErrorHandler.message(e);
//                 console.warn(message, e);
//                 return Promise.reject(PersistConcurrencyFailureMessage);
//             } else {
//                 throw e;
//             }
//         }
//     }

//     private channelDescription(): JSX.Element {
//         return <>
//             <Text tabIndex={0}>The steps to get the Teams Id and Channel Id are given below : </Text>
//             <Text block tabIndex={0}>
//                 <ul>                  
//                     <li>Click on the three dots near the channel name within Microsoft Teams.</li>
//                     <li>Select 'Get a link to the channel' and copy the link.</li>
//                     <li>Select the <b>'groupId'</b> value from the copied link and paste it for the teams id field.</li>       
//                     <li>Next copy the text starting after the <b>'channel/'</b> from the copied link and select till the <b>'.tacv2'</b>.</li>
//                     <li>Now paste the link within the channel id field.</li>

//                 </ul>
//             </Text>
//         </>;
//     }

//     protected renderDisplayContent(): JSX.Element {
//         const entity = this.entity;
//         const liveProps = {
//             entity
//         };

//         return (
//             <FocusZone>
//                 <ResponsiveGrid className={styles.content}>
//                     <GridRow>
//                         <GridCol>
//                             <LiveText label={strings.Field_ChannelName_DisplayMode.Label} {...liveProps} propertyName="channelName" />
//                         </GridCol>
//                     </GridRow>
//                     <GridRow>
//                         <GridCol>
//                             <LiveText label={strings.Field_TeamsId_DisplayMode.Label} {...liveProps} propertyName="teamsId" />
//                         </GridCol>
//                     </GridRow>
//                     <GridRow>
//                         <GridCol>
//                             <LiveText label={strings.Field_ChannelId_DisplayMode.Label} {...liveProps} propertyName="channelId" />
//                         </GridCol>
//                     </GridRow>
//                     <GridRow>
//                         <GridCol>
//                             <LiveText label={strings.Field_TeamsName_DisplayMode.Label} {...liveProps} propertyName="teamsName" />
//                         </GridCol>
//                     </GridRow>
//                     <GridRow>
//                         <GridCol>
//                             <LiveText label={strings.Field_ActualChannelName_DisplayMode.Label} {...liveProps} propertyName="actualChannelName" />
//                         </GridCol>
//                     </GridRow>
//                     <br />
//                     <GridRow>
//                         <GridCol sm={12}>
//                             {this.channelDescription()}
//                         </GridCol>
//                     </GridRow>
//                     <GridRow>
//                         <GridCol sm={12}>
//                             <ListItemTechnicals entity={this.entity} />
//                         </GridCol>
//                     </GridRow>
//                 </ResponsiveGrid>
//             </FocusZone>
//         );
//     }

//     protected renderEditContent(): JSX.Element {
//         const { showValidationFeedback } = this.state;
//         const entity = this.entity;
//         const liveProps = {
//             entity,
//             showValidationFeedback,
//             updateField: this.updateField,
//             hideIcon:true
//         };

//         return (
//             <ResponsiveGrid className={styles.content}>
//                 <GridRow>
//                     <GridCol sm={12}>
//                         <LiveTextField
//                             {...liveProps}
//                             label={strings.Field_ChannelName_EditMode.Label}
//                             propertyName="channelName"
//                             autoFocus={entity.isNew}
//                             required
//                             maxLength={255}
//                             rules={ChannelsConfigurations.ChannelNameValidations}
//                         />
//                     </GridCol>
//                 </GridRow>
//                 <GridRow>
//                     <GridCol sm={12}>
//                         <LiveTextField
//                             {...liveProps}
//                             label={strings.Field_TeamsId_EditMode.Label}
//                             propertyName="teamsId"
//                             autoFocus={entity.isNew}
//                             required
//                             maxLength={255}
//                             rules={ChannelsConfigurations.TeamsIdValidations}
//                         />
//                     </GridCol>
//                 </GridRow>
//                 <GridRow>
//                     <GridCol sm={12}>
//                         <LiveTextField
//                             {...liveProps}
//                             label={strings.Field_ChannelId__EditMode.Label}
//                             propertyName="channelId"
//                             autoFocus={entity.isNew}
//                             required
//                             maxLength={255}
//                             rules={ChannelsConfigurations.ChannelIdValidations}
//                         />
//                     </GridCol>
//                 </GridRow>  
//                 <br />
//                 <GridRow>
//                     <GridCol sm={12}>
//                         {this.channelDescription()}
//                     </GridCol>
//                 </GridRow>                       
//                 <GridRow>
//                     <GridCol sm={12}>
//                         <ListItemTechnicals entity={this.entity} />
//                     </GridCol>
//                 </GridRow>
//             </ResponsiveGrid>
//         );
//     }

//     protected buildDisplayHeaderCommands(): ICommandBarItemProps[] {
//         const onEdit = () => { this.edit(); };

//         return [{
//             key: 'edit',
//             text: strings.Command_Edit.Text,
//             iconProps: { iconName: 'Edit' },
//             onClick: onEdit
//         }];
//     }

//     protected buildEditHeaderCommands(): ICommandBarItemProps[] {
//         const { submitting } = this.state;
//         const { isDeleted } = this.entity;
//         const onSubmit = () => this.submit(() => {
//             this.handleButtonClick();
//             this.dismiss();
//         });
//         const onConfirmDiscard = () => this.confirmDiscard();
//         const onDelete = () => this.confirmDelete();

//         return [{
//             key: 'save',
//             text: strings.Command_Save.Text,
//             iconProps: { iconName: 'Save' },
//             disabled: submitting,
//             onClick: onSubmit
//         }, {
//             key: 'discard',
//             text: strings.Command_Discard.Text,
//             iconProps: { iconName: 'Cancel' },
//             onClick: onConfirmDiscard
//         }, {
//             key: 'delete',
//             text: strings.Command_Delete.Text,
//             iconProps: { iconName: 'Delete' },
//             disabled: isDeleted,
//             onClick: onDelete
//         }];
//     }
// }

// export default withServices(ChannelsPanel);