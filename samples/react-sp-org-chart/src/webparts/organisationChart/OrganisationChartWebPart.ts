import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'OrganisationChartWebPartStrings';
import OrganisationChart from './components/OrganisationChart';
import { IOrganisationChartProps } from './components/IOrganisationChartProps';


export interface IOrganisationChartWebPartProps {
  description: string;
  orgType: string; // New property for Org Type
  list: string;    // New property for List
}

export default class OrganisationChartWebPart extends BaseClientSideWebPart<IOrganisationChartWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IOrganisationChartProps> = React.createElement(
      OrganisationChart,
      {
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (!this.properties.list) {
      this.properties.list = 'Employee';
    }

    

    if (!this.properties.orgType) {
      this.properties.orgType = 'List';
    }

  }

 

 

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('list', { // New text field for List
                  label: 'List'
                }),
                PropertyPaneDropdown('orgType', { // New dropdown for Org Type
                  label: 'Org Type',
                  options: [
                    { key: 'Type1', text: 'Type 1' },
                    { key: 'Type2', text: 'Type 2' },
                    { key: 'Type3', text: 'Type 3' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
