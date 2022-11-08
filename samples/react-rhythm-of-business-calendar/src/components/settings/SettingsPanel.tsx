import { months } from 'moment-timezone';
import React, { RefObject } from 'react';
import { DefaultButton, ICommandBarItemProps, IDropdownOption, Label, TooltipHost } from "@fluentui/react";
import { arrayToMap, Entity, ErrorHandler } from 'common';
import { EntityPanelBase, IEntityPanelProps, IDataPanelBaseState, ResponsiveGrid, GridRow, GridCol, IDataPanelBase, LiveToggle, LiveDropdown } from "common/components";
import { ReadonlyRefinerMap, Refiner } from 'model';
import { withServices, ServicesProp, ConfigurationServiceProp, ConfigurationService, EventsServiceProp, EventsService } from 'services';
import { Configuration } from 'schema';
import { IConfigureApproversPanel } from '../approvals';
import { ViewDescriptors, ViewDescriptorsById } from '../views';
import { RefinerEditor } from './RefinerEditor';

import { PersistConcurrencyFailureMessage, SettingsPanel as strings } from "ComponentStrings";

import styles from './SettingsPanel.module.scss';

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

export interface ISettingsPanel extends IDataPanelBase<Configuration> {
}

interface IOwnProps {
    onSettingsUpdated: () => void;
    onNewRefiner: () => void;
    onEditRefiner: (refiner: Refiner) => void;
    configureApproversPanel: RefObject<IConfigureApproversPanel>;
}
type IProps = IOwnProps & IEntityPanelProps<Configuration> & ServicesProp<ConfigurationServiceProp & EventsServiceProp>;

interface IOwnState {
    groupByRefinerOptions: IDropdownOption[];
    refiners: Refiner[];
    refinersById: ReadonlyRefinerMap;
}
type IState = IOwnState & IDataPanelBaseState<Configuration>;

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
            refinersById: new Map()
        };
    }

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
                <GridRow>
                    <GridCol sm={12} lg={4}>
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
                    <GridCol sm={12} lg={5}>
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
                </GridRow>
                <GridRow>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_UseRefiners.Label}
                            onText={strings.Field_UseRefiners.OnText}
                            offText={strings.Field_UseRefiners.OffText}
                            tooltip={strings.Field_UseRefiners.Tooltip}
                            propertyName='useRefiners'
                        />
                    </GridCol>
                    <GridCol sm={6} lg={4}>
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
                    <GridCol>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_AllowConfidentialEvents.Label}
                            onText={strings.Field_AllowConfidentialEvents.OnText}
                            offText={strings.Field_AllowConfidentialEvents.OffText}
                            tooltip={strings.Field_AllowConfidentialEvents.Tooltip}
                            propertyName='allowConfidentialEvents'
                        />
                    </GridCol>
                </GridRow>
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