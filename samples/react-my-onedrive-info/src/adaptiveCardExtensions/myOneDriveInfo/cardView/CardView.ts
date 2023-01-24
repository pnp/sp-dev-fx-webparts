import { round } from "@microsoft/sp-lodash-subset";
import {
	BaseBasicCardView,
	IBasicCardParameters,
	IExternalLinkCardAction,
	IQuickViewCardAction,
	ICardButton,
} from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from "MyOneDriveInfoAdaptiveCardExtensionStrings";
import {
	IMyOneDriveInfoAdaptiveCardExtensionProps,
	IMyOneDriveInfoAdaptiveCardExtensionState,
	QUICK_VIEW_REGISTRY_ID,
} from "../MyOneDriveInfoAdaptiveCardExtension";
import { HelperService } from "../services/HelperService";

export class CardView extends BaseBasicCardView<IMyOneDriveInfoAdaptiveCardExtensionProps, IMyOneDriveInfoAdaptiveCardExtensionState> {
	public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
		if (this.state.hasError) return undefined;
		else
			return [
				{
					title: this.properties.quickViewButtonLabel ?? strings.QuickViewButton,
					action: {
						type: "QuickView",
						parameters: {
							view: QUICK_VIEW_REGISTRY_ID,
						},
					},
				},
			];
	}

	public get data(): IBasicCardParameters {
		const driveInfo = this.state.myDriveDetails;
		const usedSpace = HelperService.calculateSpace(driveInfo.quota.used).space;
		const usedSpaceString = HelperService.calculateSpace(driveInfo.quota.used).spaceString;
		const totalSpace = HelperService.calculateSpace(driveInfo.quota.total).space;
		const totalSpaceString = HelperService.calculateSpace(driveInfo.quota.total).spaceString;

		const usedPercentage = !isNaN(usedSpace / totalSpace) ? round((usedSpace / totalSpace) * 100, 2) : 0;
		return {
			primaryText: this.state.hasError
				? strings.Error
				: Boolean(totalSpace) && Boolean(usedSpace)
				? `Storage used \n ${usedPercentage}% (${usedSpaceString} of ${totalSpaceString})`
				: strings.Error,
			title: this.properties.title,
			iconProperty: require("./../assets/OneDriveLogo.svg"),
		};
	}

	public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
		return undefined;
	}
}
