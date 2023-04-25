import { HolidaysListColumns, HolidaysListSelectColumns } from "../constants/constant";
import { ListName } from "../constants/constant";
import { GraphService } from "./GraphService";
import { SPService } from "./SPService";

import { Event as IEventType } from "@microsoft/microsoft-graph-types";
import * as moment from "moment";
import { IEmployeeInfo } from "../../webparts/holidaysCalendar/interfaces/IHolidaysCalendarState";
import { IHolidayItem, IHoliday } from "../interfaces/HolidaysCalendar";

export class HolidaysCalendarService {
	private spService: SPService;
	private graphService: GraphService;
	constructor(spService: SPService, graphService: GraphService) {
		this.spService = spService;
		this.graphService = graphService;
	}

	public getHolidayItemsToRender = (items: any[]): IHolidayItem[] => {
		const holidayItems: IHolidayItem[] = [];
		items.forEach((item) => {
			holidayItems.push({
				holidayTitle: {
					label: item.Title,
				},
				holidayDate: {
					value: item.Date,
					label: moment(item.Date).format("MMMM Do"),
				},
				holidayDay: {
					label: moment(item.Date).format("dddd"),
				},
				holidayType: {
					optional: item.Optional,
				},
				Id: item.Id,
			});
		});
		return holidayItems;
	};

	public getHolidayItemsToRender_ACE = (items: IHoliday[]): IHolidayItem[] => {
		const holidayItems: IHolidayItem[] = [];
		items.forEach((item) => {
			if (moment().isBefore(item.Date, "days")) {
				holidayItems.push({
					holidayTitle: {
						label: item.Title,
					},
					holidayDate: {
						value: item.Date,
						label: moment(item.Date).format("MMMM Do"),
					},
					holidayDay: {
						label: moment(item.Date).format("dddd"),
					},
					holidayType: {
						optional: item.Optional,
					},
					Id: item.Id,
				});
			}
		});
		return holidayItems;
	};

	public getHolidaysByLocation = async (location: string): Promise<IHoliday[]> => {
		const holidays: IHoliday[] = [];
		const filter = `${HolidaysListColumns.Location} eq '${location}'`;
		try {
			const listItems: any[] = await this.spService.getListItems(ListName.Holidays, filter, HolidaysListSelectColumns);

			listItems.forEach((listItem: any) => {
				const holiday: IHoliday = {
					Id: listItem.Id,
					Title: listItem.Title ?? null,
					Date: Boolean(listItem.Date) ? new Date(listItem.Date) : null,
					Location: listItem.Location ?? null,
					Optional: listItem.Optional,
				};
				holidays.push(holiday);
			});
			return Promise.resolve(holidays);
		} catch (ex) {
			return Promise.reject(holidays);
		}
	};

	public getEmployeeInfo = async (): Promise<IEmployeeInfo> => {
		const [myInformation, myTimeZone] = await Promise.all([this.graphService.getMyInformation(), this.graphService.getMyTimeZone()]);
		const employeeInformation = {} as IEmployeeInfo;
		employeeInformation.eMail = myInformation.mail;
		employeeInformation.id = myInformation.id;
		employeeInformation.officeLocation = myInformation.officeLocation;
		employeeInformation.displayName = myInformation.displayName;
		employeeInformation.timezone = myTimeZone;
		return Promise.resolve(employeeInformation);
	};
	public addLeaveInCalendar = async (employeeInfo: IEmployeeInfo, item: IHolidayItem): Promise<boolean> => {
		try {
			const eventDetail: IEventType = {};
			eventDetail.subject = item.holidayTitle.label ?? null;
			eventDetail.start = {
				dateTime: moment(item.holidayDate.value).format("YYYY-MM-DD") + "T00:00:00",
				timeZone: employeeInfo.timezone,
			};
			eventDetail.end = {
				dateTime: moment(item.holidayDate.value).format("YYYY-MM-DD") + "T23:59:59",
				timeZone: employeeInfo.timezone,
			};
			eventDetail.showAs = "oof";
			eventDetail.attendees = [
				{
					emailAddress: {
						address: employeeInfo.eMail,
						name: employeeInfo.displayName,
					},
				},
			];

			await this.graphService.createEvent(eventDetail);
			return Promise.resolve(true);
		} catch (ex) {
			return Promise.reject(false);
		}
	};

	public getItemsToDownloadAsCSV = (items: IHolidayItem[]) => {
		const itemsToExport: any[] = [];
		items.forEach((item) => {
			itemsToExport.push({
				Title: item.holidayTitle.label,
				Date: item.holidayDate.label,
				Day: item.holidayDay.label,
				IsOptional: item.holidayType.optional ? "Yes" : "No",
			});
		});

		const dataToDownload = {
			data: itemsToExport,
			filename: "HolidayCalendar",
			delimiter: ",",
			headers: ["Title", "Date", "Day", "IsOptional"],
		};

		return dataToDownload;
	};
}
