import { months} from 'moment-timezone';
import React, { CSSProperties, RefObject } from 'react';
import { ComboBox, DefaultButton, IComboBox, IComboBoxOption, IComboBoxStyles, ICommandBarItemProps, IDropdownOption, Label, SelectableOptionMenuItemType, TooltipHost } from "@fluentui/react";
import { arrayToMap, Entity, ErrorHandler } from 'common';
import { EntityPanelBase, IEntityPanelProps, IDataPanelBaseState, ResponsiveGrid, GridRow, GridCol, IDataPanelBase, LiveToggle, LiveDropdown, LiveComboBox, LiveMultiselectDropdown } from "common/components";
import { ListViewKeys, ReadonlyRefinerMap, Refiner } from 'model';
import { withServices, ServicesProp, ConfigurationServiceProp, ConfigurationService, EventsServiceProp, EventsService } from 'services';
import { Configuration } from 'schema';
import { IConfigureApproversPanel } from '../approvals';
//import { IConfigureChannelsPanel } from '../ChannelsConfiguration';
import { ViewDescriptors, ViewDescriptorsById } from '../views';
import { RefinerEditor } from './RefinerEditor';
import { ViewYearFYKeys } from "model";
import { InfoIcon } from '@fluentui/react-icons-mdl2';

import { PersistConcurrencyFailureMessage, SettingsPanel as strings } from "ComponentStrings";
import { TemplateViewKeys } from 'model/TemplateViewKeys';
import styles from './SettingsPanel.module.scss';
const templateViewImg = require('assets/onboarding/ETemplateView.png');

const infoIconStyle: CSSProperties = {
    fontSize: 12,
    marginLeft: 4
};

const refinerToDropdownOption = (refiner: Refiner) => {
    const { id: key, displayName: text } = refiner;
    return { key, text } as IDropdownOption;
};

const viewDropdownOptions: IDropdownOption[] = ViewDescriptors.map(v => {
    return {
        key: v.id,
        text: v.title
    };
});

const monthNames = months();
const fiscalYearDropdownOptions: IDropdownOption[] = monthNames.map((name, idx) => {
    return {
        key: idx,
        text: name
    };
});

const fiscalYearShowDropdownOptions: IDropdownOption[] = Object.values(ViewYearFYKeys).map((name, idx) => {
    return {
        key: name,
        text: name
    };
});

export interface ISettingsPanel extends IDataPanelBase<Configuration> {
}

interface IOwnProps {
    onSettingsUpdated: () => void;
    onNewRefiner: () => void;
    onEditRefiner: (refiner: Refiner) => void;
    configureApproversPanel: RefObject<IConfigureApproversPanel>;
    selectedTemplateKeys?: string[];
   // configureChannelsPanel: RefObject<IConfigureChannelsPanel>;
    
}
type IProps = IOwnProps & IEntityPanelProps<Configuration> & ServicesProp<ConfigurationServiceProp & EventsServiceProp>;

interface IOwnState {
    groupByRefinerOptions: IDropdownOption[];
    refiners: Refiner[];
    refinersById: ReadonlyRefinerMap;
    selectedKeys: string[];
    selectedTemplateKeys: string[];
}
type IState = IOwnState & IDataPanelBaseState<Configuration>;

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

const viewValue: IComboBoxOption[] = [
    // { key: 'eventTitle', text: 'Event Title' },
    { key: 'tag', text: 'Tag' },
    { key: 'location', text: 'Location' },
    { key: 'starttime', text: 'Start Time - End Time' },

];

const selectableOptions = options.filter(
  option =>
    (option.itemType === SelectableOptionMenuItemType.Normal || option.itemType === undefined) && !option.disabled,
);

class SettingsPanel extends EntityPanelBase<Configuration, IProps, IState> implements ISettingsPanel {
    protected get title() {
        return strings.Heading;
    }

    protected resetState(): IState {
        this._buildGroupByRefinerOptions();

        return {
            ...super.resetState(),
            groupByRefinerOptions: [],
            refiners: [],
            refinersById: new Map(),
            selectedKeys: ['displayName'],
            selectedTemplateKeys:['eventTitle']
        };
    }

