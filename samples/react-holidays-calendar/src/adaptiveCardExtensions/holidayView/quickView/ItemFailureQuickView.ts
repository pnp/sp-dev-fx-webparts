import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from "@microsoft/sp-adaptive-card-extension-base";

import { IHolidayViewAdaptiveCardExtensionProps, IHolidayViewAdaptiveCardExtensionState } from "../HolidayViewAdaptiveCardExtension";

export interface IQuickViewData {
	holidayTitle: string;
	detail: string;
}

export class ItemFailureQuickView extends BaseAdaptiveCardView<IHolidayViewAdaptiveCardExtensionProps, IHolidayViewAdaptiveCardExtensionState, IQuickViewData> {
	public get data(): IQuickViewData {
		return {
			holidayTitle: this.state.holidayItems[this.state.currentIndex].holidayTitle.label,
			detail: this.state.holidayItems[this.state.currentIndex].holidayDay.label + " " + this.state.holidayItems[this.state.currentIndex].holidayDate.label,
		};
	}
	public onAction(action: IActionArguments): void {
		if (action.type === "Submit") {
			const { id } = action.data;
			if (id === "back") {
				this.quickViewNavigator.pop();
			}
		}
	}
	public get template(): ISPFxAdaptiveCard {
		return require("./template/ItemFailureTemplate.json");
	}
}
