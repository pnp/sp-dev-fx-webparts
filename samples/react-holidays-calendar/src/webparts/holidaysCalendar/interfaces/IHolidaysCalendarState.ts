import { ColumnDefinition } from "@fluentui/react-components/unstable";
import { IHolidayItem, IHoliday } from "../../../common/interfaces/HolidaysCalendar";

export interface IEmployeeInfo {
	eMail: string;
	id: string;
	officeLocation: string;
	timezone: string;
	displayName: string;
}
export interface IHolidaysCalendarState {
	listItems: IHoliday[];
	holidayListItems: IHolidayItem[];
	message: {
		show: boolean;
		intent: "success" | "error";
	};
	employeeInfo: IEmployeeInfo;
	columns: ColumnDefinition<IHolidayItem>[];
}
