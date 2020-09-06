import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'organisationChartStrings';
import OrganisationChart from './components/OrganisationChart';
import { IOrganisationChartProps } from './components/IOrganisationChartProps';
import { IOrganisationChartWebPartProps } from './IOrganisationChartWebPartProps';


export default class OrganisationChartWebPart extends BaseClientSideWebPart<IOrganisationChartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IOrganisationChartProps> = React.createElement(
      OrganisationChart, {
        serviceScope: this.context.serviceScope,
        organisationName: this.properties.organisationName
      });

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField('organisationName', {
                  label: strings.OrganisationNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
