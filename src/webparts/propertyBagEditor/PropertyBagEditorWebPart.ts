import * as React from "react";
import * as ReactDom from "react-dom";
import { Version, UrlQueryParameterCollection } from "@microsoft/sp-core-library";

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "propertyBagEditorStrings";
import PropertyBagEditor from "./components/PropertyBagEditor";
import { IPropertyBagEditorProps } from "./components/IPropertyBagEditorProps";
import { IPropertyBagEditorWebPartProps } from "./IPropertyBagEditorWebPartProps";
import utils from "../shared/utils";

/**
 *  This webpart is used to edit the properties of a Rootweb. 
 *  The web to be edited is passed in by the SiteUrl Property. If not set, the Current site is used
 * @export
 * @class PropertyBagEditorWebPart
 * @extends {BaseClientSideWebPart<IPropertyBagEditorWebPartProps>}
 */
export default class PropertyBagEditorWebPart extends BaseClientSideWebPart<IPropertyBagEditorWebPartProps> {


  /**
   * Renders the component. If no siteUrl is present on the currnt url, the current site is 
   * passed in as the siteUrl Property.
   * 
   *  converts the propertiesToEdit from a new-line (\n) separated string to an array of 
   * strings to be passed to the component.
   * 
   * 
   * @memberOf PropertyBagEditorWebPart
   */
  public render(): void {
    const uqpc = new UrlQueryParameterCollection(window.location.toString());
    let siteUrl: string = uqpc.getValue("siteUrl");
    if (!siteUrl) {
      siteUrl = this.context.pageContext.site.absoluteUrl;
    }
    const props: IPropertyBagEditorProps = {
      description: this.properties.description,
      propertiesToEdit: utils.parseMultilineTextToArray(this.properties.propertiesToEdit),
      siteUrl: siteUrl
    };
    const element: React.ReactElement<IPropertyBagEditorProps> = React.createElement(
      PropertyBagEditor,
      props
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField("propertiesToEdit", {
                  label: strings.PropertiesToEditFieldLabel,
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
