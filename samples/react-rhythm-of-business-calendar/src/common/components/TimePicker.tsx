import React, { FC, FormEvent, useCallback, useMemo } from "react";
import { duration, Duration } from "moment-timezone";
import { css, DefaultButton, Dropdown, IDropdownOption, Label } from "@fluentui/react";
import { now } from "common";

import styles from "./styles/TimePicker.module.scss";

const HoursOptions: IDropdownOption[] = [
    { key: 1, text: '1' },
    { key: 2, text: '2' },
    { key: 3, text: '3' },
    { key: 4, text: '4' },
    { key: 5, text: '5' },
    { key: 6, text: '6' },
    { key: 7, text: '7' },
    { key: 8, text: '8' },
    { key: 9, text: '9' },
    { key: 10, text: '10' },
    { key: 11, text: '11' },
    { key: 0, text: '12' }
];

const MinutesOptions: IDropdownOption[] = [
    { key: 0, text: '00' },
    { key: 15, text: '15' },
    { key: 30, text: '30' },
    { key: 45, text: '45' },
];

export interface ITimePickerProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    ariaLabel?: string;
    required?: boolean;
    value: Duration;
    onChange: (value: Duration) => void;
}

export const TimePicker: FC<ITimePickerProps> = ({
    className,
    disabled,
    label,
    ariaLabel = label,
    required = false,
    value = duration({ hours: now().hours() }),
    onChange

}) => {
    const time = useMemo(() => {
        return {
            hour: value.hours() % 12,
            minute: Math.floor(value.minutes() / 15) * 15, // round down to the closest 15-minute increment
            ampm: value.hours() >= 12
        };
    }, [value]);

    const constructDuration = useCallback((hour: number, minute: number, ampm: boolean) =>
        duration({ hours: hour + (ampm ? 12 : 0), minutes: minute })
        , []);

    const onHourChanged = useCallback((ev: FormEvent, option: IDropdownOption) => {
        const newHour = option.key as number;
        onChange(constructDuration(newHour, time.minute, time.ampm));
    }, [time, onChange, constructDuration]);

    const onMinuteChanged = useCallback((ev: FormEvent, option: IDropdownOption) => {
        const newMinute = option.key as number;
        onChange(constructDuration(time.hour, newMinute, time.ampm));
    }, [time, onChange, constructDuration]);

    const onAMPMClicked = useCallback(() => {
        onChange(constructDuration(time.hour, time.minute, !time.ampm));
    }, [time, onChange, constructDuration]);

    return (
        <div className={css(styles.timePicker, className)}>
            {label && <Label aria-label={ariaLabel} required={required}>{label}</Label>}
            <div className={styles.controls}>
                <Dropdown
                    ariaLabel={label ? "set hour for " + label : "set hour for the time"}
                    disabled={disabled}
                    options={HoursOptions}
                    selectedKey={time.hour}
                    onChange={onHourChanged}
                />
                <Dropdown
                    ariaLabel={label ? "set minutes for " + label : "set minutes for the time"}
                    disabled={disabled}
                    options={MinutesOptions}
                    selectedKey={time.minute}
                    onChange={onMinuteChanged}
                />
                <DefaultButton
                    ariaLabel={time.ampm ? 'PM' : 'AM'}
                    disabled={disabled}
                    onClick={onAMPMClicked}
                >
                    {time.ampm ? 'PM' : 'AM'}
                </DefaultButton>
            </div>
        </div>
    );
};