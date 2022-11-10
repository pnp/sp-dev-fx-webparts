import React from 'react';
import { FocusZone, format, ICommandBarItemProps, IDropdownOption, Text } from "@fluentui/react";
import { Entity, ErrorHandler, humanizeFixedList, multifilter } from 'common';
import { EntityPanelBase, IEntityPanelProps, IDataPanelBaseState, ResponsiveGrid, GridRow, GridCol, IDataPanelBase, LiveTextField, LiveText, LiveUserPicker, ITransformer, LiveMultiselectDropdown } from "common/components";
import { Approvers, Refiner, RefinerValue } from "model";
import { withServices, ServicesProp, EventsServiceProp, EventsService } from 'services';
import { ListItemTechnicals } from '../shared';

import { PersistConcurrencyFailureMessage, ApproversPanel as strings } from "ComponentStrings";

import styles from './ApproversPanel.module.scss';

export interface IApproversPanel extends IDataPanelBase<Approvers> {
}

interface IOwnProps {
}
type IProps = IOwnProps & IEntityPanelProps<Approvers> & ServicesProp<EventsServiceProp>;

interface IOwnState {
    refinerValueOptionsByRefiner: Map<Refiner, IDropdownOption[]>;
    refiners: readonly Refiner[];
}
type IState = IOwnState & IDataPanelBaseState<Approvers>;

class ApproversPanel extends EntityPanelBase<Approvers, IProps, IState> implements IApproversPanel {
    protected get title() {
        return '';
    }

    protected resetState(): IState {
        this._buildRefinerValueOptions();

        return {
            ...super.resetState(),
            refinerValueOptionsByRefiner: new Map(),
            refiners: []
        };
    }

    public componentShouldRender() {
        super.componentShouldRender();
        this._buildRefinerValueOptions();
    }

    private async _buildRefinerValueOptions() {
        const { [EventsService]: { refinersAsync } } = this.props.services;

        await refinersAsync.promise;

        const refiners = [...refinersAsync.data];
        refiners.sort(Refiner.OrderAscComparer);

        const refinerValueOptionsByRefiner = new Map<Refiner, IDropdownOption[]>();
        for (const refiner of refiners) {
            const options: IDropdownOption[] = refiner.values.filter(Entity.NotDeletedFilter).map((value: RefinerValue) => {
                const { key, displayName: text } = value;
                return { key, text, data: value } as IDropdownOption;
            });

            refinerValueOptionsByRefiner.set(refiner, options);
        }

        this.setState({ refinerValueOptionsByRefiner, refiners });
    }

