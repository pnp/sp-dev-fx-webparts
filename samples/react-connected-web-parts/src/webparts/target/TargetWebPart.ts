import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDynamicField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TargetWebPartStrings';
import Target from './components/Target';
import { ITargetProps } from './components/ITargetProps';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { IPreferences } from '../../common/Preferences';

export interface ITargetWebPartProps {
	firstName: DynamicProperty<string>;
	lastName: DynamicProperty<string>;
  preferences: DynamicProperty<IPreferences>;
  userName: DynamicProperty<string>;
}

export default class TargetWebPart extends BaseClientSideWebPart<ITargetWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITargetProps> = React.createElement(
      Target,
      {
        firstName: this.properties.firstName,
        lastName: this.properties.lastName,
        preferences: this.properties.preferences,
        userName: this.properties.userName
      }
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
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneDynamicField("firstName", {
									label: strings.FirstName,
								}),
								PropertyPaneDynamicField("lastName", {
									label: strings.LastName,
								}),
							],
						},
						{
							groupName: strings.ComplexGroupName,
							groupFields: [
								PropertyPaneDynamicField("preferences", {
									label: strings.Preferences,
								}),
							],
						},
						{
							groupName: strings.PageEnvironmentGroupName,
							groupFields: [
								PropertyPaneDynamicField("userName", {
									label: strings.UserName,
								}),
							],
						},
					],
				},
			],
		};
  }
}
