import {
	BasePrimaryTextCardView,
	IPrimaryTextCardParameters,
	IExternalLinkCardAction,
	IQuickViewCardAction,
	ICardButton,
	IActionArguments,
} from "@microsoft/sp-adaptive-card-extension-base";

import { IHolidayViewAdaptiveCardExtensionProps, IHolidayViewAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from "../HolidayViewAdaptiveCardExtension";

export class CardView extends BasePrimaryTextCardView<IHolidayViewAdaptiveCardExtensionProps, IHolidayViewAdaptiveCardExtensionState> {
	public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
		const buttons: ICardButton[] = [];

		if (this.state.currentIndex > 0) {
			buttons.push({
				title: "Previous",
				action: {
					type: "Submit",
					parameters: {
						id: "previous",
						op: -1,
					},
				},
			});
		}

		if (this.state.currentIndex < this.state.holidayItems.length - 1) {
			buttons.push({
				title: "Next",
				action: {
					type: "Submit",
					parameters: {
						id: "next",
						op: 1, // Increment the index
					},
				},
			});
		}
		return buttons as [ICardButton] | [ICardButton, ICardButton];
	}

	public onAction(action: IActionArguments): void {
		if (action.type === "Submit") {
			const { id, op } = action.data;
			switch (id) {
				case "previous":
				case "next":
					this.setState({ currentIndex: this.state.currentIndex + op });
					break;
			}
		}
	}
	public get data(): IPrimaryTextCardParameters {
		const item = this.state.holidayItems[this.state.currentIndex];
		return {
			primaryText: item.holidayTitle.label,
			description: item.holidayDay.label + " " + item.holidayDate.label,
			title: "Holidays",
			iconProperty: "Calendar",
		};
	}

	public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
		return {
			type: "QuickView",
			parameters: {
				view: QUICK_VIEW_REGISTRY_ID,
			},
		};
	}
}
