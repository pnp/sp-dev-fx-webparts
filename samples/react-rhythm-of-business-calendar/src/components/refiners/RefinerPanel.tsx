import { max } from 'lodash';
import React, { CSSProperties } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { ActionButton, FocusZone, ICommandBarItemProps, IconButton, ITextFieldStyles, Label, Stack, StackItem, Text, TooltipHost } from "@fluentui/react";
import { GripperDotsVerticalIcon } from '@fluentui/react-icons-mdl2';
import { Entity, ErrorHandler, IAsyncData, inverseFilter, multifilter, ValidationRule } from 'common';
import { EntityPanelBase, IEntityPanelProps, IDataPanelBaseState, ResponsiveGrid, GridRow, GridCol, LiveText, LiveUpdate, LiveTextField, IDataPanelBase, LiveRelationship, CalloutColorPicker, LiveToggle } from "common/components";
import { Refiner, RefinerValue } from "model";
import { withServices, ServicesProp, EventsServiceProp, EventsService, DirectoryService, DirectoryServiceProp } from 'services';
import { ListItemTechnicals } from '../shared';

import { PersistConcurrencyFailureMessage, RefinerPanel as strings } from "ComponentStrings";

import styles from './RefinerPanel.module.scss';

export class OnlyOneRefinerUsesColorsValidationRule extends ValidationRule<Refiner> {
    constructor(existingRefiners: IAsyncData<readonly Refiner[]>) {
        super(
            refiner => OnlyOneRefinerUsesColorsValidationRule.isValid(refiner, existingRefiners.data),
            "Only one refiner may use colors"
        );
    }

    public static isValid(refiner: Refiner, existingRefiners: readonly Refiner[]): boolean {
        return !refiner.enableColors || existingRefiners?.every(r => r === refiner || !r.enableColors);
    }
}

export class OnlyOneRefinerUsesTagsValidationRule extends ValidationRule<Refiner> {
    constructor(existingRefiners: IAsyncData<readonly Refiner[]>) {
        super(
            refiner => OnlyOneRefinerUsesTagsValidationRule.isValid(refiner, existingRefiners.data),
            "Only one refiner may use tags"
        );
    }

    public static isValid(refiner: Refiner, existingRefiners: readonly Refiner[]): boolean {
        return !refiner.enableTags || existingRefiners?.every(r => r === refiner || !r.enableTags);
    }
}


export interface IRefinerPanel extends IDataPanelBase<Refiner> {
}

interface IOwnProps {
    refinersAsync: IAsyncData<readonly Refiner[]>;
}
type IProps = IOwnProps & IEntityPanelProps<Refiner> & ServicesProp<DirectoryServiceProp & EventsServiceProp>;

interface IOwnState {
}
type IState = IOwnState & IDataPanelBaseState<Refiner>;

class RefinerPanel extends EntityPanelBase<Refiner, IProps, IState> implements IRefinerPanel {
    private _enableColorsValidation: OnlyOneRefinerUsesColorsValidationRule;
    private _enableTagsValidation: OnlyOneRefinerUsesTagsValidationRule;

    public componentDidMount(): void {
        super.componentDidMount();

        const { refinersAsync } = this.props;
        this._enableColorsValidation = new OnlyOneRefinerUsesColorsValidationRule(refinersAsync);
        this._enableTagsValidation = new OnlyOneRefinerUsesTagsValidationRule(refinersAsync);
    }

    protected get title() {
        if (this.entity) {
            const { displayName } = this.entity;
            if (this.isNew && !displayName)
                return strings.NewRefinerDefaultHeading;
            else
                return `${strings.RefinerHeadingPrefix}: ${displayName}`;
        } else {
            return '';
        }
    }

    protected hasChanges(): boolean {
        return super.hasChanges() || this.entity?.values.hasChanges();
    }

    protected validate(): boolean {
        return super.validate() &&
            this.entity?.values.filter(Entity.NotDeletedFilter).every(v => v.valid()) &&
            this._enableColorsValidation.validate(this.entity) &&
            this._enableTagsValidation.validate(this.entity);
    }

    protected markEntityDeleted(): void {
        super.markEntityDeleted();

        this.entity.values.forEach(value => {
            value.events.snapshot();
            value.events.removeAll();
        });
    }

