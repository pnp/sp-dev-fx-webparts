import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'organisationChartStrings';
import OrganisationChart, { IOrganisationChartProps } from './components/OrganisationChart';
import { IOrganisationChartWebPartProps } from './IOrganisationChartWebPartProps';

export default class OrganisationChartWebPart extends BaseClientSideWebPart<IOrganisationChartWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {

    const element: React.ReactElement<IOrganisationChartProps> = React.createElement(OrganisationChart, {
      description: this.properties.description,
      environmentType: this.context.environment.type,
      serviceScope: this.context.serviceScope
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
