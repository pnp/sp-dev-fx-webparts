import React, { ReactNode, useCallback, useMemo } from 'react';
import { ChoiceGroup, IChoiceGroupProps, Stack, Label, IChoiceGroupOption, useTheme, IChoiceGroupOptionStyles, concatStyleSets } from '@fluentui/react';
import { ValidationRule } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import LiveUpdate from './LiveUpdate';
import { getCurrentValue, LiveType, setValue } from './LiveUtils';
import { Validation } from './Validation';

interface IProps<E extends ListItemEntity<any>, P extends keyof E> extends IChoiceGroupProps {
    entity: E;
    propertyName: P;
    getKeyFromValue: (val: LiveType<E, P>) => string;
    getTextFromValue: (val: LiveType<E, P>) => string;
    getValueFromKey: (key: string) => LiveType<E, P>;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
    renderValue?: (val: LiveType<E, P>) => ReactNode;
}

const LiveChoiceGroup = <E extends ListItemEntity<any>, P extends keyof E>(props: IProps<E, P>) => {
    const {
        entity,
        propertyName,
        getKeyFromValue,
        getTextFromValue,
        getValueFromKey,
        rules,
        showValidationFeedback,
        label,
        required,
        updateField,
        renderValue,
        options
    } = props;

    const value = getCurrentValue(entity, propertyName);
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, val)), [updateField, propertyName]);
    const renderValueCallback = useCallback((val: LiveType<E, P>) => <>{getTextFromValue(val)}</>, [getTextFromValue]);
    const localRenderValue = renderValue || renderValueCallback;
    const onChange = useCallback((ev, val: IChoiceGroupOption) => updateField(e => setValue(e, propertyName, getValueFromKey(val.key))), [updateField, propertyName, getValueFromKey]);

    const { palette: { neutralLighterAlt } } = useTheme();
    const fixHighContrastThemeStyle = useMemo(() => {
        return {
            root: { backgroundColor: neutralLighterAlt }
        } as IChoiceGroupOptionStyles;
    }, [neutralLighterAlt]);

    options.forEach(option => option.styles = concatStyleSets(fixHighContrastThemeStyle, option.styles));

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} updateValue={updateValue} renderValue={localRenderValue}>
                {(renderLiveUpdateMark) => <>
                    <Stack horizontal>
                        <Label required={required}>{label}</Label>
                        {renderLiveUpdateMark()}
                    </Stack>
                    <ChoiceGroup
                        {...props}
                        label={undefined}
                        selectedKey={getKeyFromValue(value)}
                        onChange={onChange}
                    />
                </>}
            </LiveUpdate>
        </Validation>
    );
};

export default LiveChoiceGroup;
