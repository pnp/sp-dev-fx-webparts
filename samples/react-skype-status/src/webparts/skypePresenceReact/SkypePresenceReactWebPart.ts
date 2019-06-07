import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from "SkypePresenceReactWebPartStrings";
import SkypePresenceReact from "./components/SkypePresenceReact";
import { ISkypePresenceReactProps } from "./components/ISkypePresenceReactProps";

export interface ISkypePresenceReactWebPartProps {
  description: string;
}

export default class SkypePresenceReactWebPart extends BaseClientSideWebPart<ISkypePresenceReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISkypePresenceReactProps > = React.createElement(
      SkypePresenceReact,
      {
        description: this.properties.description,
        webPartContext: () => this.context
      }
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
