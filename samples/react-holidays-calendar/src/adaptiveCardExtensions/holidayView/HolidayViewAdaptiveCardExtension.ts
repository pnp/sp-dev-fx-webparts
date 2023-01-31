import { ItemSuccessQuickView } from "./quickView/ItemSuccessQuickView";

import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseAdaptiveCardExtension } from "@microsoft/sp-adaptive-card-extension-base";
import { CardView } from "./cardView/CardView";
import { QuickView } from "./quickView/QuickView";
import { HolidayViewPropertyPane } from "./HolidayViewPropertyPane";
import { SPService } from "../../common/services/SPService";
import { GraphService } from "../../common/services/GraphService";
import { HolidaysCalendarService } from "../../common/services/HolidaysCalendarService";
import { IHoliday, IHolidayItem } from "../../common/interfaces/HolidaysCalendar";
import * as moment from "moment";
import { IEmployeeInfo } from "../../webparts/holidaysCalendar/interfaces/IHolidaysCalendarState";
import { ItemFailureQuickView } from "./quickView/ItemFailureQuickView";

export interface IHolidayViewAdaptiveCardExtensionProps {
	title: string;
}

export interface IHolidayViewAdaptiveCardExtensionState {
	holidayItems: IHolidayItem[];
	listItems: IHoliday[];
	currentIndex: number;
	holidayService: HolidaysCalendarService;
	employeeInfo: IEmployeeInfo;
}

const CARD_VIEW_REGISTRY_ID: string = "HolidayView_CARD_VIEW";
export const QUICK_VIEW_REGISTRY_ID: string = "HolidayView_QUICK_VIEW";
export const ITEMSUCCESS_QUICK_VIEW_REGISTRY_ID: string = "ItemSuccess_Quick_VIEW";
export const ITEMFAILURE_QUICK_VIEW_REGISTRY_ID: string = "ItemFailure_Quick_VIEW";
export default class HolidayViewAdaptiveCardExtension extends BaseAdaptiveCardExtension<
	IHolidayViewAdaptiveCardExtensionProps,
	IHolidayViewAdaptiveCardExtensionState
> {
	private _deferredPropertyPane: HolidayViewPropertyPane | undefined;
	private spService: SPService;
	private graphService: GraphService;
	private holidayService: HolidaysCalendarService;
	public async onInit(): Promise<void> {
		this.spService = new SPService(this.context);
		this.graphService = new GraphService(this.context);
		this.holidayService = new HolidaysCalendarService(this.spService, this.graphService);
		const employeeInfo = await this.holidayService.getEmployeeInfo();

		const listItems = await this.holidayService.getHolidaysByLocation(employeeInfo.officeLocation);
		const holidayItems = this.holidayService.getHolidayItemsToRender(listItems);
		const upcomingHoliday = holidayItems.filter((item) => moment().isBefore(item.holidayDate.value, "days"));
		const upcomingHolidayIndex = upcomingHoliday.length > 0 ? holidayItems.findIndex((item) => item.Id == upcomingHoliday[0].Id) : 0;

		this.state = {
			holidayItems: holidayItems,
			listItems: listItems,
			currentIndex: upcomingHolidayIndex,
			holidayService: this.holidayService,
			employeeInfo: employeeInfo,
		};

		this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
		this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
		this.quickViewNavigator.register(ITEMSUCCESS_QUICK_VIEW_REGISTRY_ID, () => new ItemSuccessQuickView());
		this.quickViewNavigator.register(ITEMFAILURE_QUICK_VIEW_REGISTRY_ID, () => new ItemFailureQuickView());
		return Promise.resolve();
	}

	protected loadPropertyPaneResources(): Promise<void> {
		return import(
			/* webpackChunkName: 'HolidayView-property-pane'*/
			"./HolidayViewPropertyPane"
		).then((component) => {
			this._deferredPropertyPane = new component.HolidayViewPropertyPane();
		});
	}

	protected renderCard(): string | undefined {
		return CARD_VIEW_REGISTRY_ID;
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return this._deferredPropertyPane?.getPropertyPaneConfiguration();
	}
}