    // public onChange = (
    //     event: React.FormEvent<HTMLDivElement>,
    //     option?: IComboBoxOption,
    //     index?: number,
    //     value?: string,
    //   ) => {
    //     const { selectedKeys } = this.state;
    //     const selected = option?.selected;
    //     const currentSelectedOptionKeys = selectedKeys.filter(key => key !== 'selectAll');
    //     const selectAllState = currentSelectedOptionKeys.length === selectableOptions.length;
    
    //     if (option) {
    //       if (option?.itemType === SelectableOptionMenuItemType.SelectAll) {
    //         selectAllState
    //           ? this.setState({ selectedKeys: [] })
    //           : this.setState({ selectedKeys: ['selectAll', ...selectableOptions.map(o => o.key as string)] });
    //       } else {
    //         const updatedKeys = selected
    //           ? [...currentSelectedOptionKeys, option.key as string]
    //           : currentSelectedOptionKeys.filter(k => k !== option.key);
    //         if (updatedKeys.length === selectableOptions.length) {
    //           updatedKeys.push('selectAll');
    //         }
    //         this.setState({ selectedKeys: updatedKeys });
    //       }
    //     }
    // };

    public componentShouldRender() {
        super.componentShouldRender();
        this._buildGroupByRefinerOptions();
    }

    private async _buildGroupByRefinerOptions() {
        const { [EventsService]: { refinersAsync } } = this.props.services;

        await refinersAsync.promise;

        const refiners = [...refinersAsync.data];
        refiners.sort(Refiner.OrderAscComparer);

        const groupByRefinerOptions: IDropdownOption[] = [
            { key: 0, text: '' },
            ...refiners.filter(Entity.NotDeletedFilter).map(refinerToDropdownOption)
        ];

        const refinersById = arrayToMap(refiners, r => r.id);

        this.setState({ groupByRefinerOptions, refiners, refinersById });
    }

    protected async persistChangesCore() {
        const { [ConfigurationService]: configurations } = this.props.services;

        try {
            await configurations.persist();
        } catch (e) {
            if (ErrorHandler.is_412_PRECONDITION_FAILED(e)) {
                const message = await ErrorHandler.message(e);
                console.warn(message, e);
                return Promise.reject(PersistConcurrencyFailureMessage);
            } else {
                throw e;
            }
        }
    }

    protected readonly updateFieldAndSubmit = (update: (data: Configuration) => void, callback?: () => any) =>
        this.updateField(update, () => {
            if (callback) callback();
            this.submit(() => {
                this.edit();
                this.props.onSettingsUpdated();
            });
        })

    private _openConfigureApprovers = () =>
        this.props.configureApproversPanel.current?.open();

        // private _openConfigureChannels = () =>
        // this.props.configureChannelsPanel.current?.open();   //enable to share event
        
    protected renderEditContent(): JSX.Element {
        const { onNewRefiner, onEditRefiner } = this.props;
        const { showValidationFeedback, groupByRefinerOptions, refiners, refinersById } = this.state;
        const entity = this.entity;
        const { useRefiners, useApprovals } = entity;
        const liveProps = {
            entity,
            showValidationFeedback,
            updateField: this.updateFieldAndSubmit
        };
      
        
        return (
            <ResponsiveGrid className={styles.content}>
                <div> <p><b> {strings.Heading_GeneralSettings} </b></p></div>
                <GridRow>
                    <GridCol sm={12} lg={3}>
                        <LiveDropdown
                            label={strings.Field_DefaultView.Label}
                            tooltip={strings.Field_DefaultView.Tooltip}
                            {...liveProps}
                            options={viewDropdownOptions}
                            propertyName='defaultView'
                            getKeyFromValue={v => v}
                            renderValue={v => ViewDescriptorsById.get(v).title}
                        />
                    </GridCol>
                    <GridCol sm={12} lg={4}>
                        <LiveDropdown
                            label={strings.Field_FiscalYear.Label}
                            tooltip={strings.Field_FiscalYear.Tooltip}
                            {...liveProps}
                            options={fiscalYearDropdownOptions}
                            propertyName='fiscalYearSartMonth'
                            getKeyFromValue={v => v}
                            renderValue={v => monthNames[v]}
                        />
                    </GridCol>
                    <GridCol sm={12} lg={5}>
                        <LiveDropdown
                            label={strings.Field_ShowFiscalYear.Label}
                            tooltip={strings.Field_ShowFiscalYear.Tooltip}
                            {...liveProps}
                            options={fiscalYearShowDropdownOptions}
                            propertyName='fiscalYearStartYear'
                            getKeyFromValue={v => v}
                            renderValue={v => ViewYearFYKeys[v]}
                        />
                    </GridCol>
                </GridRow>
                <GridRow>
                    <GridCol sm={6} lg={3}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_UseRefiners.Label}
                            onText={strings.Field_UseRefiners.OnText}
                            offText={strings.Field_UseRefiners.OffText}
                            tooltip={strings.Field_UseRefiners.Tooltip}
                            propertyName='useRefiners'
                        />
                    </GridCol>
                    <GridCol sm={6} lg={5}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_RefinerRailInitialDisplay.Label}
                            onText={strings.Field_RefinerRailInitialDisplay.OnText}
                            offText={strings.Field_RefinerRailInitialDisplay.OffText}
                            tooltip={strings.Field_RefinerRailInitialDisplay.Tooltip}
                            propertyName='refinerRailInitiallyExpanded'
                            disabled={!useRefiners}
                        />
                    </GridCol>
                    <GridCol sm={6} lg={4}>
                        <LiveDropdown
                            label={strings.Field_QuarterViewGroupByRefiner.Label}
                            tooltip={strings.Field_QuarterViewGroupByRefiner.Tooltip}
                            {...liveProps}
                            options={groupByRefinerOptions}
                            propertyName='quarterViewGroupByRefinerId'
                            getKeyFromValue={v => v}
                            renderValue={v => {
                                const refiner = refinersById.get(v);
                                return !refiner.isDeleted ? refiner.displayName : '';
                            }}
                            disabled={!useRefiners || !refiners.some(Entity.NotDeletedFilter)}
                        />
                    </GridCol>
                </GridRow>

