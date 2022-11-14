import React, { useCallback } from 'react';
import { Toggle, IToggleProps, IToggleStyles, IButtonStyles } from '@fluentui/react';
import { ValidationRule, PropsOfType } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import { InfoTooltip } from './InfoTooltip';
import LiveUpdate from './LiveUpdate';
import { getCurrentValue, LiveType, setValue } from './LiveUtils';
import { Validation } from './Validation';

import * as strings from "CommonStrings";
import { useConst } from '@fluentui/react-hooks';

type DataType = boolean;

const toggleStyles: Partial<IToggleStyles> = {
    label: { paddingBottom: 10 }
};

interface IProps<E extends ListItemEntity<any>, P extends PropsOfType<E, DataType>> extends IToggleProps {
    entity: E;
    propertyName: P;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    tooltip?: string;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveToggle = <E extends ListItemEntity<any>, P extends PropsOfType<E, DataType>>(props: IProps<E, P>) => {
    const {
        entity,
        propertyName,
        rules,
        showValidationFeedback,
        label,
        ariaLabel = typeof label === 'string' ? label : undefined,
        tooltip,
        onText,
        offText,
        updateField
    } = props;

    const value = getCurrentValue(entity, propertyName) as DataType;
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, val)), [updateField, propertyName]);
    const renderValue = useCallback((val: LiveType<E, P>) => <>{val ? (onText || strings.LiveUpdate.Toggle.OnText) : (offText || strings.LiveUpdate.Toggle.OffText)}</>, [onText, offText]);
    const onChange = useCallback((ev, val: DataType) => updateField(e => setValue(e, propertyName, val as LiveType<E, P>)), [updateField, propertyName]);

    const liveUpdateMarkStylesNoLabel: IButtonStyles = useConst({
        root: { position: 'absolute', right: -5, top: 5 }
    });

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} updateValue={updateValue} renderValue={renderValue}>
                {(renderLiveUpdateMark) => <>
                    <InfoTooltip text={!label ? tooltip : undefined} hideIcon>
                        <Toggle
                            {...props}
                            ariaLabel={ariaLabel}
                            label={label && <>
                                <InfoTooltip text={tooltip}>{label}</InfoTooltip>
                                {renderLiveUpdateMark()}
                            </>}
                            styles={toggleStyles}
                            checked={value}
                            onChange={onChange}
                        />
                        {!label && renderLiveUpdateMark({ styles: liveUpdateMarkStylesNoLabel })}
                    </InfoTooltip>
                </>}
            </LiveUpdate>
        </Validation>
    );
};

export default LiveToggle;
