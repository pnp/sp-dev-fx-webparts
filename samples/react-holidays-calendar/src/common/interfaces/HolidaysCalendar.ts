export interface IHolidaysListProps {
	items: IHolidayItem[];
	onCalendarAddClick: (itemId: number) => void;
	onDownloadItems: () => void;
	showDownload: boolean;
	showFixedOptional: boolean;
	title: string;
}

type HolidayTitleCell = {
	label: string;
};

type HolidayDateCell = {
	value: Date;
	label: string;
};

type HolidayDayCell = {
	label: string;
};
type HolidayTypeCell = {
	optional: boolean;
};

// type HolidayActionCell = {
// 	icon: JSX.Element;
// };

export type IHolidayItem = {
	holidayTitle: HolidayTitleCell;
	holidayDate: HolidayDateCell;
	holidayDay: HolidayDayCell;
	holidayType: HolidayTypeCell;
	Id: number;
};
export interface IHoliday {
	Id: number;
	Title: string;
	Date: Date;
	Location: string;
	Optional: boolean;
}
