import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import * as strings from "MyOneDriveInfoAdaptiveCardExtensionStrings";

export class MyOneDriveInfoPropertyPane {
	public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: { description: strings.PropertyPaneDescription },
					groups: [
						{
							groupFields: [
								PropertyPaneTextField("title", {
									label: strings.TitleFieldLabel,
								}),
								PropertyPaneTextField("quickViewButtonLabel", {
									label: strings.QuickViewButtonLabel,
								}),
							],
						},
					],
				},
			],
		};
	}
}
