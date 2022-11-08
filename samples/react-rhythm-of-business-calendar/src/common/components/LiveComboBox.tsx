import React, { FormEvent, useCallback, useEffect, useRef } from 'react';
import { IComboBoxProps, ComboBox, Stack, IComboBox, IComboBoxOption, } from '@fluentui/react';
import { PropsOfType, ValidationRule } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import LiveUpdate from './LiveUpdate';
import { getCurrentValue, LiveType, setValue } from './LiveUtils';
import { Validation } from './Validation';

interface IProps<E extends ListItemEntity<any>, P extends PropsOfType<E, string>> extends IComboBoxProps {
    entity: E;
    propertyName: P;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    autoFocus?: boolean;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveComboBox = <E extends ListItemEntity<any>, P extends PropsOfType<E, string>>(props: IProps<E, P>) => {
    const {
        entity,
        propertyName,
        rules,
        showValidationFeedback,
        autoFocus,
        label,
        options,
        ariaLabel = label,
        updateField
    } = props;

    const value = getCurrentValue(entity, propertyName) as string;
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, val)), [updateField, propertyName]);
    const renderValue = useCallback((val: LiveType<E, P>) => <>{val || '-'}</>, []);
    const onChange = useCallback((ev: FormEvent<IComboBox>, option: IComboBoxOption, index: number, value: string) => updateField(e => {
        let newValue = '';
        if (option)
            newValue = option.text;
        else if (value)
            newValue = value;

        setValue(e, propertyName, newValue as LiveType<E, P>);
    }), [updateField, propertyName]);

    const dropDownRef = useRef<IComboBox>();
    useEffect(() => { if (autoFocus) dropDownRef.current?.focus(); }, [autoFocus]);

    const amendedOptions = options.some(opt => opt.key === value)
        ? options
        : [{ key: value, text: value }, ...options]

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} updateValue={updateValue} renderValue={renderValue}>
                {(renderLiveUpdateMark) =>
                    <ComboBox
                        {...props}
                        options={amendedOptions}
                        componentRef={dropDownRef}
                        ariaLabel={ariaLabel}
                        onRenderLabel={(textFieldProps, defaultRender) =>
                            <Stack horizontal>
                                {defaultRender(textFieldProps)}
                                {renderLiveUpdateMark()}
                            </Stack>}
                        selectedKey={value}
                        onChange={onChange}
                    />
                }
            </LiveUpdate>
        </Validation>
    );
};

export default LiveComboBox;
