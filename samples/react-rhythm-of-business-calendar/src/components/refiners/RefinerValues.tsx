import React, { FC, FormEvent, useCallback, useMemo } from "react";
import { ActionButton, Checkbox, FocusZone, FontSizes, FontWeights, IButtonStyles, ICheckboxStyles, IconButton, IIconProps, IStackTokens, Stack, StackItem, TooltipHost, useTheme } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { Refiner, RefinerValue } from "model";
import { Color, Entity, multifilter } from "common";
import { OnRefinerSelectionChanged } from "./OnRefinerSelectionChanged";
import { RefinerCheckbox } from "./RefinerCheckbox";

import { Refiner as strings } from "ComponentStrings";

import styles from "./RefinerValues.module.scss";

const expandedIcon: IIconProps = { iconName: 'ChevronDown' };
const collapsedIcon: IIconProps = { iconName: 'ChevronRight' };
const editIcon: IIconProps = { iconName: 'Edit' };

const headingStackTokens: IStackTokens = { childrenGap: 8 };
const refinerValuesStackTokens: IStackTokens = { childrenGap: 6, maxWidth: 250 };

const headingStyles: IButtonStyles = {
    root: { padding: 0 },
    textContainer: { fontWeight: 500 },
    icon: { margin: 2 }
};
const selectAllValuesStyles: ICheckboxStyles = {
    root: { marginRight: 32 },
    text: { fontSize: FontSizes.size12, fontWeight: FontWeights.semibold }
};
const refinerValueStyles: ICheckboxStyles = {
    root: { marginRight: 32 },
    text: { fontSize: FontSizes.size12 }
};

interface IProps {
    editingEnabled: boolean;
    refiner: Refiner;
    selectedValues: Set<RefinerValue>;
    onSelectionChanged: OnRefinerSelectionChanged;
    onEdit: (refiner: Refiner) => void;
}

export const RefinerValues: FC<IProps> = ({
    editingEnabled,
    refiner,
    selectedValues,
    onSelectionChanged,
    onEdit
}) => {
    const { displayName, required, initiallyExpanded, enableColors, blankValue } = refiner;

    const showBlankValue = !required;

    const { palette: { themePrimary } } = useTheme();
    const blankValueColor = useMemo(() => Color.parse(themePrimary), [themePrimary]);

    const values = multifilter(refiner.values.get(), Entity.NotDeletedFilter, RefinerValue.ActiveFilter);
    const allAreSelected = values.every(v => selectedValues.has(v)) && (!showBlankValue || selectedValues.has(blankValue));

    const toggleSelectAll = useCallback((ev: FormEvent, checked: boolean) => {
        onSelectionChanged({
            added: checked ? [blankValue, ...values] : [],
            removed: !checked ? [blankValue, ...values] : []
        });
    }, [blankValue, values, onSelectionChanged]);

    const valueChanged = useCallback((value: RefinerValue, checked: boolean) => {
        onSelectionChanged({
            added: checked ? [value] : [],
            removed: !checked ? [value] : []
        });
    }, [onSelectionChanged]);

    const onClickEdit = useCallback(
        () => editingEnabled && onEdit(refiner),
        [refiner, editingEnabled, onEdit]
    );

    const [expanded, { toggle: toggleExpanded }] = useBoolean(initiallyExpanded);

    return (
        <Stack tokens={refinerValuesStackTokens}>
            <FocusZone>
                <Stack horizontal verticalAlign="center" tokens={headingStackTokens} className={styles.heading}>
                    <StackItem grow>
                        <ActionButton iconProps={!expanded ? collapsedIcon : expandedIcon} styles={headingStyles} onClick={toggleExpanded}>
                            {displayName}
                        </ActionButton>
                    </StackItem>
                    {editingEnabled &&
                        <StackItem className={styles.editContainer}>
                            <TooltipHost content={strings.Command_Edit.Tooltip}>
                                <IconButton className={styles.edit} iconProps={editIcon} onClick={onClickEdit} ariaLabel={strings.Command_Edit.AriaLabel} />
                            </TooltipHost>
                        </StackItem>
                    }
                </Stack>
            </FocusZone>
            {expanded && <FocusZone>
                <Stack tokens={refinerValuesStackTokens}>
                    <Checkbox
                        checked={allAreSelected}
                        label={strings.SelectAll}
                        onChange={toggleSelectAll}
                        styles={selectAllValuesStyles}
                    />
                    {showBlankValue &&
                        <RefinerCheckbox
                            label={strings.Blank}
                            value={blankValue}
                            enableColors={enableColors}
                            overrideColor={blankValueColor}
                            checked={selectedValues.has(blankValue)}
                            onCheckChanged={valueChanged}
                            styles={refinerValueStyles}
                        />
                    }
                    {values.map((value, idx) =>
                        <RefinerCheckbox
                            key={idx}
                            value={value}
                            enableColors={enableColors}
                            checked={selectedValues.has(value)}
                            onCheckChanged={valueChanged}
                            styles={refinerValueStyles}
                        />
                    )}
                </Stack>
            </FocusZone>}
        </Stack>
    );
};