import * as React from "react";
import pnp from "sp-pnp-js";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "propertyBagDisplayStrings";
import PropertyBagDisplay from "./components/PropertyBagDisplay";
import { IPropertyBagDisplayProps } from "./components/IPropertyBagDisplayProps";
import { IPropertyBagDisplayWebPartProps } from "./IPropertyBagDisplayWebPartProps";
import utils from "../shared/utils";
export default class PropertyBagDisplayWebPart extends BaseClientSideWebPart<IPropertyBagDisplayWebPartProps> {

  /**
   * Renders the component. 
   * 
   *  converts the new-line (\n) separated strings to an array of 
   * strings to be passed to the component.
   * 
   * 
   * @memberOf PropertyBagDisplayWebPart
   */
  public render(): void {
    const element: React.ReactElement<IPropertyBagDisplayProps> = React.createElement(
      PropertyBagDisplay,
      {
        description: this.properties.description,
        propertiesToDisplay: utils.parseMultilineTextToArray(this.properties.propertiesToDisplay),
        siteTemplatesToInclude:utils.parseMultilineTextToArray(this.properties.siteTemplatesToInclude)
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
    return Version.parse("1.0");
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField("propertiesToDisplay", {
                  label: strings.PropertiesToDisplayFieldLabel,
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
