import { isEqualWith, noop } from 'lodash';
import { duration, Moment } from 'moment-timezone';
import React, { FC, ReactNode, createRef, useState, memo, useMemo, CSSProperties } from 'react';
import { format, IconButton, IButtonProps, Stack, ActionButton, Text, Persona, PersonaSize, IStackTokens, useTheme, IButtonStyles, concatStyleSets, TooltipHost, ICalloutContentStyles, IFocusTrapZoneProps, FocusTrapCallout, FocusZone } from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';
import { LocationFillIcon } from '@fluentui/react-icons-mdl2';
import { now, PropsOfType, stateIsEqualCustomizer, stopPropagation, User } from 'common';
import { useDirectoryService } from 'common/services';
import { ListItemEntity } from 'common/sharepoint';
import { getCurrentValue, getHasPreviousValue, getHasSnapshotValue, getPreviousValue, getSnapshotValue, LiveType } from './LiveUtils';

import { LiveUpdate as strings } from "CommonStrings";

import styles from './styles/LiveComponents.module.scss';

export type StateType = 'current' | 'previous' | 'snapshot';

const DefaultRecentlyModifiedWindow = duration(15, 'minutes');
const humanizeDurationFromNow = (time: Moment) => duration(time.diff(now())).humanize(true);

const editorStackTokens: IStackTokens = { childrenGap: 8 };
const calloutStackTokens: IStackTokens = { childrenGap: 24 };
const valueComparisonStackTokens: IStackTokens = { childrenGap: 8, padding: '0 0 0 26px' };
const calloutStyles: Partial<ICalloutContentStyles> = { calloutMain: { padding: 1 } };

const EditorDetails: FC<{ label: string, editor: User, modified: Moment }> = memo(({ label, editor, modified }) => {
    const { title, email, picture } = editor;

    return (
        <Stack tokens={editorStackTokens}>
            <Text block variant="small" data-is-focusable>{label}, {humanizeDurationFromNow(modified)}</Text>
            <Persona imageUrl={picture} text={title} secondaryText={email} showSecondaryText size={PersonaSize.size32} data-is-focusable />
        </Stack>
    );
});

export type ILiveUpdateMarkProps = IButtonProps;

export interface ITransformer<T> {
    transform: (val: T) => T;
    reverse: (val: T) => T;
}

export class NonTransformer<T> implements ITransformer<T> {
    public transform(val: T) { return val; }
    public reverse(val: T) { return val; }
}

export interface ILiveUpdateStyles {
    entity: IButtonStyles;
    field: IButtonStyles;
}

interface IProps<E extends ListItemEntity<any>, P extends PropsOfType<E, any>> {
    entity: E;
    propertyName?: P;
    onlyShowEntityLifetimeEvents?: boolean;
    transformer?: ITransformer<LiveType<E, P>>;
    liveUpdateMarkStyles?: Partial<ILiveUpdateStyles>;
    compact?: boolean;
    updateValue?: (val: LiveType<E, P>) => void;
    renderValue?: (val: LiveType<E, P>, state: StateType) => ReactNode;
    children: (renderLiveUpdateMark: (props?: ILiveUpdateMarkProps) => ReactNode) => ReactNode;
}

