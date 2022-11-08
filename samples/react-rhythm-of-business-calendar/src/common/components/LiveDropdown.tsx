import { first } from 'lodash';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { IDropdownProps, Dropdown, Stack, IDropdownOption, IDropdown } from '@fluentui/react';
import { ValidationRule } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import { InfoTooltip } from './InfoTooltip';
import LiveUpdate, { ITransformer, NonTransformer } from './LiveUpdate';
import { getCurrentValue, LiveType, RelType, setValue } from './LiveUtils';
import { Validation } from './Validation';

const firstOrItem = <T extends {}>(item: T | T[]): T =>
    item instanceof Array ? first(item) : item;

interface IProps<E extends ListItemEntity<any>, P extends keyof E> extends IDropdownProps {
    entity: E;
    propertyName: P;
    getKeyFromValue: (val: RelType<E, P>) => (string | number);
    renderValue?: (val: LiveType<E, P>) => ReactNode;
    transformer?: ITransformer<LiveType<E, P>>;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    autoFocus?: boolean;
    tooltip?: string;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveDropdown = <E extends ListItemEntity<any>, P extends keyof E>(props: IProps<E, P>) => {
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

    const value = firstOrItem(transformer.transform(getCurrentValue(entity, propertyName)));
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, transformer.reverse(val))), [updateField, propertyName]);
    const renderValue = useCallback((val: LiveType<E, P>) => <>{customValueRenderer(val)}</>, [customValueRenderer]);
    const onChange = useCallback((ev, { data, key }: IDropdownOption) =>
        updateField(e => {
            const value = (data || key) as LiveType<E, P>;
            setValue(e, propertyName, transformer.reverse(value instanceof Array ? [value] as any : value));
        }),
        [updateField, propertyName, value]
    );

    const key = getKeyFromValue(value as RelType<E, P>);

    const dropDownRef = useRef<IDropdown>();
    useEffect(() => { if (autoFocus) dropDownRef.current?.focus(); }, [autoFocus]);

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
                        multiSelect={false}
                        selectedKey={key}
                        onChange={onChange}
                    />
                }
            </LiveUpdate>
        </Validation>
    );
};

export default LiveDropdown;