    protected async persistChangesCore() {
        const { [EventsService]: events } = this.props.services;

        try {
            events.track(this.entity);
            await events.persist();
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

    private approvalsDescription(): JSX.Element {
        const { refiners } = this.state;
        const { refinerValues } = this.entity;

        return <>
            <Text tabIndex={0}>{strings.ApprovalExplanation}</Text>
            <Text block tabIndex={0}>
                <ul>
                    {refiners.map(refiner => {
                        const { displayName, key } = refiner;
                        const selectedValues = multifilter(refinerValues.get(), Entity.NotDeletedFilter, v => v.refiner.get() === refiner);
                        const allValues = refiner.values.filter(Entity.NotDeletedFilter);
                        const humanizedString = humanizeFixedList(selectedValues, allValues, v => v.displayName, false, strings.AnyValue, undefined, strings.ValueListConjunction);
                        return (
                            <li key={key}>
                                {selectedValues.length > 0
                                    ? format(strings.ValueForRefiner, humanizedString, displayName)
                                    : format(strings.AnyRefinerValue, displayName)
                                }
                            </li>
                        );
                    })}
                </ul>
            </Text>
        </>;
    }

    protected renderDisplayContent(): JSX.Element {
        const { refiners } = this.state;
        const entity = this.entity;
        const liveProps = {
            entity
        };

        return (
            <FocusZone>
                <ResponsiveGrid className={styles.content}>
                    <GridRow>
                        <GridCol>
                            <LiveText label={strings.Field_Title_DisplayMode.Label} {...liveProps} propertyName="title" />
                        </GridCol>
                    </GridRow>
                    <GridRow>
                        {refiners.map(refiner => {
                            const transformer = {
                                transform: (values: RefinerValue[]) => values.filter(v => v.refiner.get() === refiner),
                                reverse: (values: RefinerValue[]) => values
                            };

                            return (
                                <GridCol key={refiner.key} sm={12} md={6} lg={4}>
                                    <LiveText label={refiner.displayName} {...liveProps} propertyName='refinerValues' transformer={transformer}>
                                        {vals => <Text tabIndex={0}>{vals.map(v => v.displayName).join(', ') || strings.AnyValue}</Text>}
                                    </LiveText>
                                </GridCol>
                            );
                        })}
                    </GridRow>
                    <GridRow>
                        <GridCol sm={12}>
                            <LiveText label={strings.Field_Users.Label} {...liveProps} propertyName="users">
                                {val => <Text tabIndex={0}>{val.map(({ title }) => title).join(', ') || "-"}</Text>}
                            </LiveText>
                        </GridCol>
                    </GridRow>
                    {refiners.length > 0 &&
                        <GridRow>
                            <GridCol sm={12}>
                                {this.approvalsDescription()}
                            </GridCol>
                        </GridRow>
                    }
                    <GridRow>
                        <GridCol sm={12}>
                            <ListItemTechnicals entity={this.entity} />
                        </GridCol>
                    </GridRow>
                </ResponsiveGrid>
            </FocusZone>
        );
    }

    protected renderEditContent(): JSX.Element {
        const { showValidationFeedback, refiners, refinerValueOptionsByRefiner } = this.state;
        const entity = this.entity;
        const { refinerValues } = entity;
        const liveProps = {
            entity,
            showValidationFeedback,
            updateField: this.updateField
        };

        return (
            <ResponsiveGrid className={styles.content}>
                <GridRow>
                    <GridCol sm={12}>
                        <LiveTextField
                            {...liveProps}
                            label={strings.Field_Title_EditMode.Label}
                            propertyName="title"
                            autoFocus={entity.isNew}
                            required
                            maxLength={255}
                            rules={Approvers.TitleValidations}
                        />
                    </GridCol>
                </GridRow>
                <GridRow>
                    {refiners.filter(Entity.NotDeletedFilter).map(refiner => {
                        const { displayName } = refiner;
                        const anyValueString = format(strings.AnyRefinerValue, displayName);

                        const transformer: ITransformer<RefinerValue[]> = {
                            transform: (values: RefinerValue[]) => {
                                return values.filter(v => v.refiner.get() === refiner);
                            },
                            reverse: (values: RefinerValue | RefinerValue[]) => {
                                return [
                                    ...this.entity.refinerValues.filter(v => v.refiner.get() !== refiner),
                                    ...(values instanceof Array ? values : [values]).filter(v => v !== refiner.blankValue)
                                ].filter(Boolean);
                            }
                        };

                        const allValues = refiner.values.filter(Entity.NotDeletedFilter);
                        const selectedValues = multifilter(refinerValues.get(), Entity.NotDeletedFilter, v => v.refiner.get() === refiner);
                        const humanizedString = (values: readonly RefinerValue[]) => humanizeFixedList(values, allValues, v => v.displayName, false, anyValueString, undefined, strings.ValueListConjunction);

                        return (
                            <GridCol key={refiner.key} sm={12} md={6} lg={4}>
                                <LiveMultiselectDropdown
                                    {...liveProps}
                                    transformer={transformer}
                                    propertyName='refinerValues'
                                    label={displayName}
                                    options={refinerValueOptionsByRefiner.get(refiner)}
                                    getKeyFromValue={val => val.key}
                                    placeholder={anyValueString}
                                    onRenderTitle={() => <>{humanizedString(selectedValues)}</>}
                                    renderValue={vals => humanizedString(vals)}
                                />
                            </GridCol>
                        );
                    })}
                </GridRow>
                <GridRow>
                    <GridCol sm={12}>
                        <LiveUserPicker
                            {...liveProps}
                            label={strings.Field_Users.Label}
                            propertyName='users'
                            required
                            rules={Approvers.UsersValidations}
                        />
                    </GridCol>
                </GridRow>
                {refiners.length > 0 &&
                    <GridRow>
                        <GridCol sm={12}>
                            {this.approvalsDescription()}
                        </GridCol>
                    </GridRow>
                }
                <GridRow>
                    <GridCol sm={12}>
                        <ListItemTechnicals entity={this.entity} />
                    </GridCol>
                </GridRow>
            </ResponsiveGrid>
        );
    }

    protected buildDisplayHeaderCommands(): ICommandBarItemProps[] {
        const onEdit = () => { this.edit(); };

        return [{
            key: 'edit',
            text: strings.Command_Edit.Text,
            iconProps: { iconName: 'Edit' },
            onClick: onEdit
        }];
    }

    protected buildEditHeaderCommands(): ICommandBarItemProps[] {
        const { submitting } = this.state;
        const { isDeleted } = this.entity;
        const onSubmit = () => this.submit(() => this.dismiss());
        const onConfirmDiscard = () => this.confirmDiscard();
        const onDelete = () => this.confirmDelete();

        return [{
            key: 'save',
            text: strings.Command_Save.Text,
            iconProps: { iconName: 'Save' },
            disabled: submitting,
            onClick: onSubmit
        }, {
            key: 'discard',
            text: strings.Command_Discard.Text,
            iconProps: { iconName: 'Cancel' },
            onClick: onConfirmDiscard
        }, {
            key: 'delete',
            text: strings.Command_Delete.Text,
            iconProps: { iconName: 'Delete' },
            disabled: isDeleted,
            onClick: onDelete
        }];
    }
}

export default withServices(ApproversPanel);