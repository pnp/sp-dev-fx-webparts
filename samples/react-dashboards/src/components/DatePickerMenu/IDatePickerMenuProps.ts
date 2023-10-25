import { IDropdownOption } from "@fluentui/react";

export interface IDatePickerMenuProps {
    onDateSelected: (dateSelection: string) => void;
    timeSpanMenus: IDropdownOption[];
    initialValue: string;
    cultureName: string;
}