import React, { FC, useCallback, useEffect, useMemo, useState, useRef  } from "react";
import { IComponentStyles } from "@uifabric/foundation";
import { useBoolean, useForceUpdate } from "@fluentui/react-hooks";
import {
    ActionButton,
    CommandBar,
    ICommandBarItemProps,
    IconButton,
    IIconProps,
    IStackItemSlots,
    IStackTokens,
    Panel,
    PanelType,
    Stack,
    StackItem,
    Text,
    TooltipHost,
    Spinner, SpinnerSize, SearchBox, Dropdown, IDropdownOption, DefaultButton, ITooltipHostStyles, DatePicker, defaultDatePickerStrings, mergeStyles,
    ComboBox, IComboBox, IComboBoxOption, IComboBoxStyles, SelectableOptionMenuItemType
} from "@fluentui/react";
import { BackEventListener } from "common";
import { AsyncDataComponent, DateRotator } from "common/components";
import { IEvent, EventOccurrence } from "model";
import {
    useConfigurationService,
    useDirectoryService,
    useEventsService,
    useTimeZoneService,
} from "services";
import {
    ApprovalDialog,
    ConfigureApproversPanel,
    MyApprovalsFilter,
    MyApprovalsPanel,
} from "../approvals";
// import {
//     ConfigureChannelsPanel
// } from "../ChannelsConfiguration";
import {
    useApprovals,
    useCopyLinkDialog,
    useExecuteEventDeepLink,
    useEventPanel,
    useRefinerPanel,
    useSettings,
    useRefinerValues,
    useWindowSize,
} from "../hooks";
import { Refiners, RefinerPanel } from "../refiners";
import { SettingsPanel } from "../settings";
import { EventFilter, EventPanel, IEventCommands } from "../events";
import {
    CopyLinkDialog,
    Rail,
    SwipedEvents,
    SwipeEventListener,
} from "../shared";
import { IViewCommands, useDataRotatorController, useView, ViewNav } from ".";

import { ViewRoute as strings } from "ComponentStrings";

import styles from "./ViewRoute.module.scss";
import html2canvas from 'html2canvas';
import pptxgen from 'pptxgenjs';
import { ProductivityStudioLogo } from "../ProductivityStudioLogo";
import moment from "moment";
import { FontSizes } from "office-ui-fabric-react";
import { useId } from '@fluentui/react-hooks';
import ExportToExcel from './list/ExportToExcel';
//import { DetailsListDocumentsExample } from "./list/ListView";
const RefinerRailPanelDisplayBreakpoint = 1024;

const rootStackTokens: IStackTokens = { childrenGap: 16 };
const refinerRailStackTokens: IStackTokens = {
    childrenGap: 16,
    padding: "10px 0 0 20px",
};
const viewStackTokens: IStackTokens = { childrenGap: 8, padding: "10px 0" };
const calloutProps = { gapSpace: 0 };
const calendarViewStackItemStyles: IComponentStyles<IStackItemSlots> = {
    root: { minWidth: 0 },
};

const addRefinerIconProps: IIconProps = { iconName: "Add" };
const collapseRefinerRailIconProps: IIconProps = {
    iconName: "ClosePaneMirrored",
};
const expandRefinerRailIconProps: IIconProps = { iconName: "ClosePane" };

function getStartOfMonth() {
    const currentDate = new Date();
    //currentDate.setDate(1); // Set the day of the month to 1 to get the start of the month
    return currentDate;
}
function getEndOfMonth() {
    const currentDate = new Date();
    // currentDate.setMonth(currentDate.getMonth() + 1);
    // currentDate.setDate(1);
    // currentDate.setDate(currentDate.getDate() - 1);
    const endDate = new Date(currentDate); // Create a copy of today's date 
    endDate.setDate(endDate.getDate() + 30); // Add 30 days to today's date
    return endDate;
}
  

