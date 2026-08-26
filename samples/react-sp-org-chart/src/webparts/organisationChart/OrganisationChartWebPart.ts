import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import OrganisationChart from './components/OrganisationChart';
import { IOrganisationChartProps } from './components/IOrganisationChartProps';


export interface IOrganisationChartWebPartProps {
  list: string;
  gradientStart: string;
  gradientEnd: string;
  webpartTitle: string;
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
        context: this.context,
        list: this.properties.list,
        gradientStart: this.properties.gradientStart,
        gradientEnd: this.properties.gradientEnd,
        webpartTitle: this.properties.webpartTitle,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (!this.properties.list) {
      this.properties.list = 'Employees';
    }



    if (!this.properties.gradientStart) {
      this.properties.gradientStart = '#6a11cb';
    }

    if (!this.properties.gradientEnd) {
      this.properties.gradientEnd = '#2575fc';
    }

    if (!this.properties.webpartTitle) {
      this.properties.webpartTitle = 'Organisation Chart';
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
            description: "Organisation Chart"
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('webpartTitle', {
                  label: "Organisation Chart"
                }), 
                PropertyPaneTextField('gradientStart', {
                  label: "Gradient Start Color"
                }),
                PropertyPaneTextField('gradientEnd', {
                  label: "Gradient End Color"
                }),
                PropertyPaneTextField('list', {
                  label: 'List'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
