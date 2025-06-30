import { addDays, Callout, DayOfWeek, DefaultButton, defaultDatePickerStrings, MessageBar, MessageBarType, PrimaryButton, Stack } from "@fluentui/react";
import { DateConvention, DateTimePicker, TimeConvention } from '@pnp/spfx-controls-react/';
import stringsCommon from "CommonDasboardWebPartStrings";
import moment from "moment";
import React from "react";
import { stackTokens } from "../../common/ComponentStyles";
import TimeHelper from "../../common/TimeHelper";
import styles from "./CommonControl.module.scss";

export interface IDatePickerCalloutProps {
    dropDownId: string;
    cultureName: string;
    onDateSelected: (startDateTime: Date, endDateTime: Date) => void;
    onCancel: () => void;
}
const today: Date = new Date(Date.now());
const startMaxDate: Date = addDays(today, -1);  // moment(startDateTime).startOf('day').toDate().toUTCString(),
const minDate: Date = addDays(today, -90);

const DatePickerCallout: React.FunctionComponent<IDatePickerCalloutProps> = (props) => {
    const firstDayOfWeek: DayOfWeek = TimeHelper.getFirstDayOfWeek(props.cultureName);

    const [startDateTime, setStartDateTime] = React.useState<Date>(moment(startMaxDate).startOf('day').toDate());
    const [endDateTime, setEndDateTime] = React.useState<Date>(moment(today).endOf('day').toDate());
    const [isDateSpanErr, setDateSpanErr] = React.useState<boolean>(false);

    React.useEffect((): void => {
        if (startDateTime !== null && endDateTime !== null) {
            if (startDateTime >= endDateTime) {
                setDateSpanErr(true);
            }
            else {
                setDateSpanErr(false);
            }
        }
    }, [startDateTime, endDateTime]);

    const handleStartChange = (dateTime: Date): void => {
        setStartDateTime(dateTime);
    }

    const handleEndChange = (dateTime: Date): void => {
        setEndDateTime(dateTime);
    }

    const handleButtonSave=():void=>{
        props.onDateSelected(startDateTime, endDateTime);
    }

    return <Callout
        target={`#${props.dropDownId}`}
        className={styles.datePickerCallout}
    >
        <Stack tokens={stackTokens} >
            {isDateSpanErr &&
                <MessageBar messageBarType={MessageBarType.error}>{stringsCommon.DatePicker_Error}</MessageBar>
            }
            <DateTimePicker
                label={stringsCommon.DatePicker_StartDate}
                dateConvention={DateConvention.DateTime}
                timeConvention={TimeConvention.Hours24}
                firstDayOfWeek={firstDayOfWeek}
                minDate={minDate}
                maxDate={startMaxDate}
                value={startDateTime}
                allowTextInput={true}
                formatDate={(date?: Date) => {
                    return TimeHelper.getFormattedDate({
                        datetime: date.toUTCString(),
                        cultureName: props.cultureName,
                    });
                }}
                onChange={handleStartChange}
                strings={{ ...defaultDatePickerStrings, timeSeparator: ':' }}

            />
            <DateTimePicker
                label={stringsCommon.DatePicker_EndDate}
                dateConvention={DateConvention.DateTime}
                timeConvention={TimeConvention.Hours24}
                firstDayOfWeek={firstDayOfWeek}
                minDate={minDate}
                maxDate={today}
                value={endDateTime}
                allowTextInput={true}
                formatDate={(date?: Date) => {
                    return TimeHelper.getFormattedDate({
                        datetime: date.toUTCString(),
                        cultureName: props.cultureName,
                    });
                }}
                onChange={handleEndChange}
                strings={{ ...defaultDatePickerStrings, timeSeparator: ':' }}
            />
            <Stack className={styles.datePickerRow} horizontal={true} tokens={stackTokens} horizontalAlign="end">
                <PrimaryButton
                    text={stringsCommon.DatePicker_BtnSave}
                    disabled={isDateSpanErr}
                    onClick={handleButtonSave}
                    />
                <DefaultButton
                    text={stringsCommon.DatePicker_BtnCancel}
                    onClick={props.onCancel}
                />
            </Stack>
        </Stack>
    </Callout>
}

export default DatePickerCallout;