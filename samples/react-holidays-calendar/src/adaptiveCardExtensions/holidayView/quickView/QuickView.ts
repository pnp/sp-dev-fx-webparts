import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from "@microsoft/sp-adaptive-card-extension-base";

import { IHolidayViewAdaptiveCardExtensionProps, IHolidayViewAdaptiveCardExtensionState } from "../HolidayViewAdaptiveCardExtension";
import { ITEMSUCCESS_QUICK_VIEW_REGISTRY_ID, ITEMFAILURE_QUICK_VIEW_REGISTRY_ID } from "../HolidayViewAdaptiveCardExtension";
export interface IQuickViewData {
	holidayTitle: string;
	detail: string;
}

export class QuickView extends BaseAdaptiveCardView<IHolidayViewAdaptiveCardExtensionProps, IHolidayViewAdaptiveCardExtensionState, IQuickViewData> {
	public get data(): IQuickViewData {
		return {
			holidayTitle: this.state.holidayItems[this.state.currentIndex].holidayTitle.label,
			detail: this.state.holidayItems[this.state.currentIndex].holidayDay.label + " " + this.state.holidayItems[this.state.currentIndex].holidayDate.label,
		};
	}
	public onAction(action: IActionArguments): void {
		if (action.type === "Submit") {
			const { id } = action.data;
			if (id === "addInCalendar") {
				this.state.holidayService
					.addLeaveInCalendar(this.state.employeeInfo, this.state.holidayItems[this.state.currentIndex])
					.then((value) => this.quickViewNavigator.push(ITEMSUCCESS_QUICK_VIEW_REGISTRY_ID))
					.catch((ex) => {
						console.log(ex);
						this.quickViewNavigator.push(ITEMFAILURE_QUICK_VIEW_REGISTRY_ID);
					});
			}
		}
	}
	public get template(): ISPFxAdaptiveCard {
		return require("./template/QuickViewTemplate.json");
	}
}
