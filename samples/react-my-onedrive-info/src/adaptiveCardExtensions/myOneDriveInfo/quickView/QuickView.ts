import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from "@microsoft/sp-adaptive-card-extension-base";

import { IMyOneDriveInfoAdaptiveCardExtensionProps, IMyOneDriveInfoAdaptiveCardExtensionState } from "../MyOneDriveInfoAdaptiveCardExtension";
import { HelperService } from "../services/HelperService";

export interface IQuickViewData {
	driveType: string;
	lastModifiedBy: string;
	lastModifiedDateTime: string;
	totalSize: string;
	deletedSize: string;
	usedSize: string;
	remainingSize: string;
	state: string;
	webUrl: string;
}

export class QuickView extends BaseAdaptiveCardView<IMyOneDriveInfoAdaptiveCardExtensionProps, IMyOneDriveInfoAdaptiveCardExtensionState, IQuickViewData> {
	public get data(): IQuickViewData {
		const driveDetails = this.state.myDriveDetails;
		return {
			driveType: driveDetails?.driveType ?? "",
			lastModifiedBy: driveDetails?.lastModifiedBy?.user?.displayName ?? "",
			lastModifiedDateTime: driveDetails?.lastModifiedDateTime ? new Date(driveDetails.lastModifiedDateTime).toLocaleString() : "",
			totalSize: driveDetails?.quota?.total ? `${HelperService.calculateSpace(driveDetails.quota.total).spaceString}` : "",
			deletedSize: driveDetails?.quota?.deleted ? `${HelperService.calculateSpace(driveDetails.quota.deleted).spaceString}` : "-",
			usedSize: driveDetails?.quota?.used ? `${HelperService.calculateSpace(driveDetails.quota.used).spaceString}` : "-",
			remainingSize: driveDetails?.quota?.remaining ? `${HelperService.calculateSpace(driveDetails.quota.remaining).spaceString}` : "-",
			state: driveDetails?.quota?.state ?? "",
			webUrl: driveDetails?.webUrl ?? "",
		};
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/QuickViewTemplate.json");
	}
}
