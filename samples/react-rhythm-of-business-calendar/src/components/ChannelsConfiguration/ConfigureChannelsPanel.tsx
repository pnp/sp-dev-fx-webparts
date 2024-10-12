// import { isEqual } from "lodash";
// import React, { Component, createRef, MutableRefObject, ReactNode, RefObject } from "react";
// import { CheckboxVisibility, CommandBar, ConstrainMode, DetailsList, DetailsListLayoutMode, IColumn, IContextualMenuItem, MessageBar, MessageBarType, Panel, PanelType, Selection, SelectionMode, Text } from "@fluentui/react";
// import { Entity, humanizeFixedList, IAsyncData, multifilter } from "common";
// import { AsyncDataComponent } from "common/components";
// import { Approvers, ChannelsConfigurations, Refiner } from "model";
// import { EventsService, EventsServiceProp, ServicesProp, TeamsJs, withServices } from "services";
// import ChannelsPanel, { IChannelsPanel } from "./ChannelsPanel";

// import { ConfigureChannelsPanel as strings } from "ComponentStrings";

// export interface IConfigureChannelsPanel {
//     open: () => void;
//     close: () => void;
// }

// interface IOwnProps {
//     componentRef?: RefObject<IConfigureChannelsPanel>;
// }
// type IProps = IOwnProps & ServicesProp<EventsServiceProp>;

// interface IState {
//     hidden: boolean;
//     channelsConfigurationsAsync: IAsyncData<readonly ChannelsConfigurations[]>;
//     refinersAsync: IAsyncData<readonly Refiner[]>;
//     isTeamsMessageRequired: boolean;
// }

// class ConfigureChannelsPanel extends Component<IProps, IState> implements IConfigureChannelsPanel {
//     private readonly _channelsPanel = createRef<IChannelsPanel>();
//     private readonly _selection: Selection<ChannelsConfigurations>;

//     constructor(props: IProps) {
//         super(props);

//         const {
//             [EventsService]: { channelsConfigurationsAsync, refinersAsync }
//         } = this.props.services;

//         this.state = {
//             hidden: true,
//             channelsConfigurationsAsync,
//             refinersAsync,
//             isTeamsMessageRequired: false
//         };

//         this._selection = new Selection<ChannelsConfigurations>({
//             onSelectionChanged: () => this.setState({}),
//             items: []
//         });
//     }

//     handleDataFromChild = (data:boolean) => {
//         this.setState({ isTeamsMessageRequired: data });
//     };
    

//     public componentDidMount() {
//         (this.props.componentRef as MutableRefObject<IConfigureChannelsPanel>).current = this;
//     }

//     public componentWillUnmount(): void {
//         (this.props.componentRef as MutableRefObject<IConfigureChannelsPanel>).current = null;
//     }

//     public readonly open = () =>
//         this.setState({ hidden: false })

//     public readonly close = () =>
//         this.setState({ hidden: true })

//     private readonly _viewApprovers = async () => {
//         try {
//            // const approvers = this._selection.getSelection()[0];
//            // await this._approversPanel.current.display(approvers);
//         } finally { this.forceUpdate(); }
//     }

//     private readonly _viewChannelsConfiguration = async () => {
//         try {
//             const channelsConfiguration = this._selection.getSelection()[0];
//             await this._channelsPanel.current.display(channelsConfiguration);
//         } finally { this.forceUpdate(); }
//     }

//     private readonly _newChannelsConfiguration = async () => {
//         try {
//             await this._channelsPanel.current.edit(new ChannelsConfigurations());
//         } finally { this.forceUpdate(); }
//     }

//     // Added this funtion to edit the channel configuration
//     private readonly _editChannelsConfiguration = async () => {
//         try {
//             const channelsConfiguration = this._selection.getSelection()[0];
//             await this._channelsPanel.current.edit(channelsConfiguration);
//         } finally { this.forceUpdate(); }
//     }

//     private readonly _getApproversKey = ({ key }: Approvers) => key;

//     private readonly _generateCommands = (selectedCount: number) => {
//         const addChannelsConfig: IContextualMenuItem = {
//             key: "add",
//             name: "New",
//             iconProps: { iconName: "Add" },
//             onClick: () => { this._newChannelsConfiguration(); }
//         };

//         const viewChannelsConfig: IContextualMenuItem = {
//             key: "view",
//             name: "View",
//             iconProps: { iconName: "View" },
//             disabled: selectedCount === 0,
//             onClick: () => { this._viewChannelsConfiguration(); }
//         };

//         const editChannelsConfig: IContextualMenuItem = {
//             key: "edit",
//             name: "Edit",
//             iconProps: { iconName: "Edit" },
//             disabled: selectedCount === 0,
//             onClick: () => { this._editChannelsConfiguration(); }
//         };

//         return {
//             near: [addChannelsConfig, viewChannelsConfig, editChannelsConfig]
//         };
//     }

