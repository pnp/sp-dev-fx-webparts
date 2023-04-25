import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "M365ServicesHealthWebPartStrings";
import M365ServicesHealth from "./components/M365ServicesHealth";
import { IM365ServicesHealthProps } from "./components/IM365ServicesHealthProps";
import { GraphService } from "../../common/services/GraphService";

export interface IM365ServicesHealthWebPartProps {
	title: string;
	height: number;
}

export default class M365ServicesHealthWebPart extends BaseClientSideWebPart<IM365ServicesHealthWebPartProps> {
	private graphService: GraphService;

	public render(): void {
		const element: React.ReactElement<IM365ServicesHealthProps> = React.createElement(M365ServicesHealth, {
			title: this.properties.title,
			context: this.context,
			graphService: this.graphService,
		});

		ReactDom.render(element, this.domElement);
	}

	protected onInit(): Promise<void> {
		this.graphService = new GraphService(this.context);
		return Promise.resolve();
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("title", {
									label: strings.TitleFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
	}
}
