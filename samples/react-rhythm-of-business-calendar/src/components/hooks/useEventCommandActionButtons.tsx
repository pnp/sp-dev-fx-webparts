import React, { useMemo, useState } from "react";
import { ActionButton, PrimaryButton, DefaultButton, MessageBar, MessageBarType, Dropdown, IDropdownOption, IDropdownStyles } from "@fluentui/react";
import { IEvent } from "model";
import { IEventCommands } from "../events/IEventCommands";

import { EventCommands as strings } from 'ComponentStrings';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import styles from "./useEventCommandActionButtons.module.scss";
import {
    useConfigurationService
} from "services";

export const useEventCommandActionButtons = (commands: IEventCommands, event: IEvent | undefined) => {
    const { view, addToOutlook, addSeriesToOutlook, getLink, configEnableOutlook} = commands;
    const { isApproved, isSeriesMaster, isRecurring } = event || {};
    const canAddToOutlook = isApproved;
    const [linkShared,setLinkShared]= useState(false);
    const [isShared,setIsShared]= useState(false);
    //const [channelId, setChannelId] = useState("");
    const [groupId, setGroupId] = useState("");
    const [isSuccess,setIsSuccess]= useState(false);
    const [isError,setIsError]= useState(false);
    const [errorMessage,setErrorMessage]= useState("");
    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
    const [isSaveBtnEnable,setIsSaveBtnEnable]= useState(false);
    const { active: config } = useConfigurationService();
    const enableAddToOutlook = config && config.useAddToOutlook;

    const viewCommand = useMemo(() =>
        <ActionButton iconProps={{ iconName: "View" }} onClick={() => view(event)}>
            {strings.Command_View.Text}
        </ActionButton>,
        [event, view]
    );

    const addToOutlookSingleCommand = useMemo(() =>
        <ActionButton iconProps={{ iconName: "AddEvent" }} onClick={() => addToOutlook(event)}>
            {strings.Command_AddToOutlook.Text}
        </ActionButton>,
        [event, addToOutlook]
    );

    const addToOutlookSeriesCommand = useMemo(() =>
        <ActionButton iconProps={{ iconName: "AddEvent" }} onClick={() => addSeriesToOutlook(event)}>
            {strings.Command_AddToOutlook.Text}
        </ActionButton>,
        [event, addSeriesToOutlook]
    );

    const addToOutlookRecurringCommand = useMemo(() =>
        <ActionButton
            iconProps={{ iconName: "AddEvent" }}
            menuProps={{
                items: [{
                    key: 'add-to-outlook-series',
                    text: strings.Command_AddToOutlook_Recurring_Series.Text,
                    onClick: () => addSeriesToOutlook(event)
                }, {
                    key: 'add-to-outlook-occurrence',
                    text: strings.Command_AddToOutlook_Recurring_Instance.Text,
                    onClick: () => addToOutlook(event)
                }]
            }}
        >
            {strings.Command_AddToOutlook.Text}
        </ActionButton>,
        [event, addSeriesToOutlook, addToOutlook]
    );

    const addToOutlookCommand = useMemo(() =>
        enableAddToOutlook && canAddToOutlook && (
            isRecurring
                ? (isSeriesMaster
                    ? addToOutlookSeriesCommand
                    : addToOutlookRecurringCommand
                )
                : addToOutlookSingleCommand
        ),
        [canAddToOutlook, isRecurring, isSeriesMaster, addToOutlookRecurringCommand, addToOutlookSingleCommand, enableAddToOutlook]
    );

    const getLinkCommand = useMemo(() =>
        <ActionButton iconProps={{ iconName: "Link" }} onClick={() => getLink(event)}>
            {strings.Command_GetLink.Text}
        </ActionButton>,
        [event, getLink]
    );

    // const dialogContentProps = {
    //     type: DialogType.normal,
    //     title: 'Select a channel',
    //     closeButtonAriaLabel: 'Close',
    //     maxWidth: '100%',
    //     width: 'auto',
    //     showCloseButton: true
    // };
  
    // const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    //     setSelectedItem(item);
    //     setChannelId(item.key.toString());
    //     setGroupId(item.id);
    //     setIsSaveBtnEnable(true);
    // };

    // const on_Dismiss = (): void => {
    //     setLinkShared(false);
    //     setIsShared(false);
    //     setErrorMessage("");
    //     setSelectedItem(null);
    //     setChannelId("");
    //     setGroupId("");
    //     setIsSuccess(false);
    //     setIsError(false);
    //     setIsSaveBtnEnable(false);
    // };
    const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
     
    
    //enable to share event
    
    // const shareToTeams = useMemo(() =>   
    //     <Dialog
    //         hidden={!linkShared}
    //         onDismiss={on_Dismiss}
    //         dialogContentProps={dialogContentProps}
    //         maxWidth={540}
    //     >
    //        {!isSuccess && !isError ? (<div className={styles.container_message}></div>):null}
    //        {isSuccess ?
    //        <MessageBar messageBarType={MessageBarType.success}> Event details posted successfully! </MessageBar>:<div></div>}
           
    //        {isError ?
    //        <MessageBar messageBarType={MessageBarType.error}> Error: {errorMessage ? errorMessage:"Please check access"} </MessageBar>:<div></div>}         

    //         <Dropdown
    //             label="Select one"
    //             selectedKey={selectedItem ? selectedItem.key : undefined}
    //             onChange={onChange}
    //             placeholder="Select an option"
    //             options={channels.map(x => ({ id: x.teamsId, text: x.channelName, key:x.channelId }))}
    //             styles={dropdownStyles}
    //         />
            
    //         <DialogFooter>
    //             <PrimaryButton disabled={!isSaveBtnEnable} className={styles.save_btn} iconProps={{ iconName: isShared ? "CheckMark":"Share" }} onClick={async () => {      
    //                     setIsShared(true);
    //                     setIsSaveBtnEnable(false);
    //                     const isSharedMessage= await sharedEventLink(event, channelId, groupId);
    //                     if(isSharedMessage === "Success"){
    //                         setIsSuccess(true);
    //                         setIsError(false);
    //                         setIsShared(true);
    //                     }
    //                     else if(isSharedMessage === "InsufficientPrivileges"){
    //                         setIsError(true);
    //                         setIsSuccess(false);
    //                         setErrorMessage("Please verify access on channel");
    //                     }            
    //                     else if(isSharedMessage === "teamId needs to be a valid GUID."){
    //                         setIsError(true);
    //                         setIsSuccess(false);
    //                         setErrorMessage("Teams Id/Channel Id is invalid");
    //                     }
    //                     else{
    //                         setIsError(true);
    //                         setIsSuccess(false);
    //                         setErrorMessage("Internal Error: " + isSharedMessage);
    //                     }              
    //                     setTimeout(() => {
    //                         //setSelectedItem(null);
    //                         setIsShared(false);
    //                         setIsSuccess(false);
    //                         setIsError(false);
    //                         setErrorMessage("");
                           
    //                     }, 4000);
    //             }} text="Send" />
    //             <DefaultButton className={styles.cancel_btn} onClick={on_Dismiss} text="Don't send" />
    //         </DialogFooter>
    //     </Dialog>,
    //     [event, sharedEventLink,linkShared,channelId, groupId,isShared,isSuccess,isError,errorMessage,selectedItem,isSaveBtnEnable]
    // );


    //enable to share event channel

    // const shareCommand = useMemo(() =>
    // <>
    // <ActionButton disabled={false/*!window.location.href.includes("teamshostedapp.aspx")*/} iconProps={{ iconName: "Share" }} onClick={() => 
    //     {      
    //         setLinkShared(true);   
    //         }}>
    //         <div style={{ width: "40px" }}>
    //             {strings.Command_Share.Text}
    //         </div>
    //     </ActionButton>
    // {shareToTeams}
    // </>
    //     ,
    //     [event, sharedEventLink,linkShared,channelId, groupId,isShared,isSuccess,isError,errorMessage,selectedItem,isSaveBtnEnable]
    // );


    return [
        viewCommand,
        addToOutlookCommand,
        getLinkCommand
        //shareCommand  //uncomment to share functionality
    ] as const;
};