import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'propertyBagFilteredSiteListStrings';
import PropertyBagFilteredSiteList from './components/PropertyBagFilteredSiteList';
import { IPropertyBagFilteredSiteListProps } from './components/IPropertyBagFilteredSiteListProps';
import { IPropertyBagFilteredSiteListWebPartProps } from './IPropertyBagFilteredSiteListWebPartProps';

export default class PropertyBagFilteredSiteListWebPart extends BaseClientSideWebPart<IPropertyBagFilteredSiteListWebPartProps> {

  public render(): void {
    debugger;
    const element: React.ReactElement<IPropertyBagFilteredSiteListProps > = React.createElement(
      PropertyBagFilteredSiteList,
      {
        description: this.properties.description
      }
    );
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                ,
                PropertyPaneTextField("filters", {
                  label: strings.FiltersFieldLabel,
                  multiline: true
                }),
                PropertyPaneTextField("siteTemplatesToInclude", {
                  label: strings.SiteTemplatesToIncludeFieldLabel,
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