    protected async persistChangesCore() {
        const { [EventsService]: events } = this.props.services;

        try {
            const values = this.entity.values.filter(Entity.NotDeletedFilter).sort(this.entity.values.sorting.comparer);
            values.forEach((value, idx) => value.order = idx);

            events.track(this.entity);
            await events.persist();

            if (this.entity.isDeleted) {
                this.entity.values.forEach(value => value.events.immortalize());
            }
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

    private readonly _onRefinerValueDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        if (destinationIndex !== sourceIndex) {
            const values = this.entity.values.filter(Entity.NotDeletedFilter).sort(this.entity.values.sorting.comparer);
            values.forEach((value, idx) => value.order = idx);

            const sourceValue = values[sourceIndex];
            const destinationValue = values[destinationIndex];

            sourceValue.order = destinationValue.order;

            // if moving down in order, shift the intervening items up one space
            for (let i = sourceIndex + 1; i <= destinationIndex; i++) {
                values[i].order--;
            }

            // if moving up in order, shift the intervening items down one space
            for (let i = sourceIndex - 1; i >= destinationIndex; i--) {
                values[i].order++;
            }
        }
    }

    protected renderDisplayContent(): JSX.Element {
        const liveProps = {
            entity: this.entity
        };

        return (
            <FocusZone>
                <ResponsiveGrid className={styles.content}>
                    <GridRow>
                        <GridCol sm={12}>
                            <LiveText label={strings.Field_Name.Label} {...liveProps} propertyName='title' />
                        </GridCol>
                    </GridRow>
                    <GridRow>
                        <GridCol sm={6} lg={4}>
                            <LiveText label={strings.Field_Required.Label} {...liveProps} propertyName='required' tooltip={strings.Field_Required.Tooltip}>
                                {val => <Text tabIndex={0}>{val ? strings.Field_Required.OnText : strings.Field_Required.OffText}</Text>}
                            </LiveText>
                        </GridCol>
                        <GridCol sm={6} lg={4}>
                            <LiveText label={strings.Field_AllowMultiselect.Label} {...liveProps} propertyName='allowMultiselect' tooltip={strings.Field_AllowMultiselect.Tooltip}>
                                {val => <Text tabIndex={0}>{val ? strings.Field_AllowMultiselect.OnText : strings.Field_AllowMultiselect.OffText}</Text>}
                            </LiveText>
                        </GridCol>
                        <GridCol sm={6} lg={4}>
                            <LiveText label={strings.Field_InitialDisplay.Label} {...liveProps} propertyName='initiallyExpanded' tooltip={strings.Field_InitialDisplay.Tooltip}>
                                {val => <Text tabIndex={0}>{val ? strings.Field_InitialDisplay.OnText : strings.Field_InitialDisplay.OffText}</Text>}
                            </LiveText>
                        </GridCol>
                    </GridRow>
                    <GridRow>
                        <GridCol sm={6} lg={4}>
                            <LiveText label={strings.Field_UseColors.Label} {...liveProps} propertyName='enableColors' tooltip={strings.Field_UseColors.Tooltip}>
                                {val => <Text tabIndex={0}>{val ? strings.Field_UseColors.OnText : strings.Field_UseColors.OffText}</Text>}
                            </LiveText>
                        </GridCol>
                        <GridCol sm={6} lg={4}>
                            <LiveText label={strings.Field_UseTags.Label} {...liveProps} propertyName='enableTags' tooltip={strings.Field_UseTags.Tooltip}>
                                {val => <Text tabIndex={0}>{val ? strings.Field_UseTags.OnText : strings.Field_UseTags.OffText}</Text>}
                            </LiveText>
                        </GridCol>
                        <GridCol sm={6} lg={4}>
                            <LiveText label={strings.Field_CustomSort.Label} {...liveProps} propertyName='customSort' tooltip={strings.Field_CustomSort.Tooltip}>
                                {val => <Text tabIndex={0}>{val ? strings.Field_CustomSort.OnText : strings.Field_CustomSort.OffText}</Text>}
                            </LiveText>
                        </GridCol>
                    </GridRow>
                    <GridRow>
                        <GridCol>
                            <Label>{strings.Field_RefinerValues.Label}</Label>
                            <LiveRelationship relationship={this.entity.values}>
                                {({ entity: value, isDeleted }) => {
                                    const deletedStyle: CSSProperties = {
                                        textDecoration: 'line-through',
                                        fontWeight: 'lighter'
                                    };
                                    return (
                                        <LiveUpdate entity={value}>{(renderLiveUpdateMark) => <>
                                            {renderLiveUpdateMark()}
                                            <div style={isDeleted ? deletedStyle : undefined}>
                                                {value.displayName}
                                            </div>
                                        </>}</LiveUpdate>
                                    );
                                }}
                            </LiveRelationship>
                        </GridCol>
                    </GridRow>
                    <GridRow>
                        <GridCol>
                            <ListItemTechnicals entity={this.entity} />
                        </GridCol>
                    </GridRow>
                </ResponsiveGrid>
            </FocusZone>
        );
    }

    protected renderEditContent(): JSX.Element {
        const { showValidationFeedback } = this.state;
        const entity = this.entity;
        const { enableColors, enableTags, values, customSort } = entity;
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
                            label={strings.Field_Name.Label}
                            propertyName='title'
                            required
                            maxLength={50}
                            rules={Refiner.TitleValidations}
                            autoFocus={entity.isNew}
                        />
                    </GridCol>
                </GridRow>
                <GridRow>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_Required.Label}
                            onText={strings.Field_Required.OnText}
                            offText={strings.Field_Required.OffText}
                            tooltip={strings.Field_Required.Tooltip}
                            propertyName='required'
                        />
                    </GridCol>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_AllowMultiselect.Label}
                            onText={strings.Field_AllowMultiselect.OnText}
                            offText={strings.Field_AllowMultiselect.OffText}
                            tooltip={strings.Field_AllowMultiselect.Tooltip}
                            propertyName='allowMultiselect'
                        />
                    </GridCol>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_InitialDisplay.Label}
                            onText={strings.Field_InitialDisplay.OnText}
                            offText={strings.Field_InitialDisplay.OffText}
                            tooltip={strings.Field_InitialDisplay.Tooltip}
                            propertyName='initiallyExpanded'
                        />
                    </GridCol>
                </GridRow>
                <GridRow>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_UseColors.Label}
                            onText={strings.Field_UseColors.OnText}
                            offText={strings.Field_UseColors.OffText}
                            tooltip={strings.Field_UseColors.Tooltip}
                            propertyName='enableColors'
                            rules={[this._enableColorsValidation]}
                        />
                    </GridCol>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            label={strings.Field_UseTags.Label}
                            onText={strings.Field_UseTags.OnText}
                            offText={strings.Field_UseTags.OffText}
                            tooltip={strings.Field_UseTags.Tooltip}
                            propertyName='enableTags'
                            rules={[this._enableTagsValidation]}
                        />
                    </GridCol>
                    <GridCol sm={6} lg={4}>
                        <LiveToggle
                            {...liveProps}
                            updateField={(update, callback) => {
                                this.updateField(entity => {
                                    update(entity);
                                    const values = entity.values.filter(Entity.NotDeletedFilter).sort(entity.values.sorting.comparer);
                                    values.forEach((value, idx) => value.order = idx);
                                }, callback);
                            }}
                            label={strings.Field_CustomSort.Label}
                            onText={strings.Field_CustomSort.OnText}
                            offText={strings.Field_CustomSort.OffText}
                            tooltip={strings.Field_CustomSort.Tooltip}
                            propertyName='customSort'
                        />
                    </GridCol>
                </GridRow>
                <GridRow>
                    <GridCol>
                        <Label>{strings.Field_RefinerValues.Label}</Label>
                        <DragDropContext onDragEnd={this._onRefinerValueDragEnd}>
                            <Droppable droppableId="refiners-list" type="REFINER">
                                {({ innerRef, droppableProps, placeholder }, snapshot) => (
                                    <div ref={innerRef} {...droppableProps}>
                                        <LiveRelationship relationship={values} comparer={RefinerValue.OrderAscComparer}>{({ entity, isDeleted, index }) => {
                                            const liveProps = {
                                                entity,
                                                showValidationFeedback,
                                                updateField: (update: (data: RefinerValue) => void, callback?: () => any) => this.updateField(refiner => update(entity), callback)
                                            };
                                            const titleFieldstyles: Partial<ITextFieldStyles> = {
                                                field: { paddingRight: 24 }
                                            };
                                            const tagFieldstyles: Partial<ITextFieldStyles> = {
                                                field: { textAlign: 'center' },
                                                prefix: { padding: '0 6px' },
                                                suffix: { padding: '0 6px' }
                                            };

                                            return (
                                                <Draggable key={entity.key} draggableId={`refiner-${entity.key}`} index={index} isDragDisabled={isDeleted || !customSort}>
                                                    {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
                                                        <div ref={innerRef} {...draggableProps} className={styles.refinerValue}>
                                                            <LiveUpdate
                                                                entity={entity}
                                                                compact
                                                                updateValue={() => this.forceUpdate()}
                                                            >
                                                                {renderLiveUpdateMark => renderLiveUpdateMark({ className: styles.liveUpdateMark })}
                                                            </LiveUpdate>
                                                            <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 12 }}>
                                                                {customSort &&
                                                                    <span {...dragHandleProps} aria-label={strings.Command_ReorderRefinerValue.AriaLabel}>
                                                                        <Text><GripperDotsVerticalIcon style={{ position: 'relative', top: -2 }} /></Text>
                                                                    </span>
                                                                }
                                                                <StackItem grow>
                                                                    <ResponsiveGrid>
                                                                        <GridRow>
                                                                            <GridCol sm={12} lg={4}>
                                                                                <LiveTextField
                                                                                    {...liveProps}
                                                                                    propertyName='title'
                                                                                    placeholder={strings.Field_RefinerValue_Name.Placeholder}
                                                                                    disabled={isDeleted}
                                                                                    rules={RefinerValue.TitleValidations}
                                                                                    maxLength={50}
                                                                                    styles={titleFieldstyles}
                                                                                    liveUpdateMarkClassName={styles.titleLiveUpdateMark}
                                                                                />
                                                                            </GridCol>
                                                                            {enableColors &&
                                                                                <GridCol sm={3} lg={2} className={styles.color}>
                                                                                    <LiveUpdate {...liveProps} propertyName='color' renderValue={color =>
                                                                                        <div
                                                                                            style={{ backgroundColor: color.toHexString() }}
                                                                                            className={styles.colorPreview}
                                                                                        />
                                                                                    } updateValue={color => this.updateField(r => entity.color = color)}>
                                                                                        {renderLiveUpdateMark =>
                                                                                            <Stack horizontal>
                                                                                                <StackItem>
                                                                                                    <CalloutColorPicker
                                                                                                        color={entity.color}
                                                                                                        onChanged={color => this.updateField(r => entity.color = color)}
                                                                                                    />
                                                                                                </StackItem>
                                                                                                <StackItem grow>
                                                                                                    {renderLiveUpdateMark({ className: styles.colorLiveUpdateMark })}
                                                                                                </StackItem>
                                                                                            </Stack>
                                                                                        }
                                                                                    </LiveUpdate>
                                                                                </GridCol>
                                                                            }
                                                                            {enableTags &&
                                                                                <GridCol sm={4} lg={3} className={styles.tag}>
                                                                                    <LiveTextField
                                                                                        {...liveProps}
                                                                                        propertyName='tag'
                                                                                        rules={RefinerValue.TagValidations}
                                                                                        placeholder={strings.Field_RefinerValue_Tag.Placeholder}
                                                                                        maxLength={3}
                                                                                        disabled={isDeleted}
                                                                                        prefix="["
                                                                                        suffix="]"
                                                                                        styles={tagFieldstyles}
                                                                                        liveUpdateMarkClassName={styles.tagLiveUpdateMark}
                                                                                    />
                                                                                </GridCol>
                                                                            }
                                                                            {!isDragging &&
                                                                                <GridCol sm={5} lg={3} className={styles.commands}>
                                                                                    {multifilter(entity.events.get(), Entity.NotDeletedFilter, inverseFilter(Entity.NewAndGhostableFilter)).length > 0
                                                                                        ? <LiveToggle
                                                                                            {...liveProps}
                                                                                            className={styles.archiveToggle}
                                                                                            ariaLabel={strings.Field_RefinerValue_Archive.AriaLabel}
                                                                                            onText={strings.Field_RefinerValue_Archive.OnText}
                                                                                            offText={strings.Field_RefinerValue_Archive.OffText}
                                                                                            tooltip={strings.Field_RefinerValue_Archive.Tooltip}
                                                                                            propertyName='isActive'
                                                                                        />
                                                                                        : (!isDeleted &&
                                                                                            <TooltipHost content={strings.Command_DeleteRefinerValue.Tooltip}>
                                                                                                <IconButton
                                                                                                    iconProps={{ iconName: 'Delete' }}
                                                                                                    ariaLabel={strings.Command_DeleteRefinerValue.AriaLabel}
                                                                                                    onClick={() => { this.updateField(e => entity.delete()); }}
                                                                                                />
                                                                                            </TooltipHost>
                                                                                        )
                                                                                    }
                                                                                </GridCol>
                                                                            }
                                                                        </GridRow>
                                                                    </ResponsiveGrid>
                                                                </StackItem>
                                                            </Stack>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        }}</LiveRelationship>
                                        {placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <ActionButton iconProps={{ iconName: 'Add' }} onClick={() => {
                            const value = new RefinerValue();
                            const maxOrder = max(values.map(v => v.order));
                            value.order = isFinite(maxOrder) ? maxOrder + 1 : 0;
                            this.updateField(refiner => refiner.values.add(value));
                        }}>{strings.Command_AddRefinerValue.Text}</ActionButton>
                    </GridCol>

                </GridRow>
                <GridRow>
                    <GridCol sm={12}>
                        <ListItemTechnicals entity={this.entity} />
                    </GridCol>
                </GridRow>
            </ResponsiveGrid>
        );
    }

    protected renderDisplayHeader(): JSX.Element {
        return (
            <div className={styles.header}>
                <Text block className={styles.text} role="heading" aria-level={1}>{this.title}</Text>
                <LiveUpdate entity={this.entity}>{renderLiveUpdateMark => renderLiveUpdateMark({ className: styles.liveUpdateMark })}</LiveUpdate>
            </div>
        );
    }

    protected buildDisplayHeaderCommands(): ICommandBarItemProps[] {
        const { [DirectoryService]: { currentUserIsSiteAdmin } } = this.props.services;
        const onEdit = () => { this.edit(); };

        const canEdit = currentUserIsSiteAdmin;

        const editCommand: ICommandBarItemProps = {
            key: 'edit',
            text: strings.Command_Edit.Text,
            iconProps: { iconName: 'Edit' },
            onClick: onEdit
        };

        return [
            canEdit && editCommand
        ].filter(Boolean);
    }

    protected buildEditHeaderCommands(): ICommandBarItemProps[] {
        const { [DirectoryService]: { currentUserIsSiteAdmin } } = this.props.services;
        const { submitting } = this.state;
        const { isDeleted, isNew } = this.entity;
        const onSubmit = () => this.submit(() => this.dismiss());
        const onConfirmDiscard = () => this.confirmDiscard();
        const onDelete = () => this.confirmDelete();

        const saveCommand: ICommandBarItemProps = {
            key: 'save',
            text: strings.Command_Save.Text,
            iconProps: { iconName: 'Save' },
            disabled: submitting,
            onClick: onSubmit
        };

        const discardCommand: ICommandBarItemProps = {
            key: 'discard',
            text: strings.Command_Discard.Text,
            iconProps: { iconName: 'Cancel' },
            onClick: onConfirmDiscard
        };

        const deleteCommand: ICommandBarItemProps = {
            key: 'delete',
            text: strings.Command_Delete.Text,
            iconProps: { iconName: 'Delete' },
            disabled: isDeleted,
            onClick: onDelete
        };

        const canDelete = !isNew && currentUserIsSiteAdmin;

        return [
            saveCommand,
            discardCommand,
            canDelete && deleteCommand
        ].filter(Boolean);
    }
}

export default withServices(RefinerPanel);