import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseAdaptiveCardExtension } from "@microsoft/sp-adaptive-card-extension-base";
import { CardView } from "./cardView/CardView";
import { QuickView } from "./quickView/QuickView";
import { MyOneDriveInfoPropertyPane } from "./MyOneDriveInfoPropertyPane";
import { GraphService } from "./services/GraphService";
import { Drive } from "@microsoft/microsoft-graph-types";

export interface IMyOneDriveInfoAdaptiveCardExtensionProps {
	title: string;
	quickViewButtonLabel: string;
}

export interface IMyOneDriveInfoAdaptiveCardExtensionState {
	myDriveDetails: Drive;
	hasError: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any;
}

const CARD_VIEW_REGISTRY_ID: string = "MyOneDriveInfo_CARD_VIEW";
export const QUICK_VIEW_REGISTRY_ID: string = "MyOneDriveInfo_QUICK_VIEW";

export default class MyOneDriveInfoAdaptiveCardExtension extends BaseAdaptiveCardExtension<
	IMyOneDriveInfoAdaptiveCardExtensionProps,
	IMyOneDriveInfoAdaptiveCardExtensionState
> {
	private _deferredPropertyPane: MyOneDriveInfoPropertyPane | undefined;
	private graphService: GraphService;
	public async onInit(): Promise<void> {
		this.graphService = new GraphService(this.context);
		try {
			const myDriveInfo = await this.graphService.getMyDriveInfo();
			this.state = {
				myDriveDetails: myDriveInfo,
				hasError: false,
				error: null,
			};
		} catch (ex) {
			this.state = {
				myDriveDetails: null,
				hasError: true,
				error: ex,
			};
		}

		this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
		this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

		return Promise.resolve();
	}

	protected loadPropertyPaneResources(): Promise<void> {
		return import(
			/* webpackChunkName: 'MyOneDriveInfo-property-pane'*/
			"./MyOneDriveInfoPropertyPane"
		).then((component) => {
			this._deferredPropertyPane = new component.MyOneDriveInfoPropertyPane();
		});
	}

	protected renderCard(): string | undefined {
		return CARD_VIEW_REGISTRY_ID;
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return this._deferredPropertyPane?.getPropertyPaneConfiguration();
	}
}
