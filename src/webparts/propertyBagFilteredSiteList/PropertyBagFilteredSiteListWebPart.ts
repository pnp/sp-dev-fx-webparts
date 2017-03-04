import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle, PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';

import * as strings from 'propertyBagFilteredSiteListStrings';
import PropertyBagFilteredSiteList from './components/PropertyBagFilteredSiteList';
import { IPropertyBagFilteredSiteListProps } from './components/IPropertyBagFilteredSiteListProps';
import { IPropertyBagFilteredSiteListWebPartProps } from './IPropertyBagFilteredSiteListWebPartProps';
import utils from "../shared/utils";
export default class PropertyBagFilteredSiteListWebPart extends BaseClientSideWebPart<IPropertyBagFilteredSiteListWebPartProps> {

  /**
   *   Renders the component. 
   * 
   *  converts the new-line (\n) separated strings to an array of 
   * strings to be passed to the component.
   * 
   * 
   * 
   * @memberOf PropertyBagFilteredSiteListWebPart
   */
  public render(): void {
    debugger;
    const element: React.ReactElement<IPropertyBagFilteredSiteListProps> = React.createElement(
      PropertyBagFilteredSiteList,
      {
        description: this.properties.description,
        siteTemplatesToInclude: utils.parseMultilineTextToArray(this.properties.siteTemplatesToInclude),
        filters: utils.parseMultilineTextToArray(this.properties.filters),
        userFilters: utils.parseMultilineTextToArray(this.properties.userFilters),
        showSiteDescriptions: this.properties.showSiteDescriptions,
        linkTarget: this.properties.linkTarget,
        showQueryText: this.properties.showQueryText
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
                  description: strings.FiltersFieldDescription,
                  multiline: true,
                  resizable: true
                }),
                PropertyPaneTextField("siteTemplatesToInclude", {
                  label: strings.SiteTemplatesToIncludeFieldLabel,
                  description: strings.SiteTemplatesToIncludeFieldDescription,
                  multiline: true,
                  resizable: true

                }),
                PropertyPaneTextField("userFilters", {
                  label: strings.UserFiltersFieldLabel,
                  description: strings.UserFiltersFieldDescription,
                  multiline: true,
                  resizable: true
                }),
                PropertyPaneChoiceGroup("linkTarget", {
                  label: strings.LinkTargetFieldLabel,
                  options: [
                    { text: strings.TargetBlankDescription, key: "_blank" },
                    { text: strings.TargetSelfDescription, key: "_self" },
                    { text: strings.TargetParentDescription, key: "_parent" },
                    { text: strings.TargetTopDescription, key: "_top" },
                  ],
                }),
                PropertyPaneToggle("showSiteDescriptions", {
                  label: strings.ShowSiteDescriptionsFieldLabel,

                }),
                PropertyPaneToggle("showQueryText", {
                  label: strings.ShowQueryTextFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
