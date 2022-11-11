import { remove } from 'lodash';
import React, { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { IDropdownProps, Dropdown, Stack, IDropdownOption, IDropdown, useTheme, IDropdownStyles, ICheckStyleProps } from '@fluentui/react';
import { ValidationRule } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import { InfoTooltip } from './InfoTooltip';
import LiveUpdate, { ITransformer, NonTransformer } from './LiveUpdate';
import { getCurrentValue, LiveType, RelType, setValue } from './LiveUtils';
import { Validation } from './Validation';

interface IProps<E extends ListItemEntity<any>, P extends keyof E> extends IDropdownProps {
    entity: E;
    propertyName: P;
    getKeyFromValue: (val: RelType<E, P>) => string | number;
    renderValue?: (val: LiveType<E, P>) => ReactNode;
    transformer?: ITransformer<LiveType<E, P>>;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    autoFocus?: boolean;
    tooltip?: string;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveMultiselectDropdown = <E extends ListItemEntity<any>, P extends keyof E>(props: IProps<E, P>) => {
    const {
        entity,
        propertyName,
        getKeyFromValue,
        renderValue: customValueRenderer,
        transformer = new NonTransformer(),
        rules,
        showValidationFeedback,
        autoFocus,
        label,
        ariaLabel = label,
        tooltip,
        updateField
    } = props;

    const values = transformer.transform(getCurrentValue(entity, propertyName));
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, transformer.reverse(val))), [updateField, propertyName]);
    const renderValue = useCallback((val: LiveType<E, P>) => <>{customValueRenderer(val)}</>, [customValueRenderer]);
    const onChange = useCallback((ev, { selected, data, key }: IDropdownOption) =>
        updateField(e => {
            const value = (data || key) as LiveType<E, P>;

            if (selected)
                (values as any).push(value);
            else
                remove(values as any, v => v === value);

            setValue(e, propertyName, transformer.reverse(values));
        }),
        [updateField, propertyName, values]
    );

    const keys = (values as any).map(getKeyFromValue);

    const dropDownRef = useRef<IDropdown>();
    useEffect(() => { if (autoFocus) dropDownRef.current?.focus(); }, [autoFocus]);

    const { palette: { neutralDark, neutralPrimary } } = useTheme();

    const fixHighContrastThemeStyles = useMemo(() => {
        return {
            subComponentStyles: {
                multiSelectItem: ({ checked }: ICheckStyleProps) => {
                    return {
                        label: { color: checked ? neutralDark : neutralPrimary }
                    };
                }
            }
        } as IDropdownStyles;
    }, [neutralDark, neutralPrimary]);

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} transformer={transformer} updateValue={updateValue} renderValue={renderValue}>
                {(renderLiveUpdateMark) =>
                    <Dropdown
                        {...props}
                        componentRef={dropDownRef}
                        ariaLabel={ariaLabel}
                        onRenderLabel={(textFieldProps, defaultRender) =>
                            <Stack horizontal>
                                <InfoTooltip text={tooltip}>{defaultRender(textFieldProps)}</InfoTooltip>
                                {renderLiveUpdateMark()}
                            </Stack>}
                        multiSelect
                        selectedKeys={keys}
                        onChange={onChange}
                        styles={fixHighContrastThemeStyles}
                    />
                }
            </LiveUpdate>
        </Validation>
    );
};

export default LiveMultiselectDropdown;
