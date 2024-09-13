import moment, { Moment } from 'moment-timezone';
import React, { useCallback } from 'react';
import { DatePicker, IDatePickerProps, Label, Stack } from '@fluentui/react';
import { ValidationRule, PropsOfType, now } from 'common';
import { ListItemEntity } from 'common/sharepoint';
import LiveUpdate from './LiveUpdate';
import { getCurrentValue, LiveType, setValue } from './LiveUtils';
import { Validation } from './Validation';

type DataType = Moment;

interface IProps<E extends ListItemEntity<any>, P extends PropsOfType<E, T>, T extends DataType> extends Omit<IDatePickerProps, 'value' | 'onSelectDate' | 'formatDate' | 'isRequired'> {
    entity: E;
    propertyName: P;
    required?: boolean;
    rules?: ValidationRule<E>[];
    showValidationFeedback?: boolean;
    formatMoment?: (date?: Moment) => string;
    updateField: (update: (data: E) => void, callback?: () => any) => void;
}

const LiveDatePicker = <E extends ListItemEntity<any>, P extends PropsOfType<E, T>, T extends DataType>(props: IProps<E, P, T>) => {
    const {
        entity,
        propertyName,
        rules,
        showValidationFeedback,
        label,
        ariaLabel = label,
        required,
        formatMoment = date => date?.isValid() ? date.format('l') : '',
        updateField
    } = props;

    const value = getCurrentValue(entity, propertyName) as T;
    //const Datenow = moment(now()).tz(value.tz()).format();
   
    const date1String = value && value.toString();
    const date2String = value && value.toDate().toString();

    // Create Moment objects with Moment Timezone

    const date1 = date1String && moment.tz(date1String, 'ddd MMM DD YYYY HH:mm:ss [GMT]Z');
    const date2 = date2String && moment.tz(date2String, 'ddd MMM DD YYYY HH:mm:ss [GMT]Z');
    let totalTime = 0;  
    // Calculate the time difference
    if(date1 && date2){ 

        const duration = moment.duration(date1.diff(date2));
        // Get the difference in hours, minutes, and seconds
        const hours = duration && duration.hours();
        const minutes = duration && duration.minutes();
        const seconds = duration && duration.seconds(); 
  
         totalTime= (hours * 3600 + minutes*60 + seconds)
    }
    const updateValue = useCallback((val: LiveType<E, P>) => updateField(e => setValue(e, propertyName, val)), [updateField, propertyName]);
    const renderValue = useCallback((val: LiveType<E, P>) => <span>{(val as DataType)?.isValid() ? (val as DataType).format('dddd, MMMM DD, YYYY') : ''}</span>, []);
    const formatDate = useCallback((val: Date) => formatMoment(moment(val)), [formatMoment]);
    const onChange = useCallback((value: Date) => updateField(e => setValue(e, propertyName, moment(value) as LiveType<E, P>)), [updateField, propertyName]);

    return (
        <Validation entity={entity} rules={rules} active={showValidationFeedback}>
            <LiveUpdate entity={entity} propertyName={propertyName} updateValue={updateValue} renderValue={renderValue}>
                {(renderLiveUpdateMark) => <>
                    {label && <Stack horizontal>
                        <Label required={required}>{label}</Label>
                        {renderLiveUpdateMark()}
                    </Stack>}
                    <DatePicker
                        {...props}
                        label={undefined}
                        ariaLabel={ariaLabel}
                        isRequired={!label && required}
                        formatDate={formatDate}
                        value={value?.isValid() && totalTime > 0 ? value && value.add(totalTime,'seconds').toDate() : value && value.add(totalTime,'seconds').toDate() }
                        onSelectDate={onChange}
                    />
                    {!label && renderLiveUpdateMark()}
                </>}
            </LiveUpdate>
        </Validation>
    );
};

export default LiveDatePicker;
