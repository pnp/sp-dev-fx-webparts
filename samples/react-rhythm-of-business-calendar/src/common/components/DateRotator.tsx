import { Moment } from "moment-timezone";
import React, { FC } from "react";
import { IconButton, DateRangeType, Stack, IStyle, IIconProps, StackItem, FocusZone } from "@fluentui/react";
import { CalendarPicker } from "./CalendarPicker";

import { DateRotator as strings } from 'CommonStrings';

const styles = {
    root: {
        maxWidth: 300,
        width: '100%'
    } as IStyle
};

const defaultPreviousIconProps: IIconProps = { iconName: 'ChevronLeft' };
const defaultNextIconProps: IIconProps = { iconName: 'ChevronRight' };

interface IProps {
    date: Moment;
    dateString: string;
    dateRangeType?: DateRangeType;
    previousIconProps?: IIconProps;
    nextIconProps?: IIconProps;
    onPrevious: () => void;
    onNext: () => void;
    onDateChanged: (date: Moment) => void;
}

export const DateRotator: FC<IProps> = ({
    date,
    dateString,
    dateRangeType,
    previousIconProps = defaultPreviousIconProps,
    nextIconProps = defaultNextIconProps,
    onPrevious,
    onNext,
    onDateChanged
}) =>
    <FocusZone>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={styles}>
            <IconButton
                iconProps={previousIconProps}
                title={strings.PreviousDateButton.Text}
                onClick={onPrevious}
            />
            <IconButton
                iconProps={nextIconProps}
                title={strings.NextDateButton.Text}
                onClick={onNext}
            />
            <StackItem grow align="center">
                <CalendarPicker
                    buttonLabel={dateString}
                    date={date}
                    dateRangeType={dateRangeType}
                    onSelectDate={onDateChanged}
                />
            </StackItem>
        </Stack>
    </FocusZone>