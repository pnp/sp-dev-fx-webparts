import { GraphService } from "./../../common/services/GraphService";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import * as strings from "HolidaysCalendarWebPartStrings";
import HolidaysCalendar from "./components/HolidaysCalendar";
import { IHolidaysCalendarProps } from "./components/IHolidaysCalendarProps";
import { SPService } from "../../common/services/SPService";

export interface IHolidaysCalendarWebPartProps {
	enableDownload: boolean;
	title: string;
	showFixedOptional: boolean;
}

export default class HolidaysCalendarWebPart extends BaseClientSideWebPart<IHolidaysCalendarWebPartProps> {
	private _isDarkTheme: boolean = false;
	private _environmentMessage: string = "";
	private spService: SPService;
	private graphService: GraphService;

	public render(): void {
		const element: React.ReactElement<IHolidaysCalendarProps> = React.createElement(HolidaysCalendar, {
			isDarkTheme: this._isDarkTheme,
			environmentMessage: this._environmentMessage,
			hasTeamsContext: !!this.context.sdks.microsoftTeams,
			userDisplayName: this.context.pageContext.user.displayName,
			spService: this.spService,
			graphService: this.graphService,
			context: this.context,
			showDownload: this.properties.enableDownload ?? false,
			title: this.properties.title,
			showFixedOptional: this.properties.showFixedOptional,
		});

		ReactDom.render(element, this.domElement);
	}

	protected onInit(): Promise<void> {
		return this._getEnvironmentMessage().then((message) => {
			this.spService = new SPService(this.context);
			this.graphService = new GraphService(this.context);
			this._environmentMessage = message;
		});
	}

	private _getEnvironmentMessage(): Promise<string> {
		if (!!this.context.sdks.microsoftTeams) {
			// running in Teams, office.com or Outlook
			return this.context.sdks.microsoftTeams.teamsJs.app.getContext().then((context) => {
				let environmentMessage: string = "";
				switch (context.app.host.name) {
					case "Office": // running in Office
						environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
						break;
					case "Outlook": // running in Outlook
						environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
						break;
					case "Teams": // running in Teams
						environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
						break;
					default:
						throw new Error("Unknown host");
				}

				return environmentMessage;
			});
		}

		return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		this._isDarkTheme = !!currentTheme.isInverted;
		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty("--bodyText", semanticColors.bodyText || null);
			this.domElement.style.setProperty("--link", semanticColors.link || null);
			this.domElement.style.setProperty("--linkHovered", semanticColors.linkHovered || null);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected onPropertyPaneFieldChanged = (propertyPath: string, oldValue: any, newValue: any): void => {
		if (propertyPath === "enableDownload" && oldValue !== newValue) {
			this.properties.enableDownload = newValue;
		}
		if (propertyPath === "title" && oldValue !== newValue) {
			this.properties.title = newValue;
		}
		if (propertyPath === "showFixedOptional" && oldValue !== newValue) {
			this.properties.showFixedOptional = newValue;
		}
	};

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
									label: "Title",
								}),
								PropertyPaneToggle("enableDownload", {
									key: "enableDownload",
									label: "Show Download Option",
									checked: false,
								}),
								PropertyPaneToggle("showFixedOptional", {
									key: "showFixedOptional",
									label: "Show Fixed Optional Icons",
									checked: false,
								}),
							],
						},
					],
				},
			],
		};
	}
}
