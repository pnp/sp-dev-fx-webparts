import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneCheckbox,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HelloConfigurationWebPartStrings';
import HelloConfiguration from './components/HelloConfiguration';
import { IHelloConfigurationProps } from './components/IHelloConfigurationProps';

export interface IHelloConfigurationWebPartProps {
	description: string;
	showAdvancedSettings: boolean;
	dropdownSelection: string;
	checkBoxSelection1: string;
	checkBoxSelection2: string;
	checkBoxSelection3: string;
}

export default class HelloConfigurationWebPart extends BaseClientSideWebPart<IHelloConfigurationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHelloConfigurationProps> = React.createElement(
      HelloConfiguration,
      {}
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
			pages: [
				{
					header: {
						description: strings.FirstPageDescription,
					},
					//displayGroupsAsAccordion: true,
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel,
								}),
								PropertyPaneToggle("showAdvancedSettings", {
									label: strings.Controls.AdvancedToggle.Label,
									onText: strings.Controls.AdvancedToggle.OnText,
									offText: strings.Controls.AdvancedToggle.OffText,
								}),
							],
						},
						{
							groupName: strings.AdvancedGroupName,
							isCollapsed: !this.properties.showAdvancedSettings,
							groupFields: [
								PropertyPaneDropdown("dropdownSelection", {
									label: strings.Controls.Dropdown.Label,
									options: [
										{ key: "1", text: strings.Controls.Dropdown.Options.One },
										{ key: "2", text: strings.Controls.Dropdown.Options.Two },
										{ key: "3", text: strings.Controls.Dropdown.Options.Three },
									],
								}),
							],
						},
					],
				},
				{
					header: {
						description: strings.SecondPageDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneCheckbox("checkBoxSelection1", {
									text: strings.Controls.CheckBox1.Label,
								}),
								PropertyPaneCheckbox("checkBoxSelection2", {
									text: strings.Controls.CheckBox2.Label,
								}),
								PropertyPaneCheckbox("checkBoxSelection3", {
									text: strings.Controls.CheckBox3.Label,
								})
							],
						},
					],
				},
				{
					header: {
						description: strings.ThirdPageDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneSlider("sliderSelection", {
									label: strings.Controls.Slider.Label,
									min: 0,
									max: 100,
									value: 50,
								}),
							],
						}
					],
				},
			],
		};
  }
}
