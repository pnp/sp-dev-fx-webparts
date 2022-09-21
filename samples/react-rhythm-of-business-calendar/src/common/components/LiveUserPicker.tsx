import { last } from 'lodash';
import React, { useCallback } from 'react';
import { ILabelStyles, Label, Stack } from '@fluentui/react';
import { PropsOfType, ValidationRule, User } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import { InfoTooltip } from './InfoTooltip';
import LiveUpdate from './LiveUpdate';
import { getCurrentValue, LiveType, setValue } from './LiveUtils';
import { Validation } from './Validation';
import UserPicker, { IUserPickerProps } from './UserPicker';

const labelStyles: ILabelStyles = {
    root: { display: 'inline-block' }
};

interface IProps<E extends ListItemEntity<any>, P extends PropsOfType<E, User> | PropsOfType<E, User[]>> extends Omit<IUserPickerProps, 'users' | 'onChanged'> {
    entity: E;
    propertyName: P;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    label?: string;
    tooltip?: string;
    required?: boolean;
    onUsersChanging?: (users: User[]) => User[];
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveUserPicker = <E extends ListItemEntity<any>, P extends PropsOfType<E, User> | PropsOfType<E, User[]>>(props: IProps<E, P>) => {
    const {
        entity,
        propertyName,
        rules,
        showValidationFeedback,
        label,
        tooltip,
        required,
        onUsersChanging = users => users,
        updateField
    } = props;

    const value = getCurrentValue(entity, propertyName) as (User | User[]);
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, val)), [updateField, propertyName]);
    const renderValue = useCallback((val: LiveType<E, P>) => Array.isArray(val) ? (val as User[]).map((v, idx) => <span key={idx}>{idx > 0 ? '; ' : ''}{v.title}</span>) : (val as User)?.title || '', []);
    const onChanged = useCallback((users: User[]) => {
        users = onUsersChanging(users);
        updateField(e => setValue(e, propertyName, (Array.isArray(value) ? users : last(users)) as LiveType<E, P>));
    }, [onUsersChanging, updateField, propertyName, value]);

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} updateValue={updateValue} renderValue={renderValue}>
                {(renderLiveUpdateMark) => <>
                    {label && <Stack horizontal>
                        <InfoTooltip text={tooltip}><Label required={required} styles={labelStyles}>{label}</Label></InfoTooltip>
                        {renderLiveUpdateMark()}
                    </Stack>}
                    <UserPicker
                        {...props}
                        label={undefined}
                        ariaLabel={label}
                        required={required}
                        users={Array.isArray(value) ? value : [value]}
                        onChanged={onChanged}
                    />
                    {!label && renderLiveUpdateMark()}
                </>}
            </LiveUpdate>
        </Validation>
    );
};

export default LiveUserPicker;
