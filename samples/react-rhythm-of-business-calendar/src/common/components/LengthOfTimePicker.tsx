import { duration, Duration } from "moment-timezone";
import React, { FC } from "react";
import { Dropdown, IDropdownOption, Label } from "@fluentui/react";
import { ResponsiveGrid, GridRow, GridCol } from "./ResponsiveGrid";

interface IProps {
    label?: string;
    value: Duration;
    className?: string;
    onChanged: (val: Duration) => void;
}

const hoursDropDownOptions: IDropdownOption[] = [
    { key: 0, text: '-' },
    { key: 1, text: '1 hour' },
    { key: 2, text: '2 hours' },
    { key: 3, text: '3 hours' },
    { key: 4, text: '4 hours' },
    { key: 5, text: '5 hours' },
    { key: 6, text: '6 hours' },
    { key: 7, text: '7 hours' },
    { key: 8, text: '8 hours' }
];

const minutesDropDownOptions: IDropdownOption[] = [
    { key: 0, text: '0 minutes' },
    { key: 5, text: '5 minutes' },
    { key: 10, text: '10 minutes' },
    { key: 15, text: '15 minutes' },
    { key: 20, text: '20 minutes' },
    { key: 25, text: '25 minutes' },
    { key: 30, text: '30 minutes' },
    { key: 35, text: '35 minutes' },
    { key: 40, text: '40 minutes' },
    { key: 45, text: '45 minutes' },
    { key: 50, text: '50 minutes' },
    { key: 55, text: '55 minutes' },
];

export const LengthOfTimePicker: FC<IProps> = ({ label, value, className, onChanged }) => {
    const hours = value.isValid() ? Math.min(value.hours(), 8) : 0;
    const minutes = value.isValid() ? Math.floor(value.minutes() / 5) * 5 : 0; // round down to the closest 5-minute increment

    const onHoursChanged = (option: IDropdownOption) => {
        const newHours = option.key as number;
        onChanged(duration({ hours: newHours, minutes }));
    };

    const onMinutesChanged = (option: IDropdownOption) => {
        const newMinutes = option.key as number;
        onChanged(duration({ hours, minutes: newMinutes }));
    };

    return (
        <ResponsiveGrid className={className}>
            {label &&
                <GridRow>
                    <GridCol><Label>{label}</Label></GridCol>
                </GridRow>
            }
            <GridRow>
                <GridCol sm={12} lg={5}>
                    <Dropdown
                        aria-label={"hours"}
                        selectedKey={hours}
                        options={hoursDropDownOptions}
                        onChange={(ev, opt) => onHoursChanged(opt)}
                    />
                </GridCol>
                <GridCol sm={12} lg={7}>
                    <Dropdown
                        aria-label={"minutes"}
                        selectedKey={minutes}
                        options={minutesDropDownOptions}
                        onChange={(ev, opt) => onMinutesChanged(opt)}
                    />
                </GridCol>
            </GridRow>
        </ResponsiveGrid>
    );
};