import { Duration } from 'moment-timezone';
import React, { useCallback } from 'react';
import { Label, Stack } from '@fluentui/react';
import { ValidationRule, PropsOfType, now } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import { InfoTooltip } from './InfoTooltip';
import LiveUpdate from './LiveUpdate';
import { ITimePickerProps, TimePicker } from './TimePicker';
import { Validation } from './Validation';
import { getCurrentValue, LiveType, setValue } from './LiveUtils';

type DataType = Duration;

interface IProps<E extends ListItemEntity<any>, P extends PropsOfType<E, T>, T extends DataType> extends Omit<ITimePickerProps, 'value' | 'onChange'> {
    entity: E;
    propertyName: P;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    tooltip?: string;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveTimePicker = <E extends ListItemEntity<any>, P extends PropsOfType<E, T>, T extends DataType>(props: IProps<E, P, T>) => {
    const {
        entity,
        propertyName,
        rules,
        showValidationFeedback,
        label,
        ariaLabel = label,
        tooltip,
        required,
        updateField
    } = props;

    const value = getCurrentValue(entity, propertyName) as T;
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, val)), [updateField, propertyName]);
    const renderValue = useCallback((val: LiveType<E, P>) => <span>{now().startOf('day').add(val as Duration).format('LT')}</span>, []);
    const onChange = useCallback((value: Duration) => updateField(e => setValue(e, propertyName, value as LiveType<E, P>)), [updateField, propertyName]);

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} updateValue={updateValue} renderValue={renderValue}>
                {(renderLiveUpdateMark) => <>
                    {label && <Stack horizontal>
                        <InfoTooltip text={tooltip}><Label required={required}>{label}</Label></InfoTooltip>
                        {renderLiveUpdateMark()}
                    </Stack>}
                    <TimePicker
                        {...props}
                        label={undefined}
                        ariaLabel={ariaLabel}
                        value={value}
                        onChange={onChange}
                    />
                    {!label && renderLiveUpdateMark()}
                </>}
            </LiveUpdate>
        </Validation>
    );
};

export default LiveTimePicker;
