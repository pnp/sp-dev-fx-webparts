import { weekdays } from "moment-timezone";
import React, { FC, FormEvent, useCallback } from "react";
import { Checkbox } from "@fluentui/react";

const weekdayStrings = weekdays();

interface IProps {
    day: number;
    included: boolean;
    onIncludedChanged: (day: number, included: boolean) => void;
}

export const WeekdayCheckbox: FC<IProps> = ({ day, included, onIncludedChanged }) => {
    const onChange = useCallback((ev: FormEvent, val: boolean) =>
        onIncludedChanged(day, val),
        [day, onIncludedChanged]
    );

    return <Checkbox
        label={weekdayStrings[day]}
        checked={included}
        onChange={onChange}
    />;
};