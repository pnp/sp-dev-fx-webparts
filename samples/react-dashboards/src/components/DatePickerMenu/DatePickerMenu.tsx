import { Dropdown, IDropdownOption, Stack, Text } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import stringsCommon from "CommonDasboardWebPartStrings";
import * as React from "react";
import { datePickerStyles, stackTokens } from "../../common/ComponentStyles";
import TimeHelper from "../../common/TimeHelper";
import styles from "./CommonControl.module.scss";
import DatePickerCallout from "./DatePickerCallout";
import { IDatePickerMenuProps } from "./IDatePickerMenuProps";

const DatePickerMenu: React.FunctionComponent<IDatePickerMenuProps> = (props) => {
    const dropDownId = useId("callout-button");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [timespanMenus, setTimeSpanMenus] = React.useState<IDropdownOption<any>[]>(props.timeSpanMenus);
    const [selTimeSpan, setSelTimeSpan] = React.useState<string>("");
    const [prevTimeSpan, setPrevTimeSpan] = React.useState<string>("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _getDateSpanOption = (startDateTime: Date, endDateTime: Date, key: string): IDropdownOption<any> => {
        const start = TimeHelper.getFormattedDateTime({
            datetime: startDateTime.toUTCString(),
            cultureName: props.cultureName,
        });
        const end = TimeHelper.getFormattedDateTime({
            datetime: endDateTime.toUTCString(),
            cultureName: props.cultureName,
        });
        return {
            text: `${start} - ${end}`,
            key: key
        };
    }

    React.useEffect((): void => {

        if (props.initialValue) {
            const tsMenus = timespanMenus;
            const initDateSpanKey = tsMenus.find(o => o.key === props.initialValue);
            if (initDateSpanKey !== undefined) {
                setSelTimeSpan(props.initialValue);
            }
            else {
                const dates = props.initialValue.split('-');
                if (dates.length === 2) {
                    const tsMenusOption = _getDateSpanOption(
                        new Date(Number(dates[0])),
                        new Date(Number(dates[1])),
                        props.initialValue);
                    tsMenus.push(tsMenusOption);
                    setTimeSpanMenus(tsMenus);
                    setSelTimeSpan(props.initialValue);
                }
            }
        }
    }, [props.initialValue]);

    const _onDateSelected = (startDateTime: Date, endDateTime: Date): void => {
        //startDateTime, endDateTime = local time
        const newTimeSpanKey = `${startDateTime.getTime()}-${endDateTime.getTime()}`;

        if (timespanMenus.find(o => o.key === newTimeSpanKey) === undefined) {
            const tsMenusOption = _getDateSpanOption(startDateTime, endDateTime, newTimeSpanKey);
            timespanMenus.push(tsMenusOption);
            setTimeSpanMenus(timespanMenus);
        }
        setSelTimeSpan(newTimeSpanKey);

        props.onDateSelected(newTimeSpanKey);
    }
    const _onDateCancelled = (): void => {
        setSelTimeSpan(prevTimeSpan);
        props.onDateSelected(prevTimeSpan);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTimeSpanMenuClick = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number): void => {
        const selectedKey = option.key.toString();
        if (selectedKey === "Custom"){
            setPrevTimeSpan(selTimeSpan);
            setSelTimeSpan(selectedKey);
        }
        else{
            setSelTimeSpan(selectedKey);
            props.onDateSelected(selectedKey);
        }
    };


    return (
        <Stack
            horizontal={true}
            styles={datePickerStyles.stack}
            tokens={stackTokens}
        >
            <Text styles={datePickerStyles.text}>{stringsCommon.DatePicker_TimeSpan}</Text>
            <Dropdown
                id={dropDownId}
                className={styles.datePickerDropDown}
                dropdownWidth="auto"
                options={timespanMenus}
                selectedKey={selTimeSpan}
                onChange={handleTimeSpanMenuClick}
            />
            {selTimeSpan === "Custom"
                && <DatePickerCallout
                    dropDownId={dropDownId}
                    cultureName={props.cultureName}
                    onDateSelected={_onDateSelected}
                    onCancel={_onDateCancelled}
                />
            }
        </Stack>
    );
};
export default DatePickerMenu;