const ViewRoute: FC = () => {
    const eventsSectionRef = useRef(null);
    const rootClass = mergeStyles({ maxWidth: 500, selectors: { '> *': { marginBottom: 15 } } });
    const settingsConfigurationref = useRef(null);
    const add_refinerref= useRef(null);
    const [isLoader, setIsLoader] = useState(false);
    const [searchText,setSearchText]= useState("");
    const [startDateList,setStartDateList]= useState(getStartOfMonth());
    const [endDateList,setEndDateList]= useState(getEndOfMonth());
    const [isListView, setIsListView] = useState(false);   
    const [exactMatch,setExactMatch]= useState(true);
    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>(); 
    const tooltipId = useId('tooltip');   
    const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block',  position: 'absolute',
    transform: 'translateY(-50%)',
    zIndex: '1', // Ensure the tooltip is above the search box
    top: '69px',
    right: '30px',
    backgroundColor: 'white', // Set default background color            
    } };
    const { active: config } = useConfigurationService();
    const { currentUserIsSiteAdmin } = useDirectoryService();
    const { isDifferenceInTimezone, siteTimeZone } = useTimeZoneService();
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['displayName']);
    const [selectedTemplateKeys, setSelectedTemplateKeys] = React.useState<string[]>(['eventTitle']); 
    const [isDifferenceInTimezoneVal, setIsDifferenceInTimezoneVal] =
        useState<boolean>(false);
    const view = useView();
    const View = view.renderer;
    useEffect(() => {
        setIsDifferenceInTimezoneVal(isDifferenceInTimezone);
    }, []);

    useEffect(() => {
        // Update selectedKeys based on config changes
        setSelectedKeys(config?.listViewColumn || ['displayName']);
    }, [config.listViewColumn]);

    useEffect(() => {
        // Update selectedTemplateKeys based on config changes
        setSelectedTemplateKeys(config?.templateView || ['eventTitle']);
    }, [config.templateView]);

    const [
        anchorDate,
        setAnchorDate,
        dateString,
        onRotatePreviousDate,
        onRotateNextDate,
    ] = useDataRotatorController(view.dateRotatorController);

    const exportToExcelRef = useRef(null);

    const handleExportExcel = () => {
      if (exportToExcelRef.current) {
        exportToExcelRef.current.handleExportExcel();
      }
    };

    const downloadScreenshotAsImage = (dataUrl:string,file_Name:string) => {
        
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = file_Name +'.png'; // Set the desired filename
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("done");
    };   
    
    const captureScreenshotAsPPT = async (screenshotDataUrl:string,file_Name:string) => {
        try {

            if (screenshotDataUrl) {
            const pptx = new pptxgen();
            const slide = pptx.addSlide();
            slide.addImage({ data: screenshotDataUrl, x: 0, y: 0, w: '100%', h: '100%' });
            pptx.writeFile({fileName: file_Name});
            } else {
            console.error('Section not found.');
            }
        } catch (error) {
            console.error('Error capturing and saving screenshot as PPT:', error);
        }
    };

    const printScreenshot = async (screenshotDataUrl:string,file_Name:string) => {      
        try {

            const printWindow = window.open('', '_blank', 'width=' + window.innerWidth + ',height=' + window.innerHeight);
            printWindow.document.open();
            printWindow.document.write('<html><head><title>'+ file_Name +'</title></head><body>');
            printWindow.document.write('<img src="' + screenshotDataUrl + '" style="width:100%;height:auto;" />');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
      
            // Print the content in the new window or modal dialog
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 200);
            
           
        } catch (error) {
          console.error('Error printing screenshot:', error);
        }
      };
      
    const captureScreenshot = async (downloadType:string) => {
        try {
            const button = document.querySelector('.btnDateLabel');
            let buttonText;
            if (button) {
                buttonText = button.textContent.trim();
            } else {
            console.log("Button with class name 'btnDateLabel' not found.");
            }
            const eventsSection = eventsSectionRef.current;
            let _settingsConfiguration: any;
            let _addrefiner: any;
            if(settingsConfigurationref && settingsConfigurationref.current){
                settingsConfigurationref.current.style.display = 'none';
                _settingsConfiguration= settingsConfigurationref.current;
            }
            if(add_refinerref && add_refinerref.current){
                add_refinerref.current.style.display = 'none';
                _addrefiner = add_refinerref.current; 
            }
            setIsLoader(true);        
            
            if (eventsSection) {
                const screenshot = await html2canvas(eventsSection);
                if(_settingsConfiguration)
                    _settingsConfiguration.style.display='block';
                if(_addrefiner)
                    _addrefiner.style.display = 'block';
                
                const screenshotDataUrl = screenshot.toDataURL('image/png');     
                if(!buttonText)
                    buttonText= "ListView"
                if(downloadType === "ImageFile"){
                    downloadScreenshotAsImage(screenshotDataUrl,buttonText);
                }
                else if(downloadType === "PdfFile"){

                   printScreenshot(screenshotDataUrl,buttonText);
                }
                else if(downloadType === "PPTFile"){
                   captureScreenshotAsPPT(screenshotDataUrl, buttonText);
                }  
                setIsLoader(false);             
            }
            else {
                console.error('Section not found.');
            }
        } 
        catch (error) {
          console.error('Error capturing screenshot:', error);
        }
    };

    const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

    const options: IComboBoxOption[] = [
        // { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
        { key: 'isAllDay', text: 'Is All Day' },
        { key: 'isApproved', text: 'Is Approved' },
        { key: 'isRejected', text: 'Is Rejected' },
        { key: 'isConfidential', text: 'Is Confidential' },
        { key: 'isRecurring', text: 'Is Recurring' },
        { key: 'contacts', text: 'Event Contacts' },
        { key: 'description', text: 'Event description' },
        { key: 'eventEndTime', text: 'End Time' },
        { key: 'location', text: 'Location' },
        { key: 'recurrence', text: 'Recurrence Type' },
        { key: 'refinerValues', text: 'Refiner Values' },
        { key: 'eventStartDate', text: 'Start Time' },
        { key: 'tag', text: 'Tag' },
        { key: 'title', text: 'Title' }, 
        { key: 'created', text: 'Created' },
        { key: 'createdBy', text: 'Created By' },  
        { key: 'modified', text: 'Modified' },
        { key: 'modifiedBy', text: 'Modified By' }, 
    ];
    const selectableOptions = options.filter(
        option =>
          (option.itemType === SelectableOptionMenuItemType.Normal || option.itemType === undefined) && !option.disabled,
    );

    const onChange = (
        event: React.FormEvent<IComboBox>,
        option?: IComboBoxOption,
        index?: number,
        value?: string,
      ): void => {
        const selected = option?.selected;
        const currentSelectedOptionKeys = selectedKeys.filter(key => key !== 'selectAll');
        const selectAllState = currentSelectedOptionKeys.length === selectableOptions.length;
    
        if (option) {
          if (option?.itemType === SelectableOptionMenuItemType.SelectAll) {
            const nonDisabledKeys = selectableOptions
        .filter(o => !o.disabled)
        .map(o => o.key as string);
        
            selectAllState
              ? setSelectedKeys([])
              : setSelectedKeys(['selectAll', ...selectableOptions.filter(o => !o.disabled).map(o => o.key as string)]);
          } else {
            const updatedKeys = selected
              ? [...currentSelectedOptionKeys, option!.key as string]
              : currentSelectedOptionKeys.filter(k => k !== option.key);
            if (updatedKeys.length === selectableOptions.length) {
              updatedKeys.push('selectAll');
            }
            setSelectedKeys(updatedKeys);
          }
        }
    };
  

    // const dateRange = useMemo(
    //     () => view.dateRange(anchorDate, config),
    //     [view, anchorDate]
    // );
    const dateRange = useMemo(() => {
        if (view.id === 'list') {
            setIsListView(true);
            const start = moment(startDateList);
            const end = moment(endDateList);
            return { start, end };
        } else {
            setIsListView(false);
            return view.dateRange(anchorDate, config);
        }
    }, [view, anchorDate, startDateList, endDateList]);

    const { eventsAsync, refinersAsync, refinerValuesAsync, approversAsync } =
        useEventsService();
    const [asyncWatchers] = useState([
        eventsAsync,
        refinersAsync,
        refinerValuesAsync,
        approversAsync,
       // channelsConfigurationsAsync
    ]);

    const [hasRefiners, selectedRefinerValues, onSelectedRefinerValuesChanged] =
        useRefinerValues();

    const [
        userIsAnApprover,
        myApprovalsPanel,
        approvalDialog,
        openMyApprovalsPanel,
        ,
        approveEvent,
        rejectEvent,
    ] = useApprovals();

    const [eventPanel, newEvent, displayEvent] = useEventPanel(anchorDate);

    const [refinerPanel, newRefiner, editRefiner] = useRefinerPanel();

    const [
        userCanManageSettings,
        settingsPanel,
        configureApproversPanel,
       // configureChannelsPanel,
        userHasEditPermisison,
        editSettings,
    ] = useSettings();

    const [copyLinkDialog, getLink] = useCopyLinkDialog();

    const { width } = useWindowSize();

    const useSwipeInRefiners = width <= RefinerRailPanelDisplayBreakpoint;
    const useRefinersRail = !useSwipeInRefiners;

    const [
        isRefinerRailExpanded,
        { setTrue: expandRail, setFalse: collapseRail },
    ] = useBoolean(false);
    const backEventListener = useMemo(
        () => new BackEventListener(collapseRail),
        [collapseRail]
    );
    useEffect(() => {
        return () => backEventListener.cleanup();
    }, [backEventListener]);

    const openRefinerRailPanel = useCallback(() => {
        backEventListener.listenForBack();
        expandRail();
    }, [backEventListener, expandRail]);

    const dismissRefinerRailPanel = useCallback(() => {
        backEventListener.cancelListeningForBack();
        collapseRail();
    }, [backEventListener, collapseRail]);

    const swipeHandler: SwipeEventListener = useCallback(
        ({ detail }) => {
            if (detail.dir === "right") {
                openRefinerRailPanel();
            }
        },
        [openRefinerRailPanel]
    );

    useExecuteEventDeepLink(displayEvent);

    const useRefiners =
        (currentUserIsSiteAdmin || hasRefiners) && config.useRefiners;

    const commandBarItems = useCallback(
        (numberOfEventsNeedingApproval: number) => {
         
                const otherItems = [
                    userHasEditPermisison && {
                        key: "new-event",
                        text: strings.Command_NewEvent.Text,
                        iconProps: { iconName: "Add" },
                        onClick: () => newEvent(),
                    },
                    userCanManageSettings && {
                        key: "settings",
                        text: strings.Command_Settings.Text,
                        iconProps: { iconName: "Settings" },
                        onClick: () => editSettings(),
                    },
                    userIsAnApprover && {
                        key: "approvals",
                        text: numberOfEventsNeedingApproval
                            ? `${strings.Command_Approvals.Text} (${numberOfEventsNeedingApproval})`
                            : strings.Command_Approvals.Text,
                        iconProps: { iconName: "InboxCheck" },
                        onClick: () => openMyApprovalsPanel(),
                    },
                ];
                const dropdownMenuItems = [
                    {
                        key: 'captureDropdown',
                        text: 'Export to',
                        iconProps: { iconName: 'Export' },
                        subMenuProps: {
                            items: [
                                {
                                    key: "captureButtonImage",
                                    text: "Image",
                                    iconProps: { iconName: "FileImage" },
                                    onClick: () => captureScreenshot("ImageFile"),
                                },
            
                                {
                                    key: "captureButtonPdf",
                                    text: "PDF",
                                    iconProps: { iconName: "PDF" },
                                    onClick: () => captureScreenshot("PdfFile"),
                                },
                                {
                                    key: "captureButtonPPT",
                                    text: "PPT",
                                    iconProps: { iconName: "PowerPointDocument" },
                                    onClick: () => captureScreenshot("PPTFile"),
                                },
                                {
                                    key: "captureButtonExcel",
                                    text: "Excel",
                                    iconProps: { iconName: "ExcelDocument" },
                                    onClick: handleExportExcel,
                                },

                            ],
                        },
                    },
                ];
                const items = [...otherItems, ...dropdownMenuItems].filter(Boolean);
                return items as ICommandBarItemProps[]           
        },
        [
            userCanManageSettings,
            userIsAnApprover,
            newEvent,
            editSettings,
            openMyApprovalsPanel,
        ]
    );

    const events = useEventsService();
    const addEventToOutlook = (event: IEvent) => {
        events.addToOutlook(event.getExceptionOrEvent());
    };
    // const sharedEventLink = async (event: IEvent, channelId: string, groupId: string) =>{
    //     const itemUrl = events.createEventDeepLink(event.getExceptionOrEvent());
    //     try{
    //     await events.sendDetailinPost(event.getExceptionOrEvent(),itemUrl, channelId, groupId);
    //     return "Success";
    //     }
    //     catch(ex){
    //        return ex.message; 
    //     }
    // }

    const addEventSeriesToOutlook = (event: IEvent) => {
        events.addToOutlook(event.getSeriesMaster(), isDifferenceInTimezoneVal);
    };

    const handleSearchChange = (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => {        
        if(newValue == ""){
            setSelectedItem(undefined);
       }
        //setSearchText(newValue.toLowerCase());
        setSearchText(newValue);
        
    }
    
    const exactMatchSearch = () => {
        setExactMatch(!exactMatch);
      };
      
    
    const filterSearch = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setSelectedItem(item);
      };

    const handleStartDateChange = (date: Date) => {
        // const originalStart = moment(date); 
        // const convertedStartMoment = originalStart && originalStart.clone().tz(siteTimeZone.momentId,true);
        // convertedStartMoment.startOf('day');
        // const dateString = convertedStartMoment.toString();
    
        // // Convert string to JavaScript Date object
        // const convertedStartDate = new Date(dateString);
        setStartDateList(date);
    };
    
    const handleEndDateChange = (date: Date) => {
        // const originalEnd = moment(date); 
        // const convertedEndMoment = originalEnd && originalEnd.clone().tz(siteTimeZone.momentId,true);
        // convertedEndMoment.endOf('day');
        // const dateString = convertedEndMoment.toString();
    
        // // Convert string to JavaScript Date object
        // const convertedEndDate = new Date(dateString);
        setEndDateList(date);
    
    };

    const eventCommands = useMemo(() => {
        return {
            view: displayEvent,
            approve: approveEvent,
            reject: rejectEvent,
            addToOutlook: addEventToOutlook,
            addSeriesToOutlook: addEventSeriesToOutlook,
           // sharedEventLink: sharedEventLink,
            getLink,
            configEnableOutlook: config.useAddToOutlook
        } as IEventCommands ;
    }, [displayEvent, approveEvent, rejectEvent]);

    const viewCommands = useMemo(() => {
        return {
            setAnchorDate,
            newEvent,
            activateEvent: displayEvent,
        } as IViewCommands;
    }, [setAnchorDate, newEvent]);

    const searchBoxStyles = React.useMemo(
        () => ({
          root: {
           // width: 200,
            border: `${searchText ? '4px solid #03787c' : '1px solid #010101'}`, // Border style changes dynamically based on searchText
            borderRadius: `${searchText ? '4px' : '2px'}`,
            boxSizing: 'border-box',
          },
        }),
        [searchText]
      );

    return (
        <>
            <Panel
                type={PanelType.smallFluid}
                isOpen={isRefinerRailExpanded && useSwipeInRefiners}
                isBlocking={false}
                isLightDismiss
                onDismiss={dismissRefinerRailPanel}
                headerText={strings.RefinerRailLabel}
                hasCloseButton
            >
                <AsyncDataComponent hideSpinners dataAsync={refinersAsync}>
                    {(refiners) => (
                        <AsyncDataComponent dataAsync={refinerValuesAsync}>
                            {() => (
                                <Stack tokens={refinerRailStackTokens}>
                                    <Refiners
                                        editingEnabled={currentUserIsSiteAdmin}
                                        refiners={refiners}
                                        selectedValues={selectedRefinerValues}
                                        onSelectionChanged={
                                            onSelectedRefinerValuesChanged
                                        }
                                        onEditRefiner={editRefiner}
                                    />
                                    {currentUserIsSiteAdmin && (
                                        <ActionButton
                                            iconProps={addRefinerIconProps}
                                            onClick={newRefiner}
                                        >
                                            {strings.Command_AddRefiner.Text}
                                        </ActionButton>
                                    )}
                                </Stack>
                            )}
                        </AsyncDataComponent>
                    )}
                </AsyncDataComponent>
            </Panel>
            <SwipedEvents handler={swipeHandler}>
            {isLoader && <> <div className={styles.shadow}></div> 
            <div style={{ position: "absolute", textAlign: "center", top:"50%", left:"48%", zIndex:9999}}>
                <Spinner styles={{ circle: {top: "50%", left: "50%"} }} size={SpinnerSize.large} label="Loading..." />
                </div> </>}
            
                <div id="eventsSection" ref={eventsSectionRef}>
                    <Stack
                        horizontal
                        tokens={rootStackTokens}
                        className={styles.root}
                    >
                    
                        {useRefiners && useRefinersRail && (
                            <StackItem disableShrink>
                                <Rail
                                    name={strings.RefinerRailLabel}
                                    initiallyExpanded={
                                        config.refinerRailInitiallyExpanded
                                    }
                                >
                                    {(collapseRail) => (
                                        <AsyncDataComponent
                                            hideSpinners
                                            dataAsync={refinersAsync}
                                        >
                                            {(refiners) => (
                                                <AsyncDataComponent
                                                    dataAsync={refinerValuesAsync}
                                                >
                                                    {() => (
                                                        <Stack
                                                            tokens={
                                                                refinerRailStackTokens
                                                            }
                                                        >
                                                            <Stack
                                                                horizontal
                                                                horizontalAlign="space-between"
                                                                verticalAlign="center"
                                                            >
                                                                <Text variant="large">
                                                                    {
                                                                        strings.RefinerRailLabel
                                                                    }
                                                                </Text>
                                                                <TooltipHost
                                                                    content={
                                                                        strings
                                                                            .Command_CollapseRefinerRail
                                                                            .Tooltip
                                                                    }
                                                                >
                                                                    <IconButton
                                                                        autoFocus
                                                                        iconProps={
                                                                            collapseRefinerRailIconProps
                                                                        }
                                                                        onClick={
                                                                            collapseRail
                                                                        }
                                                                        ariaLabel={
                                                                            strings
                                                                                .Command_CollapseRefinerRail
                                                                                .AriaLabel
                                                                        }
                                                                    />
                                                                </TooltipHost>
                                                            </Stack>
                                                            <Refiners
                                                                editingEnabled={
                                                                    currentUserIsSiteAdmin
                                                                }
                                                                refiners={refiners}
                                                                selectedValues={
                                                                    selectedRefinerValues
                                                                }
                                                                onSelectionChanged={
                                                                    onSelectedRefinerValuesChanged
                                                                }
                                                                onEditRefiner={
                                                                    editRefiner
                                                                }
                                                            />
                                                            {currentUserIsSiteAdmin && (<div id="add_refiner" ref={add_refinerref}>
                                                                <ActionButton
                                                                    iconProps={
                                                                        addRefinerIconProps
                                                                    }
                                                                    onClick={
                                                                        newRefiner
                                                                    }
                                                                >
                                                                    {
                                                                        strings
                                                                            .Command_AddRefiner
                                                                            .Text
                                                                    }
                                                                </ActionButton>
                                                                </div>
                                                            )}
                                                        </Stack>
                                                    )}
                                                </AsyncDataComponent>
                                            )}
                                        </AsyncDataComponent>
                                    )}
                                </Rail>
                            </StackItem>
                        )}
                        <StackItem grow styles={calendarViewStackItemStyles}>
                            <AsyncDataComponent
                                dataAsync={approversAsync}
                                hideSpinners
                            >
                                {(approvers) => (
                                    <AsyncDataComponent
                                        dataAsync={refinersAsync}
                                        hideSpinners
                                    >
                                        {(refiners) => (
                                            <AsyncDataComponent
                                                dataAsync={eventsAsync}
                                            >
                                                {(events) => (
                                                    <Stack tokens={viewStackTokens}>
                                                        <div id="settingsConfiguration" ref={settingsConfigurationref}>
                                                        <MyApprovalsFilter
                                                            events={events}
                                                            approvers={approvers}
                                                        >
                                                            {(events) => (
                                                                <Stack>
                                                                    <Stack
                                                                        horizontal
                                                                        verticalAlign="center"
                                                                    >
                                                                        {useRefiners &&
                                                                            useSwipeInRefiners && (
                                                                                <IconButton
                                                                                    title="Show refiners"
                                                                                    iconProps={
                                                                                        expandRefinerRailIconProps
                                                                                    }
                                                                                    onClick={
                                                                                        openRefinerRailPanel
                                                                                    }
                                                                                />
                                                                            )}
                                                                        <CommandBar
                                                                            items={commandBarItems(
                                                                                events.length
                                                                            )}
                                                                        />
                                                                    </Stack>
                                                                    
                                                                    <div className={styles.searchRow}> 
                                                                    <div className={styles.blankSearch}></div>                                                          
                                                                        <div className={styles.search}> 
                                                                            <SearchBox
                                                                                styles={searchBoxStyles}
                                                                                placeholder="Search Events"
                                                                                //onSearch={newValue => console.log('value is '+ newValue)}
                                                                                onChange={handleSearchChange}
                                                                                value={searchText}
                                                                                onClear={() => setSearchText('')}
                                                                                /> 
                                                                        </div>
                                                                        {/* <div className={styles.filterDropdown}>
                                                                            <Dropdown
                                                                                className={searchText != '' ? styles.showDropdown : styles.hideDropdown}
                                                                                defaultSelectedKey="title"
                                                                                selectedKey={selectedItem ? selectedItem.key : 'title'}
                                                                                onChange={filterSearch}
                                                                                options={dropdownFilterOptions}
                                                                                label="Search options"
                                                                                //styles={dropdownStyles}
                                                                            />
                                                                        </div> */}
                                                                    </div> 
                                                                    {/* <div className={styles.exactMatchRow}> 
                                                                    <div className={styles.blankMatch}></div>
                                                                        <div className={styles.exactMatchCol}> 
                                                                            <TooltipHost
                                                                                content="Match Case"
                                                                                id={tooltipId}
                                                                                calloutProps={calloutProps}
                                                                                styles={hostStyles}
                                                                            >
                                                                                <DefaultButton 
                                                                                    className={exactMatch ? styles.exactMatchBtn : styles.normalMatchBtn}
                                                                                    //text={ exactMatch ? 'aa' : 'Aa'}
                                                                                    text="Aa"
                                                                                    onClick={exactMatchSearch} 
                                                                                    disabled={ 
                                                                                        selectedItem == undefined || selectedItem.key == 'title' ||
                                                                                        selectedItem.key == 'location' || selectedItem.key == 'contact'
                                                                                        ? false
                                                                                        : true
                                                                                    }
                                                                                    styles={{
                                                                                        root: {
                                                                                            fontSize: '12px', // Adjust font size to make button smaller
                                                                                            padding: '8px 10px 9px 10px', // Adjust padding to reduce button size
                                                                                            width: '28px', // Set width to make button square
                                                                                            height: '28px', // Set height to make button square
                                                                                            minWidth: 'unset', // Remove minWidth to allow width to take effect
                                                                                            border: '0px solid rgb(138, 136, 134)',
                                                                                            backgroundColor: 'white', // Set default background color
                                                                                            selectors: {
                                                                                                '&:hover': {
                                                                                                    backgroundColor: 'darkgray !important', // Change background color on hover
                                                                                                },
                                                                                            },                                                                               
                                                                                            
                                                                                        },
                                                                                        label: {
                                                                                            color: !exactMatch ? 'white' : 'black', // Set text color to white
                                                                                        },
                                                                                    }} 
                                                                                    /> 
                                                                            </TooltipHost>
                                                                        </div>
                                                                    </div> */}
                                                                    {/* <div style={{ position: 'relative' }}>
    <SearchBox
        //styles={searchBoxStyles}
        placeholder="Search Events"
        //onSearch={newValue => console.log('value is '+ newValue)}
        onChange={handleSearchChange}
    />
    <TooltipHost
        content="Match Case"
        id={tooltipId}
        calloutProps={calloutProps}
        styles={{
            root: {
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: '1' // Ensure the tooltip is above the search box
            }
        }}
    >
        <DefaultButton 
            className={exactMatch ? styles.exactMatchBtn : styles.normalMatchBtn}
            //text={ exactMatch ? 'aa' : 'Aa'}
            text="Aa"
            onClick={exactMatchSearch} 
            disabled={ 
                selectedItem == undefined || selectedItem.key == 'title' ||
                selectedItem.key == 'location' || selectedItem.key == 'contact'
                ? false
                : true
            } 
            styles={{
                root: {
                    fontSize: '10px', // Adjust font size to make button smaller
                    padding: '4px', // Adjust padding to reduce button size
                    width: '24px', // Set width to make button square
                    height: '24px', // Set height to make button square
                    minWidth: 'unset', // Remove minWidth to allow width to take effect
                }
            }}
        /> 
    </TooltipHost>
</div> */}
                                                                </Stack>
                                                            )}
                                                        </MyApprovalsFilter>
                                                        </div>
                                                        <Stack
                                                            horizontal
                                                            wrap
                                                            horizontalAlign="space-between"
                                                            verticalAlign="center"
                                                        >
                                                            {!isListView && 
                                                            <DateRotator
                                                                date={anchorDate}
                                                                dateString={
                                                                    dateString
                                                                }
                                                                previousIconProps={
                                                                    view
                                                                        .dateRotatorController
                                                                        .previousIconProps
                                                                }
                                                                nextIconProps={
                                                                    view
                                                                        .dateRotatorController
                                                                        .nextIconProps
                                                                }
                                                                onPrevious={
                                                                    onRotatePreviousDate
                                                                }
                                                                onNext={
                                                                    onRotateNextDate
                                                                }
                                                                onDateChanged={
                                                                    setAnchorDate
                                                                }
                                                            />}

                                                            {isListView &&
                                                            <div className={rootClass} style={{ display: 'flex'}}>
                                                                <DatePicker
                                                                   // style={{ marginRight: '10px', width: '160px' }}
                                                                    label="Select the start date"
                                                                    placeholder="Select a start date..."
                                                                    ariaLabel="Select a start date"
                                                                    strings={defaultDatePickerStrings}
                                                                    onSelectDate={handleStartDateChange}
                                                                    value={startDateList}
                                                                    className={styles.datePickerList}
                                                                />  
                                                                <DatePicker
                                                                    //style={{ marginLeft: '10px', width: '160px' }}
                                                                    label="Select the end date"
                                                                    placeholder="Select an end date..."
                                                                    ariaLabel="Select an end date"
                                                                    strings={defaultDatePickerStrings}
                                                                    onSelectDate={handleEndDateChange}
                                                                    value={endDateList}
                                                                    className={styles.datePickerList}
                                                                />
                                                                
                                                                {!userCanManageSettings && <div>
                                                                    <ComboBox
                                                                        label="Select columns to display"
                                                                        multiSelect
                                                                        options={options}
                                                                        selectedKey={selectedKeys}
                                                                        onChange={onChange}
                                                                        styles={comboBoxStyles}
                                                                    />
                                                                </div>}
                                                            </div>
                                                            }
                                                            <ViewNav />
                                                        </Stack>
                                                    
                                                        <EventFilter
                                                            events={events}
                                                            dateRange={dateRange}
                                                            refiners={refiners}
                                                            selectedRefinerValues={
                                                                selectedRefinerValues
                                                            }
                                                            approvers={approvers}
                                                            searchText={searchText}
                                                            viewType={view.id}                                                           
                                                            exactMatch={!exactMatch}
                                                            selectedItem={selectedItem}
                                                            siteTimeZone ={siteTimeZone.momentId}
                                                            //toggle={!toggle}
                                                          
                                                        >
                                                            {(cccurrences) => (
                                                                <>
                                                                <View
                                                                    anchorDate={
                                                                        anchorDate
                                                                    }
                                                                    cccurrences={
                                                                        cccurrences
                                                                    }
                                                                    refiners={
                                                                        refiners
                                                                    }
                                                                    selectedRefinerValues={
                                                                        selectedRefinerValues
                                                                    }
                                                                    eventCommands={
                                                                        eventCommands
                                                                    }
                                                                    viewCommands={
                                                                        viewCommands
                                                                    }
                                                                    siteTimeZone ={siteTimeZone.momentId}
                                                                    selectedKeys ={selectedKeys                                                                       
                                                                    }
                                                                    selectedTemplateKeys= {selectedTemplateKeys}

                                                                    // channels={
                                                                    //     channelsConfigurations
                                                                    // }
                                                                />
                                                                
                                                                <ExportToExcel ref={exportToExcelRef} items={cccurrences} _refiners={refiners} />
                                                                </>
                                                            )}
                                                        </EventFilter>
                                                    </Stack>
                                                )}
                                            </AsyncDataComponent>
                                        )}
                                    </AsyncDataComponent>
                                )}
                            </AsyncDataComponent>
                        </StackItem>
                        
                    </Stack>
                    </div>
            
            </SwipedEvents>
            <MyApprovalsPanel
                componentRef={myApprovalsPanel}
                commands={eventCommands}
            />
            <EventPanel
                hasCloseButton
                componentRef={eventPanel}
                commands={eventCommands}
                asyncWatchers={asyncWatchers}
                timeZoneDiff={isDifferenceInTimezoneVal}
            />
            <ApprovalDialog
                asyncWatchers={asyncWatchers}
                componentRef={approvalDialog}
            />
            <RefinerPanel
                hasCloseButton
                componentRef={refinerPanel}
                refinersAsync={refinersAsync}
                asyncWatchers={asyncWatchers}
            />
            <SettingsPanel
                hasCloseButton
                componentRef={settingsPanel}
                onSettingsUpdated={useForceUpdate()}
                onNewRefiner={newRefiner}
                onEditRefiner={editRefiner}
                configureApproversPanel={configureApproversPanel}
                //configureChannelsPanel={configureChannelsPanel}
                asyncWatchers={asyncWatchers}
                selectedTemplateKeys={selectedTemplateKeys}
            />
            <ConfigureApproversPanel componentRef={configureApproversPanel} />
            {/* <ConfigureChannelsPanel componentRef={configureChannelsPanel} /> */}
            <CopyLinkDialog componentRef={copyLinkDialog} />
            <ProductivityStudioLogo className="ms-textAlignRight" />
        </>
    );
};

export default ViewRoute;