//     private *_generateColumns(refiners?: readonly Refiner[]): Generator<IColumn> {
//         // yield {
//         //     key: 'title',
//         //     name: strings.Column_Title,
//         //     isRowHeader: true,
//         //     isResizable: true,
//         //     isMultiline: true,
//         //     fieldName: 'title'
//         // } as IColumn;

//         yield {
//             key: 'channelName',
//             name: strings.Column_ChannelName,
//             isRowHeader: true,
//             isResizable: true,
//             isMultiline: true,
//             flexGrow: 1,
//             minWidth: 100,
//             fieldName: 'channelName'
//         } as IColumn;

//         yield {
//             key: 'teamsId',
//             name: strings.Column_TeamsId,
//             isRowHeader: true,
//             isResizable: true,
//             isMultiline: true,
//             flexGrow: 1,
//             minWidth: 100,
//             fieldName: 'teamsId'
//         } as IColumn;

//         yield {
//             key: 'channelId',
//             name: strings.Column_ChannelId,
//             isRowHeader: true,
//             isResizable: true,
//             isMultiline: true,
//             flexGrow: 1,
//             minWidth: 100,
//             fieldName: 'channelId'
//         } as IColumn;

//         yield {
//             key: 'teamsName',
//             name: strings.Column_TeamsName,
//             isRowHeader: true,
//             isResizable: true,
//             isMultiline: true,
//             fieldName: 'teamsName'
//         } as IColumn;

//         yield {
//             key: 'actualChannelName',
//             name: strings.Column_ActualChannelName,
//             isRowHeader: true,
//             isResizable: true,
//             isMultiline: true,
//             fieldName: 'actualChannelName'
//         } as IColumn;

//     }

//     private _filteredAndSortdChannels: ChannelsConfigurations[] = [];
//     private _getFilteredAndSortedChannels(channelsConfigurations: readonly ChannelsConfigurations[]): ChannelsConfigurations[] {
//         const filteredAndSortdChannels = channelsConfigurations.filter(Entity.NotDeletedFilter).sort(Entity.DisplayNameAscComparer);
//         if (!isEqual(this._filteredAndSortdChannels, filteredAndSortdChannels)) {
//             this._filteredAndSortdChannels = filteredAndSortdChannels;
//             this._selection.setItems(filteredAndSortdChannels);
//         }
//         const hasTeamChannelBlankName = filteredAndSortdChannels.some(channel => !channel.teamsName.trim() || !channel.actualChannelName.trim());

//         if(hasTeamChannelBlankName && !this.state.isTeamsMessageRequired) {
           
//            this.setState({ isTeamsMessageRequired: true });
//         }

//         return this._filteredAndSortdChannels;
//     }


//     public render(): ReactNode {
//         const { [TeamsJs]: teams } = this.props.services;
//         const { hidden, channelsConfigurationsAsync, refinersAsync } = this.state;

//         const commands = this._generateCommands(this._selection.getSelectedCount());

//         return (
//             <AsyncDataComponent dataAsync={channelsConfigurationsAsync}>{channelsConfigurations =>
//                 <AsyncDataComponent dataAsync={refinersAsync}>{refiners => <>
//                     <Panel
//                         type={PanelType.large}
//                         isOpen={!hidden}
//                         isBlocking={false}
//                         isLightDismiss
//                         onDismiss={this.close}
//                         headerText={strings.HeaderText}
//                         closeButtonAriaLabel={strings.Command_Close.AriaLabel}
//                     >
//                         <CommandBar items={commands.near} />
//                         <DetailsList
//                             items={this._getFilteredAndSortedChannels(channelsConfigurations)}
//                             getKey={this._getApproversKey}
//                             columns={[...this._generateColumns(refiners)]}
//                             selection={this._selection}
//                             selectionMode={SelectionMode.single}
//                             layoutMode={DetailsListLayoutMode.fixedColumns}
//                             constrainMode={ConstrainMode.horizontalConstrained}
//                             checkboxVisibility={CheckboxVisibility.always}
//                             onItemInvoked={this._viewApprovers}
//                         />
//                         {this._filteredAndSortdChannels.length === 0 &&
//                             <Text block styles={{ root: { marginLeft: 60, marginBottom: 20 } }}>{strings.NoChannelsDefined}</Text>
//                         }
//                         {
                            
//                         }
//                         { this.state.isTeamsMessageRequired && <MessageBar messageBarType={MessageBarType.warning}>
//                             {strings.Message_Teams}
//                         </MessageBar>
//                         }
//                     </Panel>
//                     <ChannelsPanel
//                         hasCloseButton
//                         componentRef={this._channelsPanel}
//                         asyncWatchers={[channelsConfigurationsAsync]}
//                         sendDataToParent={this.handleDataFromChild}
//                         isTeamsMessageRequired={this.state.isTeamsMessageRequired}
//                     />
//                 </>}</AsyncDataComponent>
//             }</AsyncDataComponent>
//         );
//     }
// }

// export default withServices(ConfigureChannelsPanel);