const LiveUpdate = <E extends ListItemEntity<any>, P extends PropsOfType<E, any>>({
    entity,
    propertyName,
    onlyShowEntityLifetimeEvents = false,
    transformer = new NonTransformer(),
    liveUpdateMarkStyles,
    compact = false,
    updateValue = noop,
    renderValue = val => <>{val}</>,
    children
}: IProps<E, P>) => {
    const { palette: { themePrimary } } = useTheme();
    const { currentUser } = useDirectoryService();
    const PeopleIconButtonRef = createRef<HTMLElement>();
    const [isCalloutOpen, setCalloutOpen] = useState(false);
    const toggleCallout = stopPropagation(() => setCalloutOpen(!isCalloutOpen));
    const closeCallout = () => setCalloutOpen(false);

    const hasPropertyName = !!propertyName;
    const { editor, created, modified, isNew, isDeleted } = entity;
    const isMyOwnChange = isNew || (editor && User.equal(editor, currentUser));
    const isRecentlyModified = modified.isSameOrAfter(now().subtract(DefaultRecentlyModifiedWindow));
    const hasSnapshot = getHasSnapshotValue(entity, propertyName);
    const hasPrevious = getHasPreviousValue(entity, propertyName) && (isCalloutOpen || hasSnapshot || isRecentlyModified);
    const isNewItem = isRecentlyModified && modified.isSame(created);

    const currentValue = transformer.transform(getCurrentValue(entity, propertyName));
    const previousValue = (hasPrevious && hasPropertyName) ? transformer.transform(getPreviousValue(entity, propertyName)) : undefined;
    const snapshotValue = (hasSnapshot && hasPropertyName) ? transformer.transform(getSnapshotValue(entity, propertyName)) : undefined;

    const previousValueChanged = hasPrevious && (!hasPropertyName || !isEqualWith(previousValue, hasSnapshot ? snapshotValue : currentValue, stateIsEqualCustomizer));
    const snapshotValueChanged = (hasSnapshot && hasPropertyName && !isEqualWith(currentValue, snapshotValue, stateIsEqualCustomizer));

    const defaultStyles: ILiveUpdateStyles = useMemo(() => {
        return {
            entity: {
                root: { color: themePrimary, height: 25 },
                label: { fontSize: 12, margin: 0 }
            },
            field: {
                root: { position: 'relative', top: 2, right: -2, height: 22, width: 22 },
                icon: { fontSize: 12 }
            }
        };
    }, [themePrimary]);

    const currentChangeDotStyle: CSSProperties = useMemo(() => {
        return { color: themePrimary, position: 'absolute', left: 0, top: 2 };
    }, [themePrimary]);

    const renderLiveUpdateMark = (props: ILiveUpdateMarkProps = {}) => {
        const entityLiveUpdateMarkStyles = concatStyleSets(defaultStyles.entity, liveUpdateMarkStyles?.entity, props.styles);
        const fieldLiveUpdateMarkStyles = concatStyleSets(defaultStyles.field, liveUpdateMarkStyles?.field, props.styles);

        if (!isMyOwnChange) {
            if (isNewItem && !hasPropertyName) {
                return (
                    <TooltipHost content={strings.RecentlyAddedMarkTooltip}>
                        <ActionButton
                            {...props}
                            elementRef={PeopleIconButtonRef}
                            iconProps={{ iconName: "LocationFill" }}
                            onClick={toggleCallout}
                            styles={entityLiveUpdateMarkStyles}
                            text={compact ? undefined : strings.New}
                            ariaLabel={strings.RecentlyAddedMarkTooltip}
                        />
                    </TooltipHost>
                );
            } else if (isDeleted && !hasPropertyName) {
                return (
                    <TooltipHost content={strings.RecentlyDeletedMarkTooltip}>
                        <ActionButton
                            {...props}
                            elementRef={PeopleIconButtonRef}
                            iconProps={{ iconName: "LocationFill" }}
                            title={strings.RecentlyDeletedMarkTooltip}
                            onClick={toggleCallout}
                            styles={entityLiveUpdateMarkStyles}
                            text={compact ? undefined : strings.Deleted}
                            ariaLabel={strings.RecentlyDeletedMarkTooltip}
                        />
                    </TooltipHost>
                );
            } else if (previousValueChanged && !isDeleted && !onlyShowEntityLifetimeEvents) {
                if (!hasPropertyName) {
                    return (
                        <TooltipHost content={strings.RecentlyEditedMarkTooltip}>
                            <ActionButton
                                {...props}
                                elementRef={PeopleIconButtonRef}
                                iconProps={{ iconName: "LocationFill" }}
                                onClick={toggleCallout}
                                styles={entityLiveUpdateMarkStyles}
                                text={compact ? undefined : strings.Updated}
                                ariaLabel={strings.RecentlyEditedMarkTooltip}
                            />
                        </TooltipHost>
                    );
                } else {
                    return (
                        <TooltipHost content={strings.RecentlyEditedMarkTooltip}>
                            <IconButton
                                {...props}
                                elementRef={PeopleIconButtonRef}
                                iconProps={{ iconName: "FieldChanged" }}
                                styles={fieldLiveUpdateMarkStyles}
                                ariaLabel={strings.RecentlyEditedMarkTooltip}
                                onClick={toggleCallout}
                            />
                        </TooltipHost>
                    );
                }
            }
        }

        return <></>;
    };
    const onRevertToOriginal = () => { updateValue(transformer.reverse(previousValue)); closeCallout(); };
    const onUndelete = () => { entity.undelete(); updateValue(transformer.reverse(currentValue)); closeCallout(); };
    const onTakeTheirs = () => { updateValue(transformer.reverse(snapshotValue)); closeCallout(); };
    const onKeepCurrent = closeCallout;

    const { ItemWasAdded, ItemWasDeleted, ItemWasEdited } = strings.Callout;

    const focusTrapProps = useConst<IFocusTrapZoneProps>({
        isClickableOutsideFocusTrap: true,
        forceFocusInsideTrap: false,
    });

    return <>
        {children(renderLiveUpdateMark)}
        {(isNewItem || previousValueChanged) && isCalloutOpen &&
            <FocusTrapCallout
                className={styles.callout}
                styles={calloutStyles}
                gapSpace={0}
                target={PeopleIconButtonRef}
                onDismiss={closeCallout}
                setInitialFocus
                focusTrapProps={focusTrapProps}
            >
                <FocusZone isCircularNavigation>
                    {!hasPropertyName &&
                        <Stack tokens={valueComparisonStackTokens}>
                            <Stack horizontal verticalAlign="center" tokens={editorStackTokens}>
                                <Persona imageUrl={editor?.picture} hidePersonaDetails size={PersonaSize.size24} />
                                <Text block variant="small" data-is-focusable>
                                    {format(
                                        isNewItem ? ItemWasAdded : (isDeleted ? ItemWasDeleted : ItemWasEdited),
                                        editor?.title,
                                        humanizeDurationFromNow(modified)
                                    )}
                                </Text>
                            </Stack>
                            {isDeleted && hasSnapshot &&
                                <ActionButton iconProps={{ iconName: "History" }} onClick={onUndelete}>
                                    {strings.Callout.UndeleteButton.Text}
                                </ActionButton>
                            }
                        </Stack>
                    }

                    {hasPropertyName &&
                        <Stack tokens={calloutStackTokens}>
                            {snapshotValueChanged &&
                                <Stack tokens={valueComparisonStackTokens}>
                                    <Text block variant="large" data-is-focusable>
                                        <Text style={currentChangeDotStyle}><LocationFillIcon /></Text>
                                        {renderValue(currentValue, 'current')}
                                    </Text>
                                    <Text block variant="small" data-is-focusable>{strings.Callout.MyChangeLabel}</Text>
                                    <ActionButton
                                        iconProps={{ iconName: "CheckMark" }}
                                        onClick={onKeepCurrent}
                                        text={strings.Callout.KeepMineButton.Text}
                                    />
                                </Stack>
                            }
                            <Stack tokens={valueComparisonStackTokens}>
                                <Text block variant="large" data-is-focusable>
                                    {!snapshotValueChanged && <Text style={currentChangeDotStyle}><LocationFillIcon /></Text>}
                                    {renderValue(hasSnapshot ? snapshotValue : currentValue, hasSnapshot ? 'snapshot' : 'current')}
                                </Text>
                                <EditorDetails
                                    label={strings.Callout.TheirChangeLabel}
                                    editor={hasSnapshot ? entity.snapshotValue("editor") : editor}
                                    modified={hasSnapshot ? entity.snapshotValue('modified') : modified}
                                />
                                {hasSnapshot && (snapshotValueChanged
                                    ? <ActionButton iconProps={{ iconName: "ReminderGroup" }} onClick={onTakeTheirs}>
                                        {strings.Callout.TakeTheirsButton.Text}
                                    </ActionButton>
                                    : <ActionButton iconProps={{ iconName: "CheckMark" }} onClick={onKeepCurrent}>
                                        {strings.Callout.KeepTheirsButton.Text}
                                    </ActionButton>
                                )}
                            </Stack>
                            <Stack tokens={valueComparisonStackTokens}>
                                <Text block variant="large" data-is-focusable>
                                    {renderValue(previousValue, 'previous')}
                                </Text>
                                <EditorDetails
                                    label={strings.Callout.OriginalLabel}
                                    editor={entity.previousValue("editor")}
                                    modified={entity.previousValue('modified')}
                                />
                                {hasSnapshot &&
                                    <ActionButton iconProps={{ iconName: "History" }} onClick={onRevertToOriginal}>
                                        {strings.Callout.RevertToOriginalButton.Text}
                                    </ActionButton>
                                }
                            </Stack>
                        </Stack>
                    }
                </FocusZone>
            </FocusTrapCallout>
        }
    </>;
};

export default LiveUpdate;
