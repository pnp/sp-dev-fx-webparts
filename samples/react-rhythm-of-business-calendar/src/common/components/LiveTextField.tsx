import React, { useCallback } from 'react';
import { ITextFieldProps, TextField, Stack } from '@fluentui/react';
import { ValidationRule, PropsOfType } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import { InfoTooltip } from './InfoTooltip';
import LiveUpdate from './LiveUpdate';
import { getCurrentValue, LiveType, setValue } from './LiveUtils';
import { Validation } from './Validation';

type DataType = string | number;

interface IConverter<T> {
    parse: (val: string) => T;
    toString: (val: T) => string;
}

class NonConverter implements IConverter<string> {
    public parse(val: string) { return val; }
    public toString(val: string) { return val; }
}

interface IProps<E extends ListItemEntity<any>, P extends PropsOfType<E, DataType>> extends ITextFieldProps {
    entity: E;
    propertyName: P;
    converter?: IConverter<LiveType<E, P>>;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    liveUpdateMarkClassName?: string;
    tooltip?: string;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveTextField = <E extends ListItemEntity<any>, P extends PropsOfType<E, DataType>>(props: IProps<E, P>) => {
    const {
        entity,
        propertyName,
        converter = new NonConverter() as unknown as IConverter<LiveType<E, P>>,
        rules,
        showValidationFeedback,
        label,
        ariaLabel = label,
        liveUpdateMarkClassName,
        tooltip,
        updateField
    } = props;

    const value = converter.toString(getCurrentValue(entity, propertyName));
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, val)), [updateField, propertyName]);
    const renderValue = useCallback((val: LiveType<E, P>) => <>{(converter ? converter.toString(val) : val) || '-'}</>, [converter]);
    const onChange = useCallback((ev, val) => updateField(e => setValue(e, propertyName, converter ? converter.parse(val) : val as unknown as LiveType<E, P>)), [updateField, propertyName, converter]);

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} updateValue={updateValue} renderValue={renderValue}>
                {(renderLiveUpdateMark) => <>
                    <TextField
                        title={''}
                        {...props}
                        ariaLabel={ariaLabel}
                        onRenderLabel={(textFieldProps, defaultRender) => {
                            return label && <Stack horizontal>
                                <InfoTooltip text={tooltip}>{defaultRender(textFieldProps)}</InfoTooltip>
                                {renderLiveUpdateMark({ className: liveUpdateMarkClassName })}
                            </Stack>;
                        }}
                        value={value}
                        onChange={onChange}
                    />
                    {!label && renderLiveUpdateMark({ className: liveUpdateMarkClassName })}
                </>}
            </LiveUpdate>
        </Validation>
    );
};

export default LiveTextField;
