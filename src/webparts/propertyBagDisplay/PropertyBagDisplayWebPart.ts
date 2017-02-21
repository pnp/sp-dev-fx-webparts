import * as React from 'react';
import pnp from "sp-pnp-js";
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'propertyBagDisplayStrings';
import PropertyBagDisplay from './components/PropertyBagDisplay';
import { IPropertyBagDisplayProps } from './components/IPropertyBagDisplayProps';
import { IPropertyBagDisplayWebPartProps } from './IPropertyBagDisplayWebPartProps';

export default class PropertyBagDisplayWebPart extends BaseClientSideWebPart<IPropertyBagDisplayWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPropertyBagDisplayProps> = React.createElement(
      PropertyBagDisplay,
      {
        description: this.properties.description,
        propertiesToDisplay: this.properties.propertiesToDisplay
   
      }
    );

    ReactDom.render(element, this.domElement);
  }
public onInit(): Promise<void> {

  return super.onInit().then(_ => {

    pnp.setup({
      spfxContext: this.context
    });

  });
}

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    debugger;
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField("propertiesToDisplay", {
                  label: strings.PropertiesToDisplayFieldLabel,
                  multiline: true
                }),

              ]

            }
          ]
        }
      ]
    };
  }
}