                <GridRow>
                    <GridCol sm={6} lg={4}>
                            <LiveToggle
                                {...liveProps}
                                label={strings.Field_AllowConfidentialEvents.Label}
                                onText={strings.Field_AllowConfidentialEvents.OnText}
                                offText={strings.Field_AllowConfidentialEvents.OffText}
                                tooltip={strings.Field_AllowConfidentialEvents.Tooltip}
                                propertyName='allowConfidentialEvents'
                            />
                    </GridCol>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_UseAddToOutlook.Label}
                            onText={strings.Field_UseAddToOutlook.OnText}
                            offText={strings.Field_UseAddToOutlook.OffText}
                            tooltip={strings.Field_UseAddToOutlook.Tooltip}
                            propertyName='useAddToOutlook'
                        />
                    </GridCol>
                    <GridCol sm={6} lg={4}>
                        <LiveMultiselectDropdown
                            label={strings.Field_ListViewColumn.Label}
                            tooltip={strings.Field_ListViewColumn.Tooltip}
                            {...liveProps}
                            options={options}
                            multiSelect
                            propertyName='listViewColumn'
                            getKeyFromValue={val => val}
                           // placeholder={anyValueString}
                           // onRenderTitle={() => <>{humanizedString(selectedValues)}</>}
                            renderValue= {(vals) => (
                                        ListViewKeys                                 
                               
                            )}
                            
                        />
                    </GridCol>
                </GridRow>

                <div style={{ borderTop: '2px solid #ccc', margin: '10px 0' }}></div>
                <div> <p><b> {strings.Heading_ApprovalSettings} </b></p></div>
                <GridRow>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_UseApprovals.Label}
                            onText={strings.Field_UseApprovals.OnText}
                            offText={strings.Field_UseApprovals.OffText}
                            tooltip={strings.Field_UseApprovals.Tooltip}
                            propertyName='useApprovals'
                        />
                    </GridCol>
                    <GridCol sm={6} lg={8}>
                        <br />
                        <TooltipHost content={strings.Command_ConfigureApprovers.Tooltip}>
                            <DefaultButton disabled={!useApprovals} onClick={this._openConfigureApprovers} >
                                {strings.Command_ConfigureApprovers.Text}
                            </DefaultButton>
                        </TooltipHost>
                    </GridCol>
                </GridRow>
                <GridRow>
                    <GridCol sm={6} lg={6}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_UseApprovalsTeamsNotification.Label}
                            onText={strings.Field_UseApprovalsTeamsNotification.OnText}
                            offText={strings.Field_UseApprovalsTeamsNotification.OffText}
                            tooltip={strings.Field_UseApprovalsTeamsNotification.Tooltip}
                            propertyName="useApprovalsTeamsNotification"
                            disabled={!useApprovals}
                            defaultChecked={!useApprovals}
                        />
                    </GridCol>
                    <GridCol sm={6} lg={6}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_UseApprovalsEmailNotification.Label}
                            onText={strings.Field_UseApprovalsEmailNotification.OnText}
                            offText={strings.Field_UseApprovalsEmailNotification.OffText}
                            tooltip={strings.Field_UseApprovalsEmailNotification.Tooltip}
                            propertyName="useApprovalsEmailNotification"
                            disabled={!useApprovals}
                        />
                    </GridCol>
                </GridRow>
                <div style={{ borderTop: '2px solid #ccc', margin: '10px 0' }}></div>
                <div> <p><b> {strings.Heading_TemplateSettings} </b></p></div>
                <GridRow>
                    <GridCol sm={12} lg={12}>
                     <div style={{ display: 'flex', alignItems: 'center' }}> {/* Container for dropdown and image */}
                        <LiveMultiselectDropdown
                            label={strings.Field_TemplateView.Label}
                            tooltip={strings.Field_TemplateView.Tooltip}
                            {...liveProps}
                            options={viewValue}
                            multiSelect
                            propertyName='templateView'
                            getKeyFromValue={val => val}
                           // placeholder={anyValueString}
                           // onRenderTitle={() => <>{humanizedString(selectedValues)}</>}
                            renderValue= {(vals) => (
                                        TemplateViewKeys                                 
                               
                            )}
                            style={{ width: '188px' }}
                            
                        />
                         <div style={{ display: 'flex', alignItems: 'center', marginTop: '22px', marginLeft:'32px' }}> 
                            <span style={{ marginRight: '15px', position: 'absolute', marginBottom:'100px'}}>Preview</span>
                            <div className={styles.templateView} style={{ position: 'absolute', width:'184px', padding: '5px', borderRadius: '5px', fontSize: '14px' }}>
                                {(this.props.selectedTemplateKeys.includes('tag') && this.props.selectedTemplateKeys.includes('starttime')) ? <div>[TAG] [Start Time - End Time]</div> : this.props.selectedTemplateKeys.includes('tag') ? <div>[TAG]</div> : this.props.selectedTemplateKeys.includes('starttime') ? <div>[Start Time - End Time]</div> : null}
                                <div>[Event Name]</div>
                                {this.props.selectedTemplateKeys.includes('location') && <div>[Location]</div>}
                            </div>
                            {/* <img src={templateViewImg} alt="Template Preview" style={{ height: '60px', width: '220px' }} /> */}
                        </div>
        
                    </div>
                    </GridCol>                                   
                </GridRow>
                {/* enable this code for the share option */}
                {/* <div style={{ borderTop: '2px solid #ccc', margin: '10px 0' }}></div>
                <div> <p><b> {strings.Heading_ChannelsSettings} </b>
                <TooltipHost content={strings.TeamsChannel_MessageInfo}>
                    {<InfoIcon style={infoIconStyle} tabIndex={0} />}
                </TooltipHost></p></div>
                <GridRow className=''>
                    <GridCol sm={6} lg={8}>
                        <TooltipHost content={strings.Command_ConfigureChannels.Tooltip}>
                            <DefaultButton onClick={this._openConfigureChannels} >
                                {strings.Command_ConfigureChannels.Text}
                            </DefaultButton>
                        </TooltipHost>
                    </GridCol>
                </GridRow> */}
                <div style={{ borderTop: '2px solid #ccc', margin: '36px 0 -6px' }}></div>
                {useRefiners &&
                    <GridRow>
                        <GridCol>
                            <Label>{strings.Field_Refiners.Label}</Label>
                            <RefinerEditor
                                refiners={refiners}
                                onNewRefiner={onNewRefiner}
                                onEditRefiner={onEditRefiner}
                            />
                        </GridCol>
                    </GridRow>
                }
            </ResponsiveGrid>
        );
    }

    protected buildEditHeaderCommands(): ICommandBarItemProps[] {
        const onConfirmDiscard = () => this.confirmDiscard();

        return [{
            key: 'back',
            text: strings.Command_Back.Text,
            iconProps: { iconName: 'Back' },
            onClick: onConfirmDiscard
        }];
    }
}

export default withServices(SettingsPanel);