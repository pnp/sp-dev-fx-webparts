import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneDropdown,
  PropertyPaneTextField,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import EnhancedButton from "./components/EnhancedButton";

export interface IEnhancedButtonWebPartProps {
  label: string;
  link: string;
  buttonAlignment: string;
  width: string;
  height: string;
  borderRadius: string;
  linkBehaviour: string;

  containerStyles: string;
  buttonStyles: string;
  buttonOnHoverStyles: string;
}

export default class EnhancedButtonWebPart extends BaseClientSideWebPart<IEnhancedButtonWebPartProps> {
  public render(): void {
    const element: React.ReactElement = React.createElement(
      EnhancedButton,
      this.properties
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "Basic",
              groupFields: [
                PropertyPaneTextField("label", {
                  label: "Label",
                }),
                PropertyPaneTextField("link", {
                  label: "Link",
                }),
                PropertyPaneDropdown("linkBehaviour", {
                  label: "Link Behaviour",
                  options: [
                    { key: "_blank", text: "Open in New Tab" },
                    { key: "_self", text: "Open in Same Tab" },
                  ],
                }),
                PropertyPaneDropdown("buttonAlignment", {
                  label: "Button Alignment",
                  options: [
                    { key: "flex-start", text: "Left" },
                    { key: "center", text: "Center" },
                    { key: "flex-end", text: "Right" },
                  ],
                }),
                PropertyPaneTextField("width", {
                  label: "Width",
                }),
                PropertyPaneTextField("height", {
                  label: "Height",
                }),
                PropertyPaneDropdown("borderRadius", {
                  label: "Border Radius",
                  options: [
                    { key: "0", text: "None" },
                    { key: "4px", text: "Small" },
                    { key: "9999px", text: "Medium" },
                    { key: "100%", text: "Full" },
                  ],
                }),
              ],
            },
            {
              groupName: "Advanced",
              groupFields: [
                PropertyPaneTextField("containerStyles", {
                  label: "Container Styles",
                  description: "CSS styles to apply to the container",
                  multiline: true,
                  rows: 5,
                }),
                PropertyPaneTextField("buttonStyles", {
                  label: "Button Styles",
                  description: "CSS styles to apply to the button",
                  multiline: true,
                  rows: 5,
                }),
                PropertyPaneTextField("buttonOnHoverStyles", {
                  label: "Button On Hover Styles",
                  description: "CSS styles to apply to the button on hover",
                  multiline: true,
                  rows: 5,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
