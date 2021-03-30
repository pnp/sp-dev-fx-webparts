import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from 'TenantPropertiesWebPartStrings';
import TenantProperties from './components/TenantProperties';
import { ITenantPropertiesProps } from './components/ITenantPropertiesProps';

export interface ITenantPropertiesWebPartProps {
  title: string;
}

export default class TenantPropertiesWebPart extends BaseClientSideWebPart<ITenantPropertiesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITenantPropertiesProps> = React.createElement(
      TenantProperties,
      {
        title: this.properties.title,
        context: this.context,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      });

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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                  value: 'Tenant Properties'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
