import React, { FormEvent, useCallback } from 'react';
import { Checkbox, ICheckboxProps, Stack } from '@fluentui/react';
import { ValidationRule, PropsOfType } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import LiveUpdate from './LiveUpdate';
import { getCurrentValue, LiveType, setValue } from './LiveUtils';
import { Validation } from './Validation';

type DataType = boolean;

interface IProps<E extends ListItemEntity<any>, P extends PropsOfType<E, T>, T extends DataType> extends ICheckboxProps {
    entity: E;
    propertyName: P;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveCheckbox = <E extends ListItemEntity<any>, P extends PropsOfType<E, T>, T extends DataType>(props: IProps<E, P, T>) => {
    const {
        entity,
        propertyName,
        rules,
        showValidationFeedback,
        label,
        ariaLabel = label,
        updateField
    } = props;

    const value = getCurrentValue(entity, propertyName) as T;
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, val)), [updateField, propertyName]);
    const onChange = useCallback((ev: FormEvent, checked: boolean) => updateField(e => setValue(e, propertyName, checked as LiveType<E, P>)), [updateField, propertyName]);

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} updateValue={updateValue}>
                {(renderLiveUpdateMark) =>
                    <Checkbox
                        {...props}
                        ariaLabel={ariaLabel}
                        onRenderLabel={(checkboxProps, defaultRender) => <>
                            <Stack horizontal>
                                {defaultRender(checkboxProps)}
                                {renderLiveUpdateMark()}
                            </Stack>
                        </>}
                        checked={value}
                        onChange={onChange}
                    />
                }
            </LiveUpdate>
        </Validation>
    );
};

export default LiveCheckbox;